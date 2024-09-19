<script lang="ts">
	import { toggleClass, innerWidth, currentChannel } from '$lib/stores/index';
	import SidebarChannel from './SidebarChannel.svelte';
	import type { Channel } from '$lib/types';
	import { afterUpdate, onMount } from 'svelte';
	import { loggedUser, length } from '$lib/stores';
	import { getUser } from '$lib/services/userService';

	async function updateChannels() {
		if ($loggedUser) {
			const userData = await getUser($loggedUser.id);
			channels = userData.channels;
			$length = channels?.length;
		}
	}
	onMount(async () => {
		await updateChannels();
	});

	let channels: Channel[] | undefined;
	$: if ($innerWidth >= 768) {
		$toggleClass = '-translate-x-full';
	}
	afterUpdate(async () => {
		if (channels?.length !== $length) {
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
						on:click={() => {
							$currentChannel = channel.id;
						}}
					>
						{channel.name}
					</SidebarChannel>
				{/each}
			{/if}
		</ul>
	</div>
</aside>
