<script lang="ts">
	import { Label, Input, Button, Checkbox } from 'flowbite-svelte';
</script>

<section class="bg-gray-50 dark:bg-gray-900">
	<div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
		<a
			href="/"
			class="flex items-center mb-4 text-3xl font-mono font-semibold text-primary-800 dark:text-primary-500"
		>
			ChaTmix
		</a>
		<div
			class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
		>
			<div class="p-6 space-y-4 md:space-y-6 sm:p-8">
				<h1
					class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
				>
					Sign in to your account
				</h1>
				<form class="space-y-4 md:space-y-6" action="#">
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
							href="/"
							class="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a
						>
					</p>
				</form>
			</div>
		</div>
	</div>
</section>
