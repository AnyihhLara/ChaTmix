<script lang="ts">
	import { getChannel } from '$lib/services/channelService';
	import { loggedUser } from '$lib/stores';
	import { supabase } from '$lib/supabaseClient';
	import type { User } from '$lib/types';
	import {
		Modal,
		Spinner,
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell
	} from 'flowbite-svelte';
	import { InfoCircleOutline } from 'flowbite-svelte-icons';
	import { onMount } from 'svelte';

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
		supabase
			.channel('_ChannelMembers')
			.on(
				'postgres_changes',
				{ event: 'INSERT', schema: 'public', table: '_ChannelMembers' },
				async (payload) => {
					if (payload.new['A'] === channelId) {
						const newMembers = (await getChannel(channelId)).members;
						if (newMembers) {
							members = [...members, ...newMembers];
						}
					}
				}
			)
			.on(
				'postgres_changes',
				{ event: 'DELETE', schema: 'public', table: '_ChannelMembers' },
				async (payload) => {
					if (payload.old['A'] === channelId) {
						members = members.filter((member) => member.id !== payload.old['B']);
					}
				}
			)
			.subscribe();
		supabase
			.channel('Channel')
			.on(
				'postgres_changes',
				{ event: 'UPDATE', schema: 'public', table: 'Channel' },
				async (payload) => {
					const updatedChannel = await getChannel(payload.new['id']);
					if (
						updatedChannel.members &&
						updatedChannel.members.filter((member) => member.id === $loggedUser?.id).length <= 0
					) {
						members = members.filter((member) => member.id !== $loggedUser?.id);
					}
				}
			)
			.subscribe();
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
