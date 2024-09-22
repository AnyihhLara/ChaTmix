<script lang="ts">
	import {
		Modal,
		Table,
		TableBody,
		TableHead,
		TableHeadCell,
		Spinner,
		TableBodyRow,
		TableBodyCell
	} from 'flowbite-svelte';
	import type { User } from '$lib/types';
	import { onMount } from 'svelte';
	import { getChannel } from '$lib/services/channelService';
	import { loggedUser } from '$lib/stores';
	import { InfoCircleOutline } from 'flowbite-svelte-icons';

	export let channelId, channelName, channelOwnerId;

	let members: User[] = [],
		loading = true,
		defaultModal = false;

	$: title = channelName + ' members';

	onMount(async () => {
		if ($loggedUser) {
			const channel = await getChannel(channelId);
			members = channel.members ? channel.members : [];
			if (members) {
				loading = false;
			}
		}
	});
</script>

<button on:click={() => (defaultModal = true)}>
	<InfoCircleOutline class="mr-2 hover:text-primary-700 dark:hover:text-primary-500" />
</button>
<Modal {title} bind:open={defaultModal} class="min-w-full">
	<Table hoverable={true} class="">
		<TableHead>
			<TableHeadCell>User Name</TableHeadCell>
		</TableHead>
		<TableBody tableBodyClass="divide-y">
			{#each members as member}
				<TableBodyRow>
					<TableBodyCell
						>{member.name}
						<span class="text-primary-700 dark:text-primary-600 font-medium"
							>{member.id === channelOwnerId ? 'Owner' : ''}</span
						>
					</TableBodyCell>
				</TableBodyRow>
			{/each}
		</TableBody>
	</Table>
	{#if loading}
		<div class="w-full flex justify-center">
			<Spinner size="12" />
		</div>
	{/if}
</Modal>
