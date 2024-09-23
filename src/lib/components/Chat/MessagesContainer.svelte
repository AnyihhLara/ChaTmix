<script lang="ts">
	import { getAllChannelMessages } from '$lib/services/messageService';
	import { getUser } from '$lib/services/userService';
	import { currentChannel, currentChannelChange, loggedUser } from '$lib/stores';
	import { supabase } from '$lib/supabaseClient';
	import type { Message } from '$lib/types';
	import { Label, TextPlaceholder } from 'flowbite-svelte';
	import { afterUpdate, onMount } from 'svelte';
	import ChatBubble from './ChatBubbles/ChatBubble.svelte';

	let chatContainer: HTMLElement,
		messages: Message[] = [],
		loading = false,
		error: string | null = null;

	onMount(async () => {
		if ($currentChannel !== -1) {
			loading = true;
			await updateMessages();
		}
		supabase
			.channel('Message')
			.on(
				'postgres_changes',
				{ event: 'INSERT', schema: 'public', table: 'Message' },
				async (payload) => {
					const user = await getUser(payload.new['id_user']);
					messages = [
						...messages,
						{
							id: payload.new['id'],
							message: payload.new['message'],
							timestamp: payload.new['timestamp'],
							fileUrl: payload.new['fileUrl'],
							user: user
						}
					];
				}
			)
			.on(
				'postgres_changes',
				{ event: 'DELETE', schema: 'public', table: 'Message' },
				async (payload) => {
					messages = messages.filter((message) => message.id !== payload.old['id']);
				}
			)
			.subscribe();
		scrollToBottom();
	});
	afterUpdate(async () => {
		if ($currentChannel !== -1) {
			if ($currentChannelChange) {
				loading = true;
				await updateMessages();
				$currentChannelChange = false;
			}
		}
		scrollToBottom();
	});
	
	function scrollToBottom() {
		if (chatContainer) {
			chatContainer.scrollTop = chatContainer.scrollHeight;
		}
	}
	async function updateMessages() {
		if ($loggedUser && $currentChannel) {
			try {
				messages = await getAllChannelMessages($loggedUser.id, $currentChannel);
				loading = false;
			} catch (e) {
				if (e instanceof Error) {
					error = e.message;
					loading = false;
					setTimeout(() => {
						error = null;
					}, 3000);
				}
			}
		}
	}
</script>

<div
	bind:this={chatContainer}
	class="{$currentChannel !== -1 ? 'overflow-y-auto h-[calc(100vh-200px)]' : ''} pr-2"
>
	{#if loading}
		<div class="flex flex-col gap-8 pl-10 pt-2">
			<TextPlaceholder size="sm" />
			<div class="flex justify-end">
				<TextPlaceholder size="sm" class="w-full" />
			</div>
			<TextPlaceholder size="sm" />
		</div>
	{:else if messages}
		{#each messages as message}
			<ChatBubble {message} />
		{/each}
	{/if}
	{#if error}
		<Label color="red" class="font-medium text-center mb-1">{error}</Label>
	{/if}
</div>
