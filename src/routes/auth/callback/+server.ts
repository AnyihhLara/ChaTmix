import { redirect, error as e } from '@sveltejs/kit';

export const GET = async (event): Promise<void> => {
	const {
		url,
		locals: { supabase }
	} = event;
	const code = url.searchParams.get('code') as string;
	const next = url.searchParams.get('next') ?? '/';

	if (code) {
		const { error } = await supabase.auth.exchangeCodeForSession(code);
		if (error) {
			throw e(420, error.message);
		}
		throw redirect(303, `/${next.slice(1)}`);
	}
};
