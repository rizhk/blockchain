export interface Transaction {
	id: string;
	walletId: string;
	hash_initial: string;
	hash_transfer: string;
	txn_type: string;
	token: string;
	tokenAmt: float64;
	fiat: string;
	fiatAmt: float64;
	status: string;
}

export const transactionTypeOptions = [
	{
		label: "Buy",
		value: "buy",
	},
	{
		label: "Sell",
		value: "sell",
	},
];

export const transactionStatusOptions = [
	{
		label: "In progress",
		value: "in_progress",
	},
	{
		label: "Completed",
		value: "completed",
	},
];
