export interface UserPayload {
	iss: string;
	azp: string;
	aud: string;
	sub: string;
	at_hash: string;
	name: string;
	picture: string;
	given_name: string;
	family_name: string;
	iat: number;
	exp: number;
}

export interface Credentials {
	access_token: string;
	refresh_token: string;
	scope: string;
	token_type: string;
	id_token: string;
	expiry_date: number;
}

export interface User {
	payload: UserPayload;
	credentials: Credentials;
}

export interface AuthData {
	user: User;
}
