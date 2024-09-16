import type { Actions } from '../$types';

export const actions: Actions = {
	signup: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;

		const { error } = await supabase.auth.signUp({
			email,
			password,
			options: {
				data: {
					name: email.split('@')[0]
				}
			}
		});
		if (error) {
			return { error: error.message };
		} else {
			return {
				success: true,
				message: 'Please check your email for a magic link to log into the website.'
			};
		}
	}
};
