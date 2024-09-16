<script lang="ts">
	import ChatBubble from '$lib/components/Chat/ChatBubbles/ChatBubble.svelte';
	import ChatInput from '$lib/components/Chat/ChatInput.svelte';
	import Navbar from '$lib/components/Navbar/Navbar.svelte';
	import Sidebar from '$lib/components/Sidebar/Sidebar.svelte';
	import { loggedUser } from '$lib/stores';
	import type { Message } from '$lib/types';
	import type { PageData } from '../$types';

	export let data: PageData;
	$: $loggedUser = data.session?.user;

	let id = 0;
	let messages: Message[] = [
		{
			id: id++,
			host: true,
			username: 'Josué',
			timestamp: '4:20pm',
			message: "It's time"
		}
	];
	let input = '';
	function handleSend() {
		if ($loggedUser) {
			messages = [
				...messages,
				{
					id: id++,
					host: false,
					username: $loggedUser.user_metadata.name,
					timestamp: new Date().toLocaleString(),
					message: input
				}
			];
			input = '';
		}
	}
</script>

<Navbar />
<Sidebar />
<main class="flex flex-col justify-between p-4 md:ml-64 min-h-screen pt-20">
	<div>
		{#each messages as message}
			<ChatBubble {message} />
		{/each}
	</div>
	<ChatInput on:submit={handleSend} bind:value={input} />
</main>
