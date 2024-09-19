<script lang="ts">
	import { Input } from 'flowbite-svelte';
	import SendButton from './SendButton.svelte';
	import { loggedUser } from '$lib/stores';

	let input: string;

	function handleSend() {
		// if ($loggedUser) {
			// messages = [
			// 	...messages,
			// 	{
			// 		id: id++,
			// 		host: false,
			// 		username: $loggedUser.user_metadata.name,
			// 		timestamp: new Date().toLocaleString(),
			// 		message: input
			// 	}
			// ];
			// input = '';
		// }
	}
</script>

<div class="py-4 px-8 sticky bottom-0 w-full bg-gray-50 dark:bg-gray-900 h-15">
	<form action="" autocomplete="off" on:submit={handleSend}>
		<div class="flex justify-between gap-2">
			<Input placeholder="Write a message" name="message" bind:value={input} />
			<SendButton />
		</div>
	</form>
</div>
