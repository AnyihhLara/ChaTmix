<script>
	import { Avatar, Card } from 'flowbite-svelte';
</script>

<div class="flex justify-end gap-2 mb-5">
	<Card color="primary" class="rounded-tr-none mt-4">
		<slot />
	</Card>
	<Avatar class="w-9 h-8 md:w-10 md:h-10" />
</div>
