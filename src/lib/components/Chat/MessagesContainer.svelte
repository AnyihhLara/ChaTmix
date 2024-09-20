<script lang="ts">
	import type { Message } from '$lib/types';
	import { afterUpdate, onMount } from 'svelte';
	import ChatBubble from './ChatBubbles/ChatBubble.svelte';
	import { getAllChannelMessages } from '$lib/services/messageService';
	import { currentChannel, loggedUser, currentChannelChange } from '$lib/stores';
	import { Label, TextPlaceholder } from 'flowbite-svelte';
	import { supabase } from '$lib/supabaseClient';
	import { getUser } from '$lib/services/userService';
	let chatContainer: HTMLElement;

	function scrollToBottom() {
		if (chatContainer) {
			chatContainer.scrollTop = chatContainer.scrollHeight;
		}
	}
	let messages: Message[] = [],
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
	class="{$currentChannel !== -1 ? 'overflow-y-auto h-[calc(100vh-170px)]' : ''} pr-2"
>
	{#if loading}
		<div class="flex flex-col gap-8 pl-10 pt-2">
			<TextPlaceholder size="md" />
			<div class="flex justify-end">
				<TextPlaceholder size="md" class="w-full" />
			</div>
			<TextPlaceholder size="md" />
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

<style lang="postcss">
	::-webkit-scrollbar {
		width: 10px;
	}
	::-webkit-scrollbar-track {
		background: #f1f1f100;
		border-radius: 5px;
	}

	::-webkit-scrollbar-thumb {
		background: #6d28d9;
		border-radius: 5px;
	}
	::-webkit-scrollbar-thumb:hover {
		background: #b676e0;
	}
</style>
