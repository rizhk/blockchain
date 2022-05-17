let PicanteApiHost = process.env.NEXT_PUBLIC_PICANTE_API_HOST;
export const PicanteApi = {
	Auth: PicanteApiHost + "/v1/auth",
	AuthMe: PicanteApiHost + "/v1/auth/me",
	PlaidCreatePaymentLinkToken:
		PicanteApiHost + "/v1/plaid/payment/link/token/create",
	Transaction: PicanteApiHost + "/v1/transaction/",
	RequestTransfer: PicanteApiHost + "/v1/contract/exchange/transfer/request",
};
