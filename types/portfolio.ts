import { BaseApiResponse } from './response';

export interface ITransactionHistoryFilters {
  wallet?: string[];
  newest?: string[];
  fromDate?: Date | null;
  toDate?: Date | null;
}

export interface TransactionHistoryResponse extends BaseApiResponse {
  items: TransactionHistory[];
}

export interface TransactionHistory {
  uid: string;
  id: string;
  data_type: string;
  hash: string;
  blockchain_network: string;
  block_hash: string;
  block_num: string;
  token_type: string;
  type: string;
  transaction_date: string;
  from: string;
  to: string;
  gas_used: string;
  gas_fiat: string;
  crypto_amount: string;
  crypto_amount_fiat: string;
  token_symbol: string;
  tag_name: string;
  note: string;
  CreatedAt: string;
  UpdatedAt: string;
}

export interface GetUserTagsResponse extends BaseApiResponse {
  items: Tag[];
}

export interface Tag {
  uid: string;
  id: string;
  data_type: string;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface CreateUserTagResponse extends BaseApiResponse {
  id: string;
}
