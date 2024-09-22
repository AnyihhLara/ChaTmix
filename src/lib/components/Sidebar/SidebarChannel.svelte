<script>
	import { MessageCaptionSolid } from 'flowbite-svelte-icons';
	export let activated = false;
</script>

<li>
	<button
		class="w-full flex text-start items-center p-2 text-base font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group
		{activated
			? 'bg-primary-300 dark:bg-primary-700'
			: ''}"
		on:click
	>
		<MessageCaptionSolid />
		<span class="flex-1 ml-3 whitespace-nowrap break-words"><slot /></span>
	</button>
</li>
