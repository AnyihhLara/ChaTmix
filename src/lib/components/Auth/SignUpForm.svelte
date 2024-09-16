<script lang="ts">
	import { Button, Input, Label, Helper } from 'flowbite-svelte';
	import AuthContainer from './AuthContainer.svelte';
	import { page } from '$app/stores';

	let form = { email: '', password: '', confirmPassword: '' };

	let disabled = false,
		error = '';
	let success: string | null = null;

	$: if (
		form.password !== form.confirmPassword &&
		form.password.trim() != '' &&
		form.confirmPassword.trim() != ''
	) {
		error = 'Passwords must be the same';
	} else {
		error = '';
	}

	$: if (
		form.email.trim() == '' ||
		form.password.trim() == '' ||
		form.confirmPassword.trim() == '' ||
		form.password !== form.confirmPassword
	) {
		disabled = true;
	} else {
		disabled = false;
	}

	$: if ($page.form?.success) {
		success = $page.form?.message;
		setTimeout(() => (success = null), 5000);
	} else {
		success = null;
	}
</script>

<AuthContainer>
	<span slot="title">Create an account</span>

	<form class="space-y-4" method="POST" action="?/signup">
		<Label class="space-y-2">
			<span>Your email</span>
			<Input
				type="email"
				name="email"
				placeholder="name@company.com"
				required
				bind:value={form.email}
			/>
		</Label>
		<Label class="space-y-2">
			<span>Your password</span>
			<Input
				type="password"
				name="password"
				placeholder="••••••••"
				required
				bind:value={form.confirmPassword}
			/>
		</Label>
		<Label class="space-y-2">
			<span>Confirm password</span>
			<Input
				type="password"
				name="confirm-password"
				placeholder="••••••••"
				required
				bind:value={form.password}
			/>
			{#if error}
				<Helper class="mt-2 font-bold" color="red">{error}</Helper>
			{/if}
		</Label>

		<Button type="submit" class="w-full" {disabled}>Create an account</Button>

		<p class="text-sm font-light text-gray-500 dark:text-gray-400">
			Already have an account? <a
				href="/auth/login"
				class="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</a
			>
		</p>

		{#if success}
			<div class="text-center">
				<Label color="green" class="font-medium">{success}</Label>
			</div>
		{/if}
	</form>
</AuthContainer>
