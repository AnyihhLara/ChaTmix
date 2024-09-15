<script lang="ts">
	import { DropdownItem, Modal, Table, TableBody, TableHead, TableHeadCell } from 'flowbite-svelte';
	import ChannelItem from './ChannelItem.svelte';
	import type { Channel } from '$lib/types';

	export let channels: Channel[] = [
		{
			id: 1,
			name: 'Test',
			users: [
				{ id: 1, email: '', name: 'Anyihh', messages: [], channels: [] },
				{ id: 2, email: '', name: 'Franklin', messages: [], channels: [] }
			],
			messages: []
		}
	];
	let defaultModal = false;
</script>

<DropdownItem on:click={() => (defaultModal = true)}>Your channels</DropdownItem>
<Modal title="Channels" bind:open={defaultModal} autoclose class="min-w-full">
	<Table hoverable={true} class="mb-4">
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
				<ChannelItem>
					<span slot="channel-name">{channel.name}</span>
					<span slot="users"
						>{#each channel.users as user}
							{user.name},
						{/each}</span
					>
				</ChannelItem>
			{/each}
		</TableBody>
	</Table>
</Modal>
