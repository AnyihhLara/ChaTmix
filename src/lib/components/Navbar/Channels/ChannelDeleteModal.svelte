<script lang="ts">
	import { deleteChannel } from '$lib/services/channelService';
	import type { Channel } from '$lib/types';
	import { length, loggedUser } from '$lib/stores';
	import { Button, Modal, Label } from 'flowbite-svelte';
	import { TrashBinSolid } from 'flowbite-svelte-icons';

	export let channel:Channel;

	let defaultModal = false,
		error: string | null = null,
		success: object | null = null,
		cursor = '';

	const handleCancel = () => {
		defaultModal = false;
	};
	const handleDelete = async () => {
		cursor = 'cursor-wait';
		if ($loggedUser) {
			try {
				const response = await deleteChannel($loggedUser.id, channel.id);
				if (response && $length) {
					success = response;
					$length--;
					setTimeout(() => (success = null), 2000);
					setTimeout(() => (defaultModal = false), 2000);
					cursor = '';
				}
			} catch (e) {
				if (e instanceof Error) {
					cursor = '';
					error = e.message;
					setTimeout(() => (error = null), 5000);
				}
			}
		}
	};
</script>

<Button on:click={() => (defaultModal = true)}>Delete channel</Button>
<Modal title="Delete a channel" bind:open={defaultModal} size="sm" class="w-full {cursor}">
	<TrashBinSolid class="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto" />
	<p class="mb-4 text-gray-500 dark:text-gray-300 text-center">
		Are you sure you want to delete this channel?
	</p>
	<div class="flex justify-center items-center space-x-4">
		<Button class={cursor} color="light" on:click={handleCancel}>No, cancel</Button>
		<Button class={cursor} color="red" on:click={handleDelete}>Yes, I'm sure</Button>
	</div>
	{#if error}
		<Label color="red" class="font-medium text-center mb-1">{error}</Label>
	{/if}
	{#if success}
		<Label color="green" class="font-medium text-center mb-1">{success}</Label>
	{/if}
</Modal>
