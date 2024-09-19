<script lang="ts">
	import type { Message } from '$lib/types';
	import ChatBubble from './ChatBubbles/ChatBubble.svelte';
	let messages: Message[] = [];
</script>

<div>
	{#each messages as message}
		<ChatBubble {message} />
	{/each}
</div>
