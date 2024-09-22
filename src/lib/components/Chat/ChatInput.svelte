<script lang="ts">
	import { Input, Helper, Fileupload } from 'flowbite-svelte';
	import SendButton from './SendButton.svelte';
	import { currentChannel, loggedUser } from '$lib/stores';
	import { createMessage } from '$lib/services/messageService';
	import type { Message } from '$lib/types';
	import { supabase } from '$lib/supabaseClient';

	let message: Message = { id: 0, message: '', fileUrl: '' },
		error: string | null = null,
		files: FileList | undefined,
		disabledButton = true;
	$: disabled = $currentChannel === -1;

	async function handleSend() {
		if ($loggedUser && $currentChannel && $currentChannel !== -1) {
			try {
				if (files) {
					const file = files[0];
					const filePath = `${Date.now()}_${file.name}`;

					const { error: uploadError } = await supabase.storage
						.from('message-files')
						.upload(filePath, file);

					if (uploadError) {
						error = uploadError.message;
					}

					const { data } = supabase.storage.from('message-files').getPublicUrl(filePath);

					message.fileUrl = data.publicUrl;
				}
				message = await createMessage($loggedUser.id, $currentChannel, message);
				resetForm();
			} catch (e) {
				resetForm();
				if (e instanceof Error) {
					error = e.message;
				} else {
					error = 'An error occurred while sending the message.';
				}
			}
		}
	}
	function resetForm() {
		message = { id: 0, message: '', fileUrl: '' };
		files = undefined;
		setTimeout(() => {
			error = null;
		}, 3000);
		disabled = false;
	}
	$: if (message.message?.trim() !== '' || files) {
		disabledButton = false;
	} else {
		disabledButton = true;
	}
	$: if (files && !files[0].type.startsWith('image/')) {
		files = undefined;
		error = 'Only can upload images.';
		setTimeout(() => {
			error = null;
		}, 3000);
	}
</script>

<div class="pt-4 pb-2 px-8 sticky bottom-0 w-full bg-gray-50 dark:bg-gray-900 h-15">
	<form action="" autocomplete="off" on:submit|preventDefault={handleSend}>
		<div class="grid">
			<div class="flex justify-between gap-2 items-center">
				<Input
					placeholder="Write a message"
					name="message"
					bind:value={message.message}
					{disabled}
				/>
				<SendButton disabled={disabled || disabledButton} />
			</div>
			<div class="grid md:grid-cols-2">
				<Fileupload id="file" class="mt-2" size="sm" {disabled} bind:files />
			</div>
		</div>
		{#if error}
			<Helper class="mt-2" color="red"
				><span class="font-medium">Not so well done! </span>{error}</Helper
			>
		{/if}
		{#if $currentChannel === -1}
			<Helper class="mt-2" color="disabled"
				><span class="font-medium">Select a channel first.</span></Helper
			>
		{/if}
	</form>
</div>
