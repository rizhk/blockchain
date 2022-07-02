import { subDays, subHours } from 'date-fns';
import type { Transaction, WithdrawalPreview } from '../types/transaction';
import { PicanteApi } from './end-point';
import { TransferRequest, CreateSellTxnRequest, VeriftyTokenTransferRequest } from 'types/transaction';
class TransactionApi {
  async createSellTxn({ offer_id, txn_hash }: { offer_id: string; txn_hash: string }): Promise<String> {
    return new Promise((resolve, reject) => {
      const accessToken = globalThis.localStorage.getItem('accessToken') || '';

      const req: CreateSellTxnRequest = {
        offer_id: offer_id,
        txn_hash: txn_hash,
      };

      console.log(req);

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

  async fetchWithdrawalPreview({ defaultErrorMessage }: fetchWithdrawalPreviewProps): Promise<WithdrawalPreview> {
    const accessToken = globalThis.localStorage.getItem('accessToken') || '';

    var result = await fetch(PicanteApi.fetchWithdrawalPreview, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authentication: accessToken,
      },
    });
    if (!result.ok) throw new Error(defaultErrorMessage);
    var body = (await result.json()) as WithdrawalPreview;
    if (!body) throw new Error(defaultErrorMessage);
    var { error, message } = body;
    if (error) throw new Error(message);
    return body;
  }

  cancelTransaction(txnId: string): Promise<void> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 3000);
    });
  }
}

interface fetchWithdrawalPreviewProps {
  defaultErrorMessage: string;
}

export const transactionApi = new TransactionApi();
