<script lang="ts">
	import { Button } from 'flowbite-svelte';
	import AuthContainer from './AuthContainer.svelte';
	import { GithubSolid } from 'flowbite-svelte-icons';
</script>

<AuthContainer>
	<span slot="title">Sign in with your GitHub account</span>
	<img src="/logo.png" alt='logo'/>
	<form class="space-y-4 md:space-y-6" method="POST" action="?/login">
		<Button type="submit" class="w-full"><GithubSolid /> Sign in with GitHub</Button>
	</form>
</AuthContainer>
