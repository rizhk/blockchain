import { subDays, subHours } from 'date-fns';
import type { Wallet } from '../types/wallet';
import { PicanteApi } from './end-point';

const now = new Date();

type CreateWalletRequest = {
  name: string;
  chain_id: string;
  address: string;
};
class WalletApi {
  async create({
    networkId,
    walletAddress,
    name,
  }: {
    networkId: string;
    walletAddress: string;
    name: string;
  }): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const accessToken = globalThis.localStorage.getItem('accessToken') || '';

      const req: CreateWalletRequest = {
        name: name,
        chain_id: networkId,
        address: walletAddress,
      };

      fetch(PicanteApi.Wallet, {
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
              return resolve(true);
            }
          },
          (error) => {
            return reject(new Error(error.message));
          },
        );
    });
  }

  getItems(): Promise<Wallet[]> {
    return new Promise((resolve, reject) => {
      const accessToken = globalThis.localStorage.getItem('accessToken') || '';

      fetch(PicanteApi.Wallet, {
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
              const wallets = <Wallet[]>data.items;

              return resolve(wallets);
            }
          },
          (error) => {
            return reject(new Error(error.message));
          },
        );
    });
  }

  getItem(walletId: string): Promise<Wallet> {
    return new Promise((resolve, reject) => {
      const accessToken = globalThis.localStorage.getItem('accessToken') || '';

      fetch(PicanteApi.Wallet + '/' + walletId, {
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
              const wallets = <Wallet>data.item;

              return resolve(wallets);
            }
          },
          (error) => {
            return reject(new Error(error.message));
          },
        );
    });
  }

  remove(walletId: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const accessToken = globalThis.localStorage.getItem('accessToken') || '';

      fetch(PicanteApi.Wallet + '/' + walletId, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authentication: accessToken,
        },
      })
        .then((response) => response.json())
        .then(
          (data) => {
            if (!data.error) {
              return resolve(true);
            }
          },
          (error) => {
            return reject(new Error(error.message));
          },
        );
    });
  }
}

export const walletApi = new WalletApi();
