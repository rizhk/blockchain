let PicanteApiHost = process.env.NEXT_PUBLIC_PICANTE_API_HOST;
export const PicanteApi = {
	Auth: PicanteApiHost + "/v1/auth",
	AuthMe: PicanteApiHost + "/v1/auth/me",
	BankAccount: PicanteApiHost + "/v1/bank-account",
	PlaidCreatePaymentLinkToken:
		PicanteApiHost + "/v1/plaid/payment/link/token/create",
	SellOffer: PicanteApiHost + "/v1/market/offer/sell",
	Transaction: PicanteApiHost + "/v1/transaction",
	Wallet: PicanteApiHost + "/v1/wallet",
	RequestTransfer: PicanteApiHost + "/v1/contract/exchange/transfer/request",
};
