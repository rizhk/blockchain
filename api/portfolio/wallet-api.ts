import { subDays, subHours } from 'date-fns';
import { BlockchainNetwork } from 'types/blockchain/network';
import type { Wallet } from 'types/portfolio/wallet';
import { PortfolioApiEndPoints, PicanteApi } from 'api/end-point';
import { BaseApi } from 'api/base-api';
import { BaseApiResponse } from 'types/response';
import { CreateWalletResponse } from 'types/wallet';

const now = new Date();

type CreateWalletRequest = {
  name: string;
  network_id: string;
  address: string;
};

type EditWalletArgs = {
  walletId: string;
  networkId: string;
  address: string;
  name: string;
};

class WalletApi extends BaseApi {
  async create(
    {
      networkId,
      walletAddress,
      name,
    }: {
      networkId: string;
      walletAddress: string;
      name: string;
    },
    options: { defaultErrorMessage: string },
  ): Promise<CreateWalletResponse> {
    const accessToken = globalThis.localStorage.getItem('accessToken') || '';

    const req: CreateWalletRequest = {
      name: name,
      network_id: networkId,
      address: walletAddress,
    };

    var result = await fetch(PortfolioApiEndPoints.Wallet, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authentication: accessToken,
      },
      body: JSON.stringify(req),
    });
    var data = (await this.handleFetchResponse(result, { ...options })) as CreateWalletResponse;
    return data;
  }

  async patch({ walletId, networkId, address, name }: EditWalletArgs, options: { defaultErrorMessage: string }) {
    const accessToken = globalThis.localStorage.getItem('accessToken') || '';

    const req = {
      name,
      network_id: networkId,
      address,
    };

    var response = await fetch(`${PortfolioApiEndPoints.Wallet}/${walletId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authentication: accessToken,
      },
      body: JSON.stringify(req),
    });
    const result = (await this.handleFetchResponse(response, { ...options })) as CreateWalletResponse;
    return result;
  }

  getNetworks(): Promise<BlockchainNetwork[]> {
    return new Promise((resolve, reject) => {
      fetch(PicanteApi.Blockchain + '/network', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then(
          (data) => {
            if (!data.error) {
              const networks = <BlockchainNetwork[]>data.items;

              return resolve(networks);
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

      fetch(PortfolioApiEndPoints.Wallet, {
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

      fetch(PortfolioApiEndPoints.Wallet + '/' + walletId, {
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

      fetch(PortfolioApiEndPoints.Wallet + '/' + walletId, {
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
