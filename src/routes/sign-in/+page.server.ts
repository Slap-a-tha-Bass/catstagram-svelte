import { redirect, type Actions } from '@sveltejs/kit';
import { OAuth2Client } from 'google-auth-library';
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from '$env/static/private';
import { AUTH_REDIRECT_URL } from '$lib';

export const actions: Actions = {
	OAuth2: async ({}) => {
		const oAuth2Client = new OAuth2Client(
			GOOGLE_CLIENT_ID,
			GOOGLE_CLIENT_SECRET,
			AUTH_REDIRECT_URL
		);

		const authorizeUrl = oAuth2Client.generateAuthUrl({
			access_type: 'offline',
			scope: [
				'https://www.googleapis.com/auth/userinfo.profile',
				'https://www.googleapis.com/auth/userinfo.email'
			],
			prompt: 'consent'
		});
		throw redirect(302, authorizeUrl);
	}
};
