export async function fetchApi<T>(url: string, method: string, body?: unknown): Promise<T> {
	const response = await fetch(url, {
		method,
		headers: {
			'Content-Type': 'application/json'
		},
		body: body ? JSON.stringify(body) : undefined
	});

	if (response.ok) {
		return await response.json();
	} else {
		const errorData = await response.json();
		throw new Error(`Error: ${errorData.message || response.statusText}`);
	}
}
