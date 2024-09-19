<script lang="ts">
	import type { Channel } from '$lib/types';
	import { Label, Input, Button, Modal, DropdownItem, MultiSelect } from 'flowbite-svelte';
	import { PlusOutline, EditOutline } from 'flowbite-svelte-icons';

	let channel: Channel = { id: 0, name: '', members:[] };
	let defaultModal = false,
		title = '';
	let selected: (string | number)[] = [];
	let users = [{ value: 'Franklin', name: 'Franklin' }];

	export let typeModal = 'Create';

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
	<form method="POST" action="?/createchannel">
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

			<Button
				type="submit"
				class="w-52 mt-2"
				formaction={typeModal === 'Edit' ? '?/editchannel' : ''}
			>
				{#if typeModal === 'Create'}
					<PlusOutline />
				{:else if typeModal === 'Edit'}
					<EditOutline />
				{/if}
				{title}
			</Button>
		</div>
	</form>
</Modal>
