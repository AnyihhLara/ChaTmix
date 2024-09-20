<script lang="ts">
	import {
		toggleClass,
		innerWidth,
		loggedUser,
		channelsLength,
		currentChannelChange,
		currentChannel
	} from '$lib/stores/index';
	import SidebarChannel from './SidebarChannel.svelte';
	import type { Channel } from '$lib/types';
	import { afterUpdate, onMount } from 'svelte';
	import { getUser } from '$lib/services/userService';
	import { supabase } from '$lib/supabaseClient';
	import { getChannel } from '$lib/services/channelService';

	async function updateChannels() {
		if ($loggedUser) {
			const userData = await getUser($loggedUser.id);
			channels = userData.channels ? userData.channels : [];
			$channelsLength = channels?.length;
		}
	}
	onMount(async () => {
		await updateChannels();
		supabase
			.channel('_ChannelMembers')
			.on(
				'postgres_changes',
				{ event: 'INSERT', schema: 'public', table: '_ChannelMembers' },
				async (payload) => {
					if (payload.new['B'] === $loggedUser?.id) {
						const channel = await getChannel(payload.new['A']);
						channels = [...channels, channel];
					}
				}
			)
			.on(
				'postgres_changes',
				{ event: 'DELETE', schema: 'public', table: '_ChannelMembers' },
				async (payload) => {
					if (payload.old['B'] === $loggedUser?.id) {
						channels = channels.filter((channel) => channel.id !== payload.old['A']);
					}
				}
			)
			.subscribe();
		supabase
			.channel('Channel')
			.on(
				'postgres_changes',
				{ event: 'DELETE', schema: 'public', table: 'Channel' },
				async (payload) => {
					channels = channels.filter((channel) => channel.id !== payload.old['id']);
				}
			)
			.subscribe();
	});

	let channels: Channel[];
	$: if ($innerWidth >= 768) {
		$toggleClass = '-translate-x-full';
	}
	afterUpdate(async () => {
		if (channels?.length !== $channelsLength) {
			await updateChannels();
		}
	});
</script>

<aside
	class="{$toggleClass} fixed top-0 left-0 z-40 w-64 h-screen pt-14 transition-transform duration-500 bg-white border-r border-gray-200 md:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
>
	<div class="overflow-y-auto py-5 px-3 h-full bg-white dark:bg-gray-800">
		<ul class="space-y-2">
			{#if channels && channels.length != 0}
				{#each channels as channel}
					<SidebarChannel
						activated={$currentChannel === channel.id}
						on:click={() => {
							const previous = $currentChannel;
							$currentChannel = channel.id;
							if (previous !== $currentChannel) {
								$currentChannelChange = true;
							} else {
								$currentChannelChange = false;
							}
						}}
					>
						{channel.name}
					</SidebarChannel>
				{/each}
			{/if}
		</ul>
	</div>
</aside>
