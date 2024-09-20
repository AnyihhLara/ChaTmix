<script>
	import { Button } from 'flowbite-svelte';
	import { PaperPlaneSolid } from 'flowbite-svelte-icons';
	export let disabled;
</script>

<Button pill={true} class="!p-2" type="submit" {disabled}>
	<PaperPlaneSolid class="h-6 w-6" />
</Button>
