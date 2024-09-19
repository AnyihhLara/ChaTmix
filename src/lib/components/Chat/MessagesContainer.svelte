<script lang="ts">
	import type { Message } from '$lib/types';
	import { afterUpdate, onMount } from 'svelte';
	import ChatBubble from './ChatBubbles/ChatBubble.svelte';
	import { getAllChannelMessages } from '$lib/services/messageService';
	import { currentChannel, loggedUser } from '$lib/stores';
	let messages: Message[] = [],
		previousValue: number | undefined,
		currentChannelChange = false;
	onMount(async () => {
		if ($loggedUser && $currentChannel && $currentChannel != -1) {
			messages = await getAllChannelMessages($loggedUser.id, $currentChannel);
		}
		previousValue = $currentChannel;
	});
	afterUpdate(async () => {
		if ($loggedUser && $currentChannel && $currentChannel != -1) {
			currentChannel.subscribe((value) => {
				if (previousValue !== undefined && previousValue !== value) {
					currentChannelChange = true;
				} else {
					currentChannelChange = false;
				}
				previousValue = value;
			});
			if (currentChannelChange) {
				messages = await getAllChannelMessages($loggedUser.id, $currentChannel);
			}
		}
	});
</script>

<div>
	{#if messages}
		{#each messages as message}
			<ChatBubble {message} />
		{/each}
	{/if}
</div>
