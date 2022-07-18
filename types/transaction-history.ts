export interface TransactionHistory {
  id: string;
  data_type: string;
  details: string;
  from_wallet_id: string;
  from_wallet_name: string;
  to_wallet_id: string;
  to_wallet_name: string;
  txn_date: string;
  token: string;
  token_amt: number;
  fiat: string;
  fiat_amt: number;
  fees_fiat_amt: number;
  fees_token_amt: number;
  total_token_amt: number;
  total_fiat_amt: number;
  notes: string;
  created_at: string;
  updated_at: string;
}
