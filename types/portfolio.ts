import { BaseApiResponse } from './response';

export interface ITransactionHistoryFilters {
  wallet?: string;
  sort?: string;
  start_date?: Date | undefined;
  end_date?: Date | undefined;
}

export interface IAssetFilters {
  wallet?: string;
  desc: boolean;
  status?: string;
}

export interface TransactionHistoryResponse extends BaseApiResponse {
  items: TransactionHistory[];
}

export interface UpdateTransactionHistoryResponse extends BaseApiResponse {
  item: TransactionHistory;
}
export interface TransactionHistory {
  uid: string;
  id: string;
  wallet_id: string;
  module: string;
  hash: string;
  blockchain_network: string;
  block_hash: string;
  block_num: string;
  token_type: string;
  type: string;
  transaction_date: string;
  from: string;
  from_name: string;
  contract_address: string;
  to: string;
  to_name: string;
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

export interface WalletResponse extends BaseApiResponse {
  items: Wallet[];
}
export interface Wallet {
  id: string;
  type: string;
  name: string;
  icon_tag: string;
  address: string;
  fiat_value: string;
  fiat_currency: string;
  created_at: string;
  updated_at: string;
}

export interface AssetsResponse extends BaseApiResponse {
  total_bal: string;
  total_bal_symbol: string;
  items: Asset[];
}

export interface Asset {
  icon: string;
  name: string;
  symbol: string;
  balance: string;
  fiat_value: string;
  fiat_currency: string;
}
