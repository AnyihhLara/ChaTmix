<script>
	import { Avatar, Dropdown, DropdownHeader, DropdownItem } from 'flowbite-svelte';
</script>

<div class="flex items-center md:order-2 m-2">
	<Avatar id="avatar-menu" src="" class="h-7 w-7 hover:text-primary-700 dark:hover:text-primary-600" />
</div>
<Dropdown placement="bottom" triggeredBy="#avatar-menu">
	<DropdownHeader>
		<span class="block text-sm">Josué</span>
		<span class="block truncate text-sm font-medium">name@gmail.com</span>
	</DropdownHeader>
	<DropdownItem href="/login">Sign out</DropdownItem>
</Dropdown>
