<script lang="ts">
	import { invalidate } from '$app/navigation';
	import { innerWidth } from '$lib/stores/index';
	import { onMount } from 'svelte';
	import '../app.css';

	export let data;
	
	$: ({ session, supabase } = data);

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
			if (newSession?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => data.subscription.unsubscribe();
	});
</script>

<svelte:window bind:innerWidth={$innerWidth} />

<svelte:head>
	<title>ChaTmix</title>
</svelte:head>

<div class="bg-gray-50 dark:bg-gray-900">
	<slot />
</div>
