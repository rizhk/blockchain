import { subDays, subHours } from "date-fns";
import type { Transaction } from "../types/transaction";
import { PicanteApi } from "./end-point";

const now = new Date();

class TransactionApi {
	async create({
		waller_addr,
		hash,
		txn_type,
		token,
		token_amt,
		fiat,
		fiat_amt,
		amount,
		txnHash,
	}: {
		waller_addr: string;
		hash: string;
		txn_type: string;
		email: string;
		token: string;
		token_amt: string;
		fiat: string;
		fiat_amt: string;
		amount: string;
		txnHash: string;
	}): Promise<boolean> {
		return new Promise((resolve, reject) => {
			try {
				resolve(true);
			} catch (err) {
				console.error("[Transaction Create Api]: ", err);
				reject(new Error("Internal server error"));
			}
		});
	}

	getTransactions(): Promise<Transaction[]> {
		return new Promise((resolve, reject) => {
			const accessToken =
				globalThis.localStorage.getItem("accessToken") || "";

			fetch(PicanteApi.Transaction, {
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
							const transactions = <Transaction[]>data.items;

							return resolve(transactions);
						}
					},
					(error) => {
						return reject(new Error(error.message));
					}
				);
		});
	}

	getTransaction(txnId: string): Promise<Transaction> {
		return new Promise((resolve, reject) => {
			const accessToken =
				globalThis.localStorage.getItem("accessToken") || "";

			fetch(PicanteApi.Transaction + "/" + txnId, {
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
							const transactions = <Transaction>data.item;

							return resolve(transactions);
						}
					},
					(error) => {
						return reject(new Error(error.message));
					}
				);
		});
	}
}

export const transactionApi = new TransactionApi();
