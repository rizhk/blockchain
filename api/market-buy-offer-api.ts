import { PicanteApi } from './end-point';
import type { CreateBuyOfferRequest } from '../types/buy-offer';

class BuyOfferApi {
  async create(req: CreateBuyOfferRequest): Promise<Object> {
    return new Promise((resolve, reject) => {
      const accessToken = globalThis.localStorage.getItem('accessToken') || '';

      fetch(PicanteApi.BuyOffer, {
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
              return resolve(data);
            } else {
              return reject(new Error(data.message));
            }
          },
          (error) => {
            return reject(new Error(error.message));
          },
        );
    });
  }
}

export const buyOfferApi = new BuyOfferApi();
