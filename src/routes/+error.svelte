<script>
	import { page } from '$app/stores';
	import ErrorPage from '$lib/components/Auth/ErrorPage.svelte';
</script>

<div class="flex justify-center items-center min-h-screen">
	{#if $page.error && $page.error.message === 'Not Found'}
		<ErrorPage>
			<span slot="error-number">404</span>
			<span slot="error-title">Page Not Found</span>
			<span slot="error-info">
				Sorry, we can't find that page. You'll find lots to explore on the home page.
			</span>
		</ErrorPage>
	{:else if $page.error && $page.status === 500}
		<ErrorPage>
			<span slot="error-number">500</span>
			<span slot="error-title">Internal Server Error.</span>
			<span slot="error-info"> We are already working to solve the problem. </span>
		</ErrorPage>
	{:else if $page.error}
		<ErrorPage>
			<span slot="error-number">{$page.status}</span>
			<span slot="error-title">Enhance your calm.</span>
			<span slot="error-info"> {$page.error.message} </span>
		</ErrorPage>
	{/if}
</div>
