<script>
	import { page } from '$app/stores';
	import ErrorPage from '$lib/components/Auth/ErrorPage.svelte';

	let errorInfo = '';

	$: switch ($page.error?.message) {
		case 'Not Found':
			errorInfo = "Sorry, we can't find that page. You'll find lots to explore on the home page.";
			break;
		case 'Internal Server Error':
			errorInfo = "Sorry, we can't find that page. You'll find lots to explore on the home page.";
			break;
		default:
			errorInfo = 'Enhance your calm.';
			break;
	}
</script>

<ErrorPage>
	<span slot="error-info">{errorInfo}</span>
</ErrorPage>

