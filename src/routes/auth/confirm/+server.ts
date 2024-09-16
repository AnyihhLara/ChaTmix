import type { EmailOtpType } from '@supabase/supabase-js';
import { error, redirect } from '@sveltejs/kit';

import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url, locals: { supabase } }) => {
	const token_hash = url.searchParams.get('token_hash');
	const type = url.searchParams.get('type') as EmailOtpType | null;
	const next = url.searchParams.get('next') ?? '/auth/login';

	const redirectTo = new URL(url);
	redirectTo.pathname = next;
	redirectTo.searchParams.delete('token_hash');
	redirectTo.searchParams.delete('type');
	console.log(redirectTo);
	let e;

	if (token_hash && type) {
		const { error } = await supabase.auth.verifyOtp({ type, token_hash });
		if (!error) {
			redirectTo.searchParams.delete('next');
			redirect(303, redirectTo);
		}
		e = error;
	}
	if (e) {
		throw error(420, e.message);
	}
	redirectTo.pathname = '/auth/login';
	redirect(303, redirectTo);
};
