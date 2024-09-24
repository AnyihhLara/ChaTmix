import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';


export const actions: Actions = {
	login: async ({ locals: { supabase } }) => {
		const { data, error } = await supabase.auth.signInWithOAuth({
			provider: 'github',
			options: {
				redirectTo: 'http://localhost:3500/auth/callback'
			}
		});

		if (data.url) {
			redirect(303, data.url);
		}

		if (error) {
			return { error: error.message };
		}
	}
};
