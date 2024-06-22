import { redirect } from '@sveltejs/kit';
import { OAuth2Client } from 'google-auth-library';
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from '$env/static/private';
import { AUTH_REDIRECT_URL } from '$lib';

export const GET = async ({ url, cookies }) => {
	const code = await url.searchParams.get('code');

	try {
		const oAuth2Client = new OAuth2Client(
			GOOGLE_CLIENT_ID,
			GOOGLE_CLIENT_SECRET,
			AUTH_REDIRECT_URL
		);
		const response = await oAuth2Client.getToken(code ?? '');
		oAuth2Client.setCredentials(response.tokens);

		const credentials = oAuth2Client.credentials;
		const ticket = await oAuth2Client.verifyIdToken({
			idToken: response.tokens.id_token || '',
			audience: GOOGLE_CLIENT_ID
		});
		const payload = ticket.getPayload();

		const user = {
			payload,
			credentials
		};
		return new Response(null, {
			status: 303,
			headers: {
				'set-cookie': cookies.serialize('user', JSON.stringify(user), {
					secure: false, // Set to true in production
					path: '/',
					httpOnly: true,
					sameSite: 'lax'
				}),
				location: '/'
			}
		});
	} catch (error) {
		console.error('Error logging in with Google', error);
	}
	throw redirect(303, '/');
};
