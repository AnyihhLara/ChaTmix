<script>
	import { DropdownItem } from 'flowbite-svelte';
	let defaultModal = false;
</script>

<DropdownItem on:click={() => (defaultModal = true)}>Your channels</DropdownItem>
