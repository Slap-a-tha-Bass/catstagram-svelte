export const GET = async ({ cookies }) => {
	return new Response(null, {
		status: 303,
		headers: {
			'set-cookie': cookies.serialize('user', '', {
				secure: false,
				path: '/',
				expires: new Date(0),
				httpOnly: true,
				sameSite: 'lax'
			}),
			location: '/'
		}
	});
};
