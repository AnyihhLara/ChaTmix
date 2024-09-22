<script lang="ts">
	import {
		DropdownItem,
		Modal,
		Table,
		TableBody,
		TableHead,
		TableHeadCell,
		Spinner
	} from 'flowbite-svelte';
	import ChannelItem from './ChannelItem.svelte';
	import type { Channel } from '$lib/types';
	import { onMount } from 'svelte';
	import { getAllUserChannels } from '$lib/services/channelService';
	import { loggedUser } from '$lib/stores';

	onMount(async () => {
		if ($loggedUser) {
			channels = await getAllUserChannels($loggedUser.id);
			if (channels) {
				loading = false;
			}
		}
	});

	let channels: Channel[] = [],
		loading = true;
	let defaultModal = false;
</script>

<DropdownItem on:click={() => (defaultModal = true)}>Your channels</DropdownItem>
<Modal title="Channels" bind:open={defaultModal} class="min-w-full" size='lg'>
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
