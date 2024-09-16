<script>
	import { Avatar, Card } from 'flowbite-svelte';
</script>

<div class="flex gap-2 mb-5">
	<Avatar class="w-9 h-8 md:w-10 md:h-10" />
	<Card color="pink" class="rounded-tl-none mt-4">
		<slot />
	</Card>
</div>
