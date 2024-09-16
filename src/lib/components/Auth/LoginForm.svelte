<script lang="ts">
	import { Button, Checkbox, Input, Label } from 'flowbite-svelte';
	import AuthContainer from './AuthContainer.svelte';
</script>

<AuthContainer>
	<span slot="title">Sign in to your account</span>
	<form class="space-y-4 md:space-y-6" method="POST" action="?/login">
		<Label class="space-y-2">
			<span>Your email</span>
			<Input type="email" name="email" placeholder="name@company.com" required />
		</Label>
		<Label class="space-y-2">
			<span>Your password</span>
			<Input type="password" name="password" placeholder="••••••••" required />
		</Label>
		<div class="flex items-center justify-between">
			<div class="flex items-start">
				<Checkbox>Remember me</Checkbox>
			</div>
			<a href="/" class="ml-auto text-sm text-blue-700 hover:underline dark:text-blue-500"
				>Forgot password?</a
			>
		</div>
		<Button type="submit" class="w-full">Sign in</Button>
		<p class="text-sm font-light text-gray-500 dark:text-gray-400">
			Don’t have an account yet? <a
				href="/auth/signup"
				class="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a
			>
		</p>
	</form>
</AuthContainer>
