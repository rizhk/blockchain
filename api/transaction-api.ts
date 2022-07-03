import { subDays, subHours } from 'date-fns';
import type { Transaction, WithdrawalPreview } from '../types/transaction';
import { PicanteApi } from './end-point';
import { TransferRequest, CreateSellTxnRequest, VeriftyTokenTransferRequest } from 'types/transaction';
import { BaseApi } from './base-api';
import { BaseApiResponse } from 'types/response';
class TransactionApi extends BaseApi {
  async createSellTxn({ offer_id, txn_hash }: { offer_id: string; txn_hash: string }): Promise<String> {
    return new Promise((resolve, reject) => {
      const accessToken = globalThis.localStorage.getItem('accessToken') || '';

      const req: CreateSellTxnRequest = {
        offer_id: offer_id,
        txn_hash: txn_hash,
      };

      fetch(PicanteApi.SellTxn, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authentication: accessToken,
        },
        body: JSON.stringify(req),
      })
        .then((response) => response.json())
        .then(
          (data) => {
            if (!data.error) {
              return resolve(data.txn_id);
            }
          },
          (error) => {
            return reject(new Error(error.message));
          },
        );
    });
  }

  getTransactions(): Promise<Transaction[]> {
    return new Promise((resolve, reject) => {
      const accessToken = globalThis.localStorage.getItem('accessToken') || '';

      fetch(PicanteApi.Transaction, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authentication: accessToken,
        },
      })
        .then((response) => response.json())
        .then(
          (data) => {
            if (!data.error) {
              const transactions = <Transaction[]>data.items;

              return resolve(transactions);
            }
          },
          (error) => {
            return reject(new Error(error.message));
          },
        );
    });
  }

  getTransaction(txnId: string): Promise<Transaction> {
    return new Promise((resolve, reject) => {
      const accessToken = globalThis.localStorage.getItem('accessToken') || '';

      fetch(PicanteApi.Transaction + '/' + txnId, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authentication: accessToken,
        },
      })
        .then((response) => response.json())
        .then(
          (data) => {
            if (!data.error) {
              const transaction = <Transaction>data.item;

              return resolve(transaction);
            }
          },
          (error) => {
            return reject(new Error(error.message));
          },
        );
    });
  }

  requestTransfer(req: TransferRequest): Promise<string> {
    return new Promise((resolve, reject) => {
      const accessToken = globalThis.localStorage.getItem('accessToken') || '';

      fetch(PicanteApi.RequestTransfer, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authentication: accessToken,
        },
        body: JSON.stringify(req),
      })
        .then((response) => response.json())
        .then(
          (data) => {
            if (!data.txn_hash_hex) {
              return reject(new Error(data.message));
            } else {
              return resolve(data.txn_hash_hex);
            }
          },
          (error) => {
            return reject(new Error(error.message));
          },
        );
    });
  }

  verifyTokenTransfer(req: VeriftyTokenTransferRequest): Promise<string> {
    return new Promise((resolve, reject) => {
      const accessToken = globalThis.localStorage.getItem('accessToken') || '';

      fetch(PicanteApi.VerfiyTokenTransfer, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authentication: accessToken,
        },
        body: JSON.stringify(req),
      })
        .then((response) => response.json())
        .then(
          (data) => {
            if (!data.message) {
              return reject(new Error('transfer request error'));
            } else {
              return resolve(data.message);
            }
          },
          (error) => {
            return reject(new Error(error.message));
          },
        );
    });
  }

  async fetchWithdrawalPreview(options: { defaultErrorMessage: string }): Promise<WithdrawalPreview> {
    const accessToken = globalThis.localStorage.getItem('accessToken') || '';

    var result = await fetch(PicanteApi.FetchWithdrawalPreview, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authentication: accessToken,
      },
    });
    return await this.handleFetchResponse<WithdrawalPreview>(result, options);
  }

  async withdrawTransaction(
    body: { txn_id: string },
    options: { defaultErrorMessage: string },
  ): Promise<BaseApiResponse> {
    const accessToken = globalThis.localStorage.getItem('accessToken') || '';

    var result = await fetch(PicanteApi.WithdrawTransaction, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authentication: accessToken,
      },
      body: JSON.stringify(body),
    });
    return await this.handleFetchResponse(result, options);
  }
}

export const transactionApi = new TransactionApi();
