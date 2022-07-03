import { PicanteApi } from './end-point';
import type { CreateBuyOfferRequest, XRateResponse } from '../types/buy-offer';
import { BaseApi } from './base-api';
import { BaseApiResponse } from 'types/response';

class BuyOfferApi extends BaseApi {
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

  async getXRate(
    { fromCur, toCur }: { fromCur: string; toCur: string },
    options: { defaultErrorMessage: string },
  ): Promise<XRateResponse> {
    const accessToken = globalThis.localStorage.getItem('accessToken') || '';

    var result = await fetch(`${PicanteApi.XRate}?from=${fromCur}&to=${toCur}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authentication: accessToken,
      },
    });
    return await this.handleFetchResponse<XRateResponse>(result, options);
  }
}

export const buyOfferApi = new BuyOfferApi();
