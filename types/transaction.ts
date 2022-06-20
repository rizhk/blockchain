export interface Transaction {
	id: string;
	wallet_id: string;
	hash_initial: string;
	hash_transfer: string;
	txn_type: string;
	token: string;
	token_amt: number;
	fiat: string;
	fiat_amt: number;
	status: string;
	steps: TxnStep[];
	breakdown: TxnBreakdownItem[];
	created_at: string;
	updated_at: string;
}

export interface TxnStep {
	label: string;
	description: string;
	icon_status: string;
	date: Date;
}

export interface TxnBreakdownItem {
	txnId: string;
	tokenAmt: string;
	fiatAmt: string;
	date: Date;
}

export interface TransferRequest {
	txn_id: string;
	payment_id: string;
}

export interface CreateSellTxnRequest {
	offer_id: string;
	txn_hash: string;
}

export interface VeriftyTokenTransferRequest {
	txn_id: string;
	txn_hash: string;
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
		value: "In Processing",
	},
	{
		label: "Complete",
		value: "Complete",
	},
];

export const transactionRecentOptions = [
	{
		label: "Most recent",
		value: "Most recent",
	},
	{
		label: "Oldest",
		value: "Oldest",
	},
];
