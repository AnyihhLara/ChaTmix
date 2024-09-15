<script>
	import { MessageCaptionSolid } from 'flowbite-svelte-icons';
</script>

<li>
	<a
		href="/"
		class="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
	>
		<MessageCaptionSolid />
		<span class="flex-1 ml-3 whitespace-nowrap"><slot /></span>
	</a>
</li>
