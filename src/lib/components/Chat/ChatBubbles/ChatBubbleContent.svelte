<header class="flex justify-between items-center">
	<p class="font-bold"><slot name="username" /></p>
	<small class="opacity-50"><slot name="timestamp" /></small>
</header>
<p class="mt-1 text-black dark:text-white break-words"><slot name="message" /></p>
