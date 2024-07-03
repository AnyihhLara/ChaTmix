<script>
	import SidebarToggler from '../Sidebar/SidebarToggler.svelte';
	import Logo from './Logo.svelte';
	import User from './User.svelte';
	import { DarkMode } from 'flowbite-svelte';
</script>

<nav
	class="bg-white border-b border-gray-200 px-4 py-2.5 dark:bg-gray-800 dark:border-gray-700 fixed left-0 right-0 top-0 z-50"
>
	<div class="flex flex-wrap justify-between items-center">
		<SidebarToggler/>
		<Logo />
		<div class="flex items-center lg:order-2">
			<DarkMode class="hover:text-primary-700 dark:hover:text-primary-600" />
			<User />
		</div>
	</div>
</nav>
