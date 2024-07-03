<script>
	import { Avatar, Card } from 'flowbite-svelte';
	export let avatar = '';

</script>

<div class="flex gap-2 mb-5">
	<Avatar src={avatar} class="w-9 h-8 md:w-10 md:h-10" />
	<Card color="pink" class="rounded-tl-none mt-4">
		<slot />
	</Card>
</div>
