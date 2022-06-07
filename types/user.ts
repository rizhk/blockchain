export interface User {
	// id: string;
	// avatar?: string;
	email: string;
	full_name: string;
	skip_tutorial: boolean;
	// name: string;
	// wallets: string[];
	// bankAccounts: BankAccount[];
	[key: string]: any;
}

export interface BankAccount {
	id: string;
	accountNum: string;
	createdAt: string;
	updatedAt: string;
}
