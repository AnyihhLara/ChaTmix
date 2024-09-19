<script lang="ts">
	import { TableBodyCell, TableBodyRow } from 'flowbite-svelte';
	import ChannelDeleteModal from './ChannelDeleteModal.svelte';
	import ChannelModal from './ChannelModal.svelte';
	import type { Channel } from '$lib/types';

	export let channel:Channel;
</script>

<TableBodyRow>
	<TableBodyCell><slot name="channel-name" /></TableBodyCell>
	<TableBodyCell><slot name="users" /></TableBodyCell>
	<TableBodyCell>
		<ChannelModal typeModal="Edit" {channel} />
	</TableBodyCell>
	<TableBodyCell>
		<ChannelDeleteModal {channel} />
	</TableBodyCell>
</TableBodyRow>
