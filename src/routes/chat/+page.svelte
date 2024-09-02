<script lang="ts">
	import ChatBubble from '$lib/components/Chat/ChatBubbles/ChatBubble.svelte';
	import ChatInput from '$lib/components/Chat/ChatInput.svelte';
	import Navbar from '$lib/components/Navbar/Navbar.svelte';
	import Sidebar from '$lib/components/Sidebar/Sidebar.svelte';
	import type { Message } from '$lib/types';

	let id = 0;
	let messages: Message[] = [
		{
			id: id++,
			host: true,
			avatar: '',
			username: 'Anyihh',
			timestamp: '4:20pm',
			message: "It's time"
		},
		{ id: id++, host: false, avatar: '', username: 'Josué', timestamp: '4:20pm', message: 'yeah!' },
		{
			id: id++,
			host: true,
			avatar: '',
			username: 'Anyihh',
			timestamp: '4:20pm',
			message: 'jsjs'
		},
		{
			id: id++,
			host: true,
			avatar: '',
			username: 'Rick',
			timestamp: '4:21pm',
			message: 'Hi!'
		},
		{
			id: id++,
			host: false,
			avatar: '',
			username: 'Josué',
			timestamp: '4:21pm',
			message: 'hi'
		},
		{
			id: id++,
			host: true,
			avatar: '',
			username: 'Anyihh',
			timestamp: '4:23pm',
			message: 'join us'
		},
		{
			id: id++,
			host: true,
			avatar: '',
			username: 'Rick',
			timestamp: '4:24pm',
			message: 'of course'
		}
	];
	let input = '';
	function handleSend() {
		messages = [
			...messages,
			{
				id: id++,
				host: false,
				avatar: '',
				username: 'Josué',
				timestamp: new Date().toLocaleString(),
				message: input
			}
		];
		input = '';
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
