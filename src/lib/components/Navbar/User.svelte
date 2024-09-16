<script lang="ts">
	import { Avatar, Dropdown, DropdownHeader } from 'flowbite-svelte';
</script>

<div class="flex items-center md:order-2 m-2">
	<Avatar
		id="avatar-menu"
		src=""
		class="h-7 w-7 hover:text-primary-700 dark:hover:text-primary-600"
	/>
</div>
<Dropdown placement="bottom" triggeredBy="#avatar-menu">
	<DropdownHeader>
		<span class="block text-sm"></span>
		<span class="block truncate text-sm font-medium"></span>
	</DropdownHeader>
	<form method="POST" action="?/signout">
		<button
			class="font-medium py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 w-full text-left"
			>Sign Out</button
		>
	</form>
</Dropdown>
