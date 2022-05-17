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
		const transactions: Transaction[] = [
			{
				id: "5ecb8a6879877087d4aa2690",
				walletId: "fake wallet",
				hash_initial: "fake hash",
				hash_transfer: "hash_transfer",
				txn_type: "buy",
				token: "USDC",
				tokenAmt: 123.23,
				fiat: "GBP",
				fiatAmt: 123.45,
				status: "in_progress",
			},
		];

		return Promise.resolve(transactions);
	}

	getTransaction(): Promise<Transaction> {
		const transaction: Transaction = {
			id: "5ecb8a6879877087d4aa2690",
			walletId: "fake wallet",
			hash_initial: "fake hash",
			hash_transfer: "hash_transfer",
			txn_type: "buy",
			token: "USDC",
			tokenAmt: 123.23,
			fiat: "GBP",
			fiatAmt: 123.45,
			status: "in_progress",
		};

		return Promise.resolve(transaction);
	}
}

export const transactionApi = new TransactionApi();
