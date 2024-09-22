<script lang="ts">
	import { loggedUser } from '$lib/stores';
	import { Button, Modal, Label } from 'flowbite-svelte';
	import { ArrowRightToBracketOutline } from 'flowbite-svelte-icons';
	import { updateUser } from '$lib/services/userService';

	export let channelId;

	let defaultModal = false,
		error: string | null = null,
		success: string | null = null,
		disabledLoading = false;

	const handleCancel = () => {
		defaultModal = false;
	};
	const handleExit = async () => {
		disabledLoading = true;
		if ($loggedUser) {
			try {
				if ($loggedUser) {
					await updateUser($loggedUser?.id, {
						id: $loggedUser?.id,
						channels: [{ id: channelId }]
					});
                    success="Channel left successfully."
				}
			} catch (e) {
				if (e instanceof Error) {
					error = e.message;
				} else {
					error = 'An error occurred while exiting the channel.';
				}
			} finally {
				resetForm();
			}
		}
	};
	function resetForm() {
		setTimeout(() => {
			defaultModal = false;
			error = null;
		}, 3000);
	}
</script>

<button
	class="hover:text-primary-700 dark:hover:text-primary-500"
	on:click={() => (defaultModal = true)}
>
	<ArrowRightToBracketOutline /></button
>
<Modal
	title="Leave the channel"
	bind:open={defaultModal}
	size="sm"
	class="{disabledLoading ? 'cursor-wait' : ''}"
>
	<ArrowRightToBracketOutline class="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto" />
	<p class="mb-4 text-gray-500 dark:text-gray-300 text-center">
		Are you sure you want to leave this channel?
	</p>
	<div class="flex justify-center items-center space-x-4">
		<Button
			class={disabledLoading ? 'pointer-events-none cursor-not-allowed opacity-50' : ''}
			color="light"
			on:click={handleCancel}>No, cancel</Button
		>
		<Button
			class={disabledLoading ? 'pointer-events-none cursor-not-allowed opacity-50' : ''}
			color="red"
			on:click={handleExit}>Yes, I'm sure</Button
		>
	</div>
	{#if error}
		<Label color="red" class="font-medium text-center mb-1">{error}</Label>
	{/if}
	{#if success}
		<Label color="green" class="font-medium text-center mb-1">{success}</Label>
	{/if}
</Modal>
