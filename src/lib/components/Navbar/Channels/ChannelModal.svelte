<script lang="ts">
	import { createChannel, updateChannel } from '$lib/services/channelService';
	import type { Channel } from '$lib/types';
	import { length, loggedUser } from '$lib/stores';
	import { Label, Input, Button, Modal, DropdownItem, MultiSelect, Badge } from 'flowbite-svelte';
	import { PlusOutline, EditOutline } from 'flowbite-svelte-icons';
	import { onMount } from 'svelte';
	import { getAllUsers } from '$lib/services/userService';

	onMount(async () => {
		await updateUsers();
		if (typeModal === 'Edit') {
			mapSelected();
		}
	});

	async function updateUsers() {
		if ($loggedUser) {
			const usersData = await getAllUsers();
			users = usersData
				.filter((userData) => userData.id !== $loggedUser.id)
				.map((userData) => ({
					value: userData.id,
					name: userData.name ? userData.name : userData.id
				}));
		}
	}
	export let channel: Channel = { id: 0, name: '', members: [] };

	let defaultModal = false,
		title = '',
		disabled = true,
		users: { value: string; name: string }[] = [],
		selected: (string | number)[] = [],
		error: string | null = null,
		success: string | null = null,
		cursor = '';

	export let typeModal = 'Create';

	$: if (typeModal === 'Create') {
		title = 'Create new channel';
	} else if (typeModal === 'Edit') {
		title = 'Edit channel';
	}
	$: if (channel.name !== '') {
		disabled = false;
	} else {
		disabled = true;
	}
	function mapMembers() {
		if ($loggedUser && channel.members !== undefined) {
			channel.members = selected.map((member) => ({
				id: member.toString()
			}));
			channel.members = [...channel.members, { id: $loggedUser.id }];
		}
	}
	function mapSelected() {
		if (channel.members != undefined && $loggedUser) {
			selected = channel.members
				.filter((member) => member.id !== $loggedUser.id)
				.map((member) => member.id);
		}
	}
	async function handleSubmit() {
		cursor = 'cursor-wait';
		mapMembers();

		if ($loggedUser) {
			try {
				let channelResult;
				if (typeModal === 'Create') {
					channelResult = await createChannel($loggedUser.id, channel);
				} else if (typeModal === 'Edit') {
					channelResult = await updateChannel($loggedUser.id, channel.id, channel);
				}
				if (channelResult) {
					success = `Channel ${typeModal === 'Create' ? 'created ' : 'edited '} successfully.`;
					resetForm();
				}
			} catch (e) {
				if (e instanceof Error) {
					error = e.message;
					cursor = '';
					setTimeout(() => {
						error = null;
					}, 3000);
				}
			}
		}
	}

	function resetForm() {
		if ($length) {
			$length++;
		}
		cursor = '';
		setTimeout(() => {
			success = null;
			defaultModal = false;
			channel = { id: 0, name: '', members: [] };
		}, 3000);
	}
</script>

{#if typeModal === 'Create'}
	<DropdownItem on:click={() => (defaultModal = true)}>Create new channel</DropdownItem>
{:else if typeModal === 'Edit'}
	<Button on:click={() => (defaultModal = true)}>Edit channel</Button>
{/if}

<Modal {title} bind:open={defaultModal} class="min-w-full {cursor}" autoclose={false}>
	<form on:submit|preventDefault={handleSubmit}>
		<div class="flex flex-col gap-4">
			<div>
				<Label for="name" class="mb-2">Name*</Label>
				<Input
					type="text"
					id="name"
					name="name"
					placeholder="Type channel name"
					required
					bind:value={channel.name}
				/>
			</div>
			<div>
				<Label for="members" class="mb-2">Members</Label>
				<MultiSelect
					id="members"
					name="members"
					items={users}
					bind:value={selected}
					size="lg"
					placeholder="Add members"
					let:item
				>
					<Badge>{item.name}</Badge>
				</MultiSelect>
			</div>

			<Button type="submit" class="w-52 mt-2 {cursor}" {disabled}>
				{#if typeModal === 'Create'}
					<PlusOutline />
				{:else if typeModal === 'Edit'}
					<EditOutline />
				{/if}
				{title}
			</Button>
			{#if error}
				<Label color="red" class="font-medium text-center mb-1">{error}</Label>
			{/if}
			{#if success}
				<Label color="green" class="font-medium text-center mb-1">{success}</Label>
			{/if}
		</div>
	</form>
</Modal>
