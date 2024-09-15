<script lang="ts">
	import type { Channel } from '$lib/types';
	import { Label, Input, Button, Modal, DropdownItem, MultiSelect } from 'flowbite-svelte';
	import { PlusOutline } from 'flowbite-svelte-icons';

	let defaultModal = false,
		title = '';
	let channel: Channel = { id: 0, name: '', users: [], messages: [] };
	let selected: (string | number)[] = [];
	let users = [
		{ value: 'Anyihh', name: 'Anyihh' },
		{ value: 'Franklin', name: 'Franklin' },
		{ value: 'Michael', name: 'Michael' },
		{ value: 'Paula', name: 'Paula' },
		{ value: 'Trevor', name: 'Trevor' }
	];

	export let typeModal = 'Create';

	const handleSubmit = () => {
		if (typeModal === 'Create') {
			console.log('channel created');
		} else if (typeModal === 'Edit') {
			console.log('channel edited');
		}
	};

	$: if (typeModal === 'Create') {
		title = 'Create new channel';
	} else if (typeModal === 'Edit') {
		title = 'Edit channel';
	}
</script>

{#if typeModal === 'Create'}
	<DropdownItem on:click={() => (defaultModal = true)}>Create new channel</DropdownItem>
{:else if typeModal === 'Edit'}
	<Button on:click={() => (defaultModal = true)}>Edit channel</Button>
{/if}

<Modal {title} bind:open={defaultModal} class="min-w-full pb-2">
	<form on:submit={handleSubmit}>
		<div class="flex flex-col gap-4 mb-4">
			<div>
				<Label for="name" class="mb-2">Name</Label>
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
				<Label for="users" class="mb-2">Users</Label>
				<MultiSelect id="users" name="users" items={users} bind:value={selected} size="lg" />
			</div>

			<Button type="submit" class="w-52 mt-2">
				<PlusOutline />
				{title}
			</Button>
		</div>
	</form>
</Modal>
