<script lang="ts">
	import HostChatBubble from './HostChatBubble.svelte';
	import GuestChatBubble from './GuestChatBubble.svelte';
	import ChatBubbleContent from './ChatBubbleContent.svelte';
	import type { Message } from '$lib/types';
	export let message: Message;
	let component = GuestChatBubble;
	$: if (message.host) {
		component = HostChatBubble;
	} else {
		component = GuestChatBubble;
	}
</script>

<svelte:component this={component}>
	<ChatBubbleContent>
		<span slot="username">{message.username}</span>
		<span slot="timestamp">{message.timestamp}</span>
		<span slot="message">{message.message}</span>
	</ChatBubbleContent>
</svelte:component>
