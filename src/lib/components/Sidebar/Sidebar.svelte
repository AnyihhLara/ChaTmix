<script lang="ts">
	import { toggleClass, innerWidth } from '$lib/stores/index';
	import type { Channel } from '$lib/types';
	import SidebarChannel from './SidebarChannel.svelte';

	export let channels: Channel[] = [{ id: 1, name: 'Test'}];
	$: if ($innerWidth >= 768) {
		$toggleClass = '-translate-x-full';
	}
</script>

<aside
	class="{$toggleClass} fixed top-0 left-0 z-40 w-64 h-screen pt-14 transition-transform duration-500 bg-white border-r border-gray-200 md:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
>
	<div class="overflow-y-auto py-5 px-3 h-full bg-white dark:bg-gray-800">
		<ul class="space-y-2">
			{#if channels.length != 0}
				{#each channels as channel}
					<SidebarChannel>
						{channel.name}
					</SidebarChannel>
				{/each}
			{/if}
		</ul>
	</div>
</aside>
