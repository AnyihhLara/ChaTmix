<script lang="ts">
	import type { Channel } from '$lib/types';
	import { Label, Input, Button, Modal, DropdownItem, MultiSelect } from 'flowbite-svelte';
	import { PlusOutline } from 'flowbite-svelte-icons';

	let defaultModal = false;
	let channel: Channel = { id: 0, name: '', users: [], messages: [] };
	$: console.log(defaultModal);
	const handleSubmit = () => {
		console.log('here');
	};

	let selected: (string | number)[] = [];
	let users = [
		{ value: 'Anyihh', name: 'Anyihh' },
		{ value: 'Franklin', name: 'Franklin' },
		{ value: 'Michael', name: 'Michael' },
		{ value: 'Paula', name: 'Paula' },
		{ value: 'Trevor', name: 'Trevor' }
	];
</script>

<DropdownItem on:click={() => (defaultModal = true)}>Create new channel</DropdownItem>

<Modal title="Create a channel" bind:open={defaultModal} autoclose class="min-w-full pb-2">
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
				Create new channel
			</Button>
		</div>
	</form>
</Modal>
