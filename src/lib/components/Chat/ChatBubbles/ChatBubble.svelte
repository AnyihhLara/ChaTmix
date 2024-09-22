<script lang="ts">
	import HostChatBubble from './HostChatBubble.svelte';
	import GuestChatBubble from './GuestChatBubble.svelte';
	import ChatBubbleContent from './ChatBubbleContent.svelte';
	import type { Message } from '$lib/types';

	export let message: Message;

	let component = GuestChatBubble,
		timestamp: string | undefined;

	$: if (message.host) {
		component = HostChatBubble;
	} else {
		component = GuestChatBubble;
	}
	$: if (message) {
		timestamp = message.timestamp?.toLocaleString();
		timestamp = timestamp?.substring(0, 10) + ' ' + timestamp?.substring(11, 16);
	}
</script>

<svelte:component this={component}>
	<ChatBubbleContent>
		<span slot="username">{message.user?.name}</span>
		<span slot="timestamp">{timestamp}</span>
		<span slot="message"
			>{message.message}
			{#if message.fileUrl}
				<img src={message.fileUrl} alt="Uploaded file" class="max-w-full h-auto mt-2" />
			{/if}
		</span>
	</ChatBubbleContent>
</svelte:component>
