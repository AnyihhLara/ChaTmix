<script lang="ts">
	import { Button } from 'flowbite-svelte';
	import { BarsOutline } from 'flowbite-svelte-icons';
	import { toggleClass } from '$lib/stores/index';

	function handleToggle() {
		if ($toggleClass === '') {
			$toggleClass = '-translate-x-full';
		} else {
			$toggleClass = '';
		}
	}
</script>

<Button
	class="p-2 mr-2 text-gray-600 rounded-lg cursor-pointer md:hidden hover:text-primary-700 dark:hover:text-primary-600 hover:bg-gray-100 focus:bg-gray-100 dark:focus:bg-gray-700 focus:ring-2 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-gray-400 dark:hover:bg-gray-700"
	color="none"
	on:click={handleToggle}
>
	<BarsOutline />
</Button>
