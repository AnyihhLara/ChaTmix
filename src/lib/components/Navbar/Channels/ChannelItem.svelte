<script>
	import { TableBodyCell, TableBodyRow } from 'flowbite-svelte';
	import ChannelDeleteModal from './ChannelDeleteModal.svelte';
	import ChannelModal from './ChannelModal.svelte';
</script>

<TableBodyRow>
	<TableBodyCell><slot name="channel-name" /></TableBodyCell>
	<TableBodyCell><slot name="users" /></TableBodyCell>
	<TableBodyCell>
		<ChannelModal typeModal="Edit" />
	</TableBodyCell>
	<TableBodyCell>
		<ChannelDeleteModal />
	</TableBodyCell>
</TableBodyRow>
