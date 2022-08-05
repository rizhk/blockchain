import { BaseApiResponse } from './response';

export interface Wallet {
  name: string;
  chain_id: string;
  address: string;
  created_at: string;
  updated_at: string;
}

export interface CreateWalletResponse extends BaseApiResponse {
  item_id: string;
}
