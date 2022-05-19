import { subDays, subHours } from "date-fns";
import type { Wallet } from "../types/wallet";
import { PicanteApi } from "./end-point";

const now = new Date();

class WalletApi {
	// async create({
	// 	waller_addr,
	// 	hash,
	// 	txn_type,
	// 	token,
	// 	token_amt,
	// 	fiat,
	// 	fiat_amt,
	// 	amount,
	// 	txnHash,
	// }: {
	// 	waller_addr: string;
	// 	hash: string;
	// 	txn_type: string;
	// 	email: string;
	// 	token: string;
	// 	token_amt: string;
	// 	fiat: string;
	// 	fiat_amt: string;
	// 	amount: string;
	// 	txnHash: string;
	// }): Promise<boolean> {
	// 	return new Promise((resolve, reject) => {
	// 		try {
	// 			resolve(true);
	// 		} catch (err) {
	// 			console.error("[Wallet Create Api]: ", err);
	// 			reject(new Error("Internal server error"));
	// 		}
	// 	});
	// }

	getWallets(): Promise<Wallet[]> {
		return new Promise((resolve, reject) => {
			const accessToken =
				globalThis.localStorage.getItem("accessToken") || "";

			fetch(PicanteApi.Wallet, {
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
							const wallets = <Wallet[]>data.items;

							return resolve(wallets);
						}
					},
					(error) => {
						return reject(new Error(error.message));
					}
				);
		});
	}

	getWallet(walletId: string): Promise<Wallet> {
		return new Promise((resolve, reject) => {
			const accessToken =
				globalThis.localStorage.getItem("accessToken") || "";

			fetch(PicanteApi.Wallet + "/" + walletId, {
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
							const wallets = <Wallet>data.item;

							return resolve(wallets);
						}
					},
					(error) => {
						return reject(new Error(error.message));
					}
				);
		});
	}
}

export const walletApi = new WalletApi();
