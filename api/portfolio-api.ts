import { PicanteApi } from './end-point';
import { BaseApi } from './base-api';
import { AttachmentApiResponse, BaseApiResponse } from 'types/response';
import { TransactionHistory, TransactionHistoryResponse } from 'types/portfolio';

class PortfolioApi extends BaseApi {
  async exportTransactionHistory(body: {}, options: { defaultErrorMessage: string }): Promise<AttachmentApiResponse> {
    const accessToken = globalThis.localStorage.getItem('accessToken') || '';

    var result = await fetch(PicanteApi.ExportTransactionHistory, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authentication: accessToken,
      },
    });
    var data = (await this.handleFetchResponse(result, { ...options })) as AttachmentApiResponse;
    data.timestamp = new Date().toISOString();
    return data;
  }
  async getAllTransactionHistory(options: { defaultErrorMessage: string }): Promise<TransactionHistoryResponse> {
    const accessToken = globalThis.localStorage.getItem('accessToken') || '';

    var result = await fetch(PicanteApi.GetAllTransactionHistory, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authentication: accessToken,
      },
    });
    var data = (await this.handleFetchResponse<TransactionHistoryResponse>(result, {
      ...options,
    })) as TransactionHistoryResponse;
    return data;
  }
}

export const portfolioApi = new PortfolioApi();
