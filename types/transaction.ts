interface TransactionCustomer {
	address1?: string;
	address2?: string;
	avatar?: string;
	city?: string;
	country?: string;
	email: string;
	name: string;
}

export interface TransactionItem {
	id: string;
	billingCycle: "daily" | "weekly" | "monthly" | "yearly";
	currency: string;
	name: string;
	quantity: number;
	unitAmount: number;
}

export type TransactionStatus =
	| "canceled"
	| "complete"
	| "pending"
	| "rejected";

export interface Transaction {
	id: string;
	coupon?: string | null;
	createdAt: number;
	currency?: string;
	customer: TransactionCustomer;
	items?: TransactionItem[];
	number?: string;
	paymentMethod: string;
	promotionCode?: string;
	status: TransactionStatus;
	totalAmount?: number;
}
