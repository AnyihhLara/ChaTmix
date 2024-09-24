<script lang="ts">
	import { getAllUserChannels, getChannel } from '$lib/services/channelService';
	import { loggedUser } from '$lib/stores';
	import type { Channel } from '$lib/types';
	import {
		DropdownItem,
		Modal,
		Spinner,
		Table,
		TableBody,
		TableHead,
		TableHeadCell
	} from 'flowbite-svelte';
	import { onMount } from 'svelte';
	import ChannelItem from './ChannelItem.svelte';
	import { supabase } from '$lib/supabaseClient';

	let channels: Channel[] = [],
		loading = true,
		defaultModal = false;

	onMount(async () => {
		if ($loggedUser) {
			channels = await getAllUserChannels($loggedUser.id);
			if (channels) {
				loading = false;
			}
		}
		supabase
			.channel('Channel')
			.on(
				'postgres_changes',
				{ event: 'INSERT', schema: 'public', table: 'Channel' },
				async (payload) => {
					if (payload.new['id_user_owner'] === $loggedUser?.id) {
						const channel = await getChannel(payload.new['id']);
						channels = [...channels, channel];
					}
				}
			)
			.on(
				'postgres_changes',
				{ event: 'UPDATE', schema: 'public', table: 'Channel' },
				async (payload) => {
					if (payload.new['id_user_owner'] === $loggedUser?.id) {
						const updatedChannel = await getChannel(payload.new['id']);
						channels = channels.map((channel) =>
							channel.id === updatedChannel.id ? updatedChannel : channel
						);
					}
				}
			)
			.on(
				'postgres_changes',
				{ event: 'DELETE', schema: 'public', table: 'Channel' },
				async (payload) => {
					if (payload.old['id_user_owner'] === $loggedUser?.id) {
						channels = channels.filter((channel) => channel.id !== payload.old['id']);
					}
				}
			)
			.subscribe();
	});
</script>

<DropdownItem on:click={() => (defaultModal = true)}>Your channels</DropdownItem>
<Modal title="Channels" bind:open={defaultModal} class="min-w-full" size="lg">
	<Table hoverable={true} class="">
		<TableHead>
			<TableHeadCell>Name</TableHeadCell>
			<TableHeadCell>Users</TableHeadCell>
			<TableHeadCell>
				<span class="sr-only">Edit</span>
			</TableHeadCell>
			<TableHeadCell>
				<span class="sr-only">Delete</span>
			</TableHeadCell>
		</TableHead>
		<TableBody tableBodyClass="divide-y">
			{#each channels as channel}
				<ChannelItem {channel}>
					<span slot="channel-name">{channel.name}</span>
					<span slot="users">
						{#if channel.members}
							{#each channel.members as member, index}
								{member.name}{index !== channel.members.length - 1 ? ', ' : ''}
							{/each}
						{/if}
					</span>
				</ChannelItem>
			{/each}
		</TableBody>
	</Table>
	{#if loading}
		<div class="w-full flex justify-center">
			<Spinner size="12" />
		</div>
	{/if}
</Modal>
