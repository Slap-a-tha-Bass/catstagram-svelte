import type { User } from '$lib';
import { redirect } from '@sveltejs/kit';
import { parse } from 'cookie';

export async function load({ request, url }) {
	const cookies = parse(request.headers.get('cookie') || '');
	const user: User = cookies.user ? JSON.parse(cookies.user) : null;

	if (!user && url.pathname !== '/sign-in') {
		throw redirect(303, '/sign-in');
	}

	return {
		user
	};
}
