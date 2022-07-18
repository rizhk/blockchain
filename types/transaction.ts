import { BaseApiResponse } from './response';

export interface Transaction {
  id: string;
  sk: string;
  data_type: string;
  details: string;
  network_id: string;
  wallet_id: string;
  hash_sell_transfer: string;
  hash_buy_transfer: string;
  hash_withdraw_sell_transfer: string;
  txn_type: string;
  token: string;
  token_amt: number;
  fiat: string;
  fiat_amt: number;
  status: string;
  steps: TxnStep[];
  breakdown: TxnBreakdown[];
  allow_withdraw: boolean;
  created_at: string;
  updated_at: string;
}

export interface TxnStep {
  label: string;
  description: string;
  icon_status: string;
  date: string;
}

export interface TxnBreakdown {
  txn_id: string;
  token_amt: number;
  fiat_amt: number;
  date: string;
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
    label: 'Buy',
    value: 'Buy',
  },
  {
    label: 'Sell',
    value: 'Sell',
  },
];

export const transactionStatusOptions = [
  {
    label: 'Awaiting Token Transfer',
    value: 'awaiting_token_transfer',
  },
  {
    label: 'Pending Payment',
    value: 'pending_payment',
  },
  {
    label: 'Complete',
    value: 'complete',
  },
  {
    label: 'Closed',
    value: 'closed',
  },
  {
    label: 'Canceled',
    value: 'canceled',
  },
];

export const transactionRecentOptions = [
  {
    label: 'Most recent',
    value: 'Most recent',
  },
  {
    label: 'Oldest',
    value: 'Oldest',
  },
];

export enum TxnType {
  SELL = 'SELL',
  BUY = 'BUY',
}

export interface WithdrawalPreview extends BaseApiResponse {
  chain_token: string;
  suggested_gas_fee: number;
  pay_gem_token: string;
  pay_gem_amt: number;
}
