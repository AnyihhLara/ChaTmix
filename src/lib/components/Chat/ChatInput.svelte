<script lang="ts">
	import { Input } from 'flowbite-svelte';
	import SendButton from './SendButton.svelte';

	export let value:string;
</script>

<div class="py-4 px-8 sticky bottom-0 w-full bg-gray-50 dark:bg-gray-900 h-15">
	<form action="" autocomplete="off" on:submit>
		<div class="flex justify-between gap-2">
			<Input placeholder="Write a message" name="message" bind:value />
			<SendButton />
		</div>
	</form>
</div>
