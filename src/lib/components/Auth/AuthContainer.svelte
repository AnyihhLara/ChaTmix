<script lang="ts">
	import { page } from '$app/stores';
	import { Label } from 'flowbite-svelte';
	import AppName from './AppName.svelte';

	let error: string | null = null;

	$: if ($page.form?.error) {
		error = $page.form?.error;
		setTimeout(() => (error = null), 5000);
	} else {
		error = null;
	}
</script>

<div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
	<AppName />
	<div
		class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
	>
		<div class="p-6 space-y-4 md:space-y-6 sm:p-8">
			<h1
				class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
			>
				<slot name="title" />
			</h1>
			<slot />
			{#if error}
				<div class="text-center">
					<Label color="red" class="font-medium">{error}</Label>
				</div>
			{/if}
		</div>
	</div>
</div>
