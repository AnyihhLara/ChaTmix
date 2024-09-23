<script lang="ts">
	import { currentChannel, currentChannelChange, loggedUser } from '$lib/stores';
	import { MessageCaptionSolid } from 'flowbite-svelte-icons';
	import ExitChannelModal from './Channel/ExitChannelModal.svelte';
	import InfoChannel from './Channel/InfoChannel.svelte';

	export let channel;

	$: activated = $currentChannel === channel.id;
	$: exitChannel = channel.id_user_owner !== $loggedUser?.id;
</script>

<li>
	<button
		class="w-full flex text-start items-center p-2 text-base font-medium text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 group
		{activated ? 'bg-primary-300 dark:bg-primary-700' : ''}"
		on:click|stopPropagation={() => {
			const previous = $currentChannel;
			$currentChannel = channel.id;
			if (previous !== $currentChannel) {
				$currentChannelChange = true;
			} else {
				$currentChannelChange = false;
			}
		}}
	>
		<MessageCaptionSolid />
		<span class="flex-1 ml-3 whitespace-nowrap break-words overflow-hidden text-ellipsis"
			><slot /></span
		>
		<div class="flex-shrink-0 flex items-center">
			{#if activated}
				<InfoChannel
					channelId={channel.id}
					channelName={channel.name}
					channelOwnerId={channel.id_user_owner}
				/>
				{#if exitChannel}
					<ExitChannelModal channelId={channel.id} />
				{/if}
			{/if}
		</div>
	</button>
</li>
