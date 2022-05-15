import type { User } from "../types/user";
import { createResourceId } from "../utils/create-resource-id";
import { sign, decode, JWT_SECRET, JWT_EXPIRES_IN } from "../utils/jwt";
import { wait } from "../utils/wait";

const PicanteAPI = process.env.NEXT_PUBLIC_PICANTE_API_END_POINT;

const users: User[] = [
	{
		id: "5e86809283e28b96d2d38537",
		//avatar: '/static/mock-images/avatars/avatar-anika_visser.png',
		email: "demo@picante.io",
		// name: "Picante Demo",
		// password: "Password123!",
		// wallets: ["0xB77F68Af0B76C825073F89C03b8323E7290C641D"],
		// bankAccounts: [
		// 	{
		// 		id: "string",
		// 		accountNum: "string",
		// 		createdAt: "string",
		// 		updatedAt: "string",
		// 	},
		// ],
		// plan: "Premium",
	},
];

type LoginRequest = {
	email: string;
	password: string;
};
class AuthApi {
	async login({
		email,
		password,
	}: {
		email: string;
		password: string;
	}): Promise<string> {
		return new Promise((resolve, reject) => {
			try {
				// Find the user
				let l: LoginRequest = {
					email: email,
					password: password,
				};

				const path = PicanteAPI + "/v1/auth";

				fetch(path, {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(l),
				})
					.then((response) => response.json())
					.then(
						(data) => {
							console.log(data);
							if (!data.error) {
								resolve(data.token);
							} else {
								reject(new Error("error"));
							}
						},
						(error) => {
							reject(new Error(error.message));
						}
					);
			} catch (err) {
				console.error("[Auth Api]: ", err);
				reject(new Error("Internal server error"));
			}
		});
	}

	async register({
		email,
		name,
		password,
	}: {
		email: string;
		name: string;
		password: string;
	}): Promise<string> {
		await wait(1000);

		return new Promise((resolve, reject) => {
			try {
				// Check if a user already exists
				let user = users.find((_user) => _user.email === email);

				if (user) {
					reject(new Error("User already exists"));
					return;
				}

				user = {
					id: createResourceId(),
					avatar: undefined,
					email,
					name,
					password,
					wallets: ["0xB77F68Af0B76C825073F89C03b8323E7290C641D"],
					bankAccounts: [
						{
							id: "string",
							accountNum: "string",
							createdAt: "string",
							updatedAt: "string",
						},
					],
					plan: "Standard",
				};

				users.push(user);

				const accessToken = sign({ userId: user.id }, JWT_SECRET, {
					expiresIn: JWT_EXPIRES_IN,
				});

				resolve(accessToken);
			} catch (err) {
				console.error("[Auth Api]: ", err);
				reject(new Error("Internal server error"));
			}
		});
	}

	me(accessToken: string): Promise<User> {
		return new Promise((resolve, reject) => {
			try {
				const path = PicanteAPI + "/v1/auth/me";

				fetch(path, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authentication: accessToken,
					},
				})
					.then((response) => response.json())
					.then(
						(data) => {
							if (data.fake_me) {
								resolve(data.fake_me);
							} else {
								reject(
									new Error("Invalid authorization token")
								);
							}
						},
						(error) => {
							reject(new Error(error.message));
						}
					);
			} catch (err) {
				console.error("[Auth Api]: ", err);
				reject(new Error("Internal server error"));
			}
		});
	}
}

export const authApi = new AuthApi();
