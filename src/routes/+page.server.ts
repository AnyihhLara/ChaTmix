import { redirect } from '@sveltejs/kit';

export const load = async ({ url }: { url: URL }) => {
	if (url.pathname === '/') {
		throw redirect(307, '/auth/login');
	}
};
