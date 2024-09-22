<script lang="ts">
	import ChatInput from '$lib/components/Chat/ChatInput.svelte';
	import MessagesContainer from '$lib/components/Chat/MessagesContainer.svelte';
	import { loggedUser } from '$lib/stores';
	import type { PageData } from '../$types';

	export let data: PageData;
	$: $loggedUser = data.session?.user;
</script>

<main class="flex flex-col justify-between p-4 md:ml-64 min-h-screen pt-20 pb-2">
	<MessagesContainer />
	<ChatInput />
</main>
