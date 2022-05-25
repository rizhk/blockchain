import { subDays, subHours } from "date-fns";
import type { BankAccount } from "../types/bank-account";
import { PicanteApi } from "./end-point";

const now = new Date();

type CreateBankAccountRequest = {
	holder: string;
	acc_num: string;
	sort_code: string;
	iban: string;
};
class BankAccountApi {
	async create({
		holder,
		acc_num,
		sort_code,
		iban,
	}: {
		holder: string;
		acc_num: string;
		sort_code: string;
		iban: string;
	}): Promise<boolean> {
		return new Promise((resolve, reject) => {
			const accessToken =
				globalThis.localStorage.getItem("accessToken") || "";

			const req: CreateBankAccountRequest = {
				holder: holder,
				acc_num: acc_num,
				sort_code: sort_code,
				iban: iban,
			};

			fetch(PicanteApi.BankAccount, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authentication: accessToken,
				},
				body: JSON.stringify(req),
			})
				.then((response) => response.json())
				.then(
					(data) => {
						if (!data.error) {
							return resolve(true);
						}
					},
					(error) => {
						return reject(new Error(error.message));
					}
				);
		});
	}

	getItems(): Promise<BankAccount[]> {
		return new Promise((resolve, reject) => {
			const accessToken =
				globalThis.localStorage.getItem("accessToken") || "";

			fetch(PicanteApi.BankAccount, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authentication: accessToken,
				},
			})
				.then((response) => response.json())
				.then(
					(data) => {
						if (!data.error) {
							const bankAccounts = <BankAccount[]>data.items;

							return resolve(bankAccounts);
						}
					},
					(error) => {
						return reject(new Error(error.message));
					}
				);
		});
	}

	getItem(bankAccountId: string): Promise<BankAccount> {
		return new Promise((resolve, reject) => {
			const accessToken =
				globalThis.localStorage.getItem("accessToken") || "";

			fetch(PicanteApi.BankAccount + "/" + bankAccountId, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authentication: accessToken,
				},
			})
				.then((response) => response.json())
				.then(
					(data) => {
						if (!data.error) {
							const bankAccounts = <BankAccount>data.item;

							return resolve(bankAccounts);
						}
					},
					(error) => {
						return reject(new Error(error.message));
					}
				);
		});
	}

	remove(bankAccountId: string): Promise<boolean> {
		return new Promise((resolve, reject) => {
			const accessToken =
				globalThis.localStorage.getItem("accessToken") || "";

			fetch(PicanteApi.BankAccount + "/" + bankAccountId, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
					Authentication: accessToken,
				},
			})
				.then((response) => response.json())
				.then(
					(data) => {
						if (!data.error) {
							return resolve(true);
						}
					},
					(error) => {
						return reject(new Error(error.message));
					}
				);
		});
	}
}

export const bankAccountApi = new BankAccountApi();
