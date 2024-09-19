<script>
	import { MessageCaptionSolid } from 'flowbite-svelte-icons';
</script>

<li>
	<button
		class="w-full flex text-start items-center p-2 text-base font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
		on:click
	>
		<MessageCaptionSolid />
		<span class="flex-1 ml-3 whitespace-nowrap"><slot /></span>
	</button>
</li>
