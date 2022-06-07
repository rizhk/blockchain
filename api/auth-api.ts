import type { User } from "../types/user";
import { createResourceId } from "../utils/create-resource-id";
import { sign, decode, JWT_SECRET, JWT_EXPIRES_IN } from "../utils/jwt";
import { PicanteApi } from "./end-point";
import { wait } from "../utils/wait";
import { constrainPoint } from "@fullcalendar/common";

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

				fetch(PicanteApi.Auth, {
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
	}: // phone,
	{
		email: string;
		name: string;
		password: string;
		// phone: string;
	}): Promise<string> {
		return new Promise((resolve, reject) => {
			try {
				// Check if a user already exists
				let user = users.find((_user) => _user.email === email);

				if (user) {
					reject(new Error("User already exists"));
					return;
				}

				let body = {
					email,
					full_name: name,
					password,
					// phone,
				};

				fetch(PicanteApi.Register, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(body),
				})
					.then((response) => response.json())
					.then(
						(data) => {
							if (!data.error) {
								fetch(PicanteApi.Auth, {
									method: "POST",
									headers: {
										"Content-Type": "application/json",
									},
									body: JSON.stringify({
										email,
										password,
									}),
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
							} else {
								if (data.message != "") {
									reject(new Error(data.message));
								} else {
									reject(new Error("error"));
								}
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

	me(accessToken: string): Promise<User> {
		return new Promise((resolve, reject) => {
			try {
				fetch(PicanteApi.AuthMe, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authentication: accessToken,
					},
				})
					.then((response) => response.json())
					.then(
						(data) => {
							if (data.me) {
								resolve(data.me);
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

	tutorialSkip(accessToken: string): Promise<void> {
		return new Promise((resolve, reject) => {
			try {
				fetch(PicanteApi.TutorialSkip, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authentication: accessToken,
					},
					body: JSON.stringify({ skip_tutorial: true })
				})
					.then((response) => response.json())
					.then(
						(data) => {
							console.log(data)
							if (!data.error) {
								resolve();
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
		})
	}
}

export const authApi = new AuthApi();
