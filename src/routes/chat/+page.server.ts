import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
// import type { User } from '$lib/types';



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
	},
	// createchannel: async ({ request }) => {
		// const formData = await request.formData();
		// const name = formData.get('name') as string;
		// const users = formData.get('users') as User[];

		// if (error) {
		// 	return { error: error.message };
		// } else {
		// 	return {
		// 		success: true,
		// 		message: ''
		// 	};
		// }
	// }
};
