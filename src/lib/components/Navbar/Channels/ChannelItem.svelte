<script>
	import { TableBodyCell, TableBodyRow } from 'flowbite-svelte';
</script>

<TableBodyRow>
	<TableBodyCell><slot name="channel-name" /></TableBodyCell>
	<TableBodyCell><slot name="users" /></TableBodyCell>
	<TableBodyCell>
		<a href="/" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Edit</a>
	</TableBodyCell>
	<TableBodyCell>
		<a href="/" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Delete</a
		>
	</TableBodyCell>
</TableBodyRow>
