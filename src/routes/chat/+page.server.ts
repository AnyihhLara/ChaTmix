import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	signout: async ({ locals: { supabase, safeGetSession } }) => {
		const { session } = await safeGetSession();
		if (session) {
			const { error } = await supabase.auth.signOut();
			if (!error) {
				redirect(303, '/auth/login');
			} else {
				throw new Error('Something went wrong logging you out');
			}
		}
	}
};
