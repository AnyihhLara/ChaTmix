<script>
	import '../app.css';
	import { innerWidth } from '$lib/stores/index';
</script>

<svelte:window bind:innerWidth={$innerWidth} />

<svelte:head>
	<title>ChaTmix</title>
</svelte:head>

<div class="bg-gray-50 dark:bg-gray-900">
	<slot />
</div>
