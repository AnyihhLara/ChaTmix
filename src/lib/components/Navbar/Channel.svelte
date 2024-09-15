<script>
	import { Dropdown, DropdownHeader, DropdownItem } from 'flowbite-svelte';
	import { MessageCaptionSolid } from 'flowbite-svelte-icons';
	import CreateChannelModal from './Channels/CreateChannelModal.svelte';
	import ChannelsListModal from './Channels/ChannelsListModal.svelte';
</script>

<div class="flex items-center md:order-2 m-2">
	<MessageCaptionSolid
		id="channel-menu"
		class="text-gray-600 dark:text-gray-300 hover:text-primary-700 dark:hover:text-primary-600"
	/>
</div>
<Dropdown placement="bottom" triggeredBy="#channel-menu">
	<DropdownHeader>
		<span class="block text-sm">Channels options</span>
	</DropdownHeader>
	<DropdownItem><CreateChannelModal /></DropdownItem>
	<DropdownItem><ChannelsListModal /></DropdownItem>
</Dropdown>
