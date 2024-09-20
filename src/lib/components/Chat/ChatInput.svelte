<script lang="ts">
	import { Input, Helper } from 'flowbite-svelte';
	import SendButton from './SendButton.svelte';
	import { currentChannel, loggedUser } from '$lib/stores';
	import { createMessage } from '$lib/services/messageService';
	import type { Message } from '$lib/types';

	let message: Message = { id: 0, message: '' },
		error: string | null = null;
	$: disabled = $currentChannel === -1;

	async function handleSend() {
		if ($loggedUser && $currentChannel && $currentChannel !== -1) {
			try {
				disabled = true;
				message = await createMessage($loggedUser.id, $currentChannel, message);
			} catch (e) {
				if (e instanceof Error) {
					error = e.message;
				}
			}
		}
		resetForm();
	}
	function resetForm() {
		message = { id: 0, message: '' };
		setTimeout(() => {
			error = null;
		}, 3000);
		disabled = false;
	}
</script>

<div class="py-4 px-8 sticky bottom-0 w-full bg-gray-50 dark:bg-gray-900 h-15">
	<form action="" autocomplete="off" on:submit={handleSend}>
		<div class="flex justify-between gap-2">
			<Input placeholder="Write a message" name="message" bind:value={message.message} {disabled} />
			<SendButton {disabled} />
		</div>
		{#if error}
			<Helper class="mt-2" color="red"
				><span class="font-medium">Not so well done!</span>{error}</Helper
			>
		{/if}
		{#if $currentChannel === -1}
			<Helper class="mt-2" color="disabled"
				><span class="font-medium">Select a channel first.</span></Helper
			>
		{/if}
	</form>
</div>
