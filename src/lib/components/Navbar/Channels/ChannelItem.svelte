<script lang="ts">
	import type { Channel } from '$lib/types';
	import { TableBodyCell, TableBodyRow } from 'flowbite-svelte';
	import ChannelDeleteModal from './ChannelDeleteModal.svelte';
	import ChannelModal from './ChannelModal.svelte';

	export let channel: Channel;
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
