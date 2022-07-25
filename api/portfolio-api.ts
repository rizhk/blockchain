import { PicanteApi } from './end-point';
import { BaseApi } from './base-api';
import { AttachmentApiResponse, BaseApiResponse } from 'types/response';
import {
  CreateUserTagResponse,
  GetUserTagsResponse,
  TransactionHistory,
  TransactionHistoryResponse,
} from 'types/portfolio';

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
  async getUserTags(options: { defaultErrorMessage: string }): Promise<GetUserTagsResponse> {
    const accessToken = globalThis.localStorage.getItem('accessToken') || '';

    var result = await fetch(PicanteApi.GetUserTags, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authentication: accessToken,
      },
    });
    var data = (await this.handleFetchResponse<GetUserTagsResponse>(result, {
      ...options,
    })) as GetUserTagsResponse;
    return data;
  }
  async createTransactionTag(
    body: { name: string },
    options: { defaultErrorMessage: string },
  ): Promise<CreateUserTagResponse> {
    const accessToken = globalThis.localStorage.getItem('accessToken') || '';

    var result = await fetch(PicanteApi.CreateTransactionTag, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authentication: accessToken,
      },
      body: JSON.stringify(body),
    });
    var data = (await this.handleFetchResponse<CreateUserTagResponse>(result, {
      ...options,
    })) as CreateUserTagResponse;
    return data;
  }
  async updateTransaction(
    body: { tag_id?: string; note?: string; txnId: string },
    options: { defaultErrorMessage: string },
  ): Promise<TransactionHistoryResponse> {
    const accessToken = globalThis.localStorage.getItem('accessToken') || '';

    var result = await fetch(`${PicanteApi.UpdateTransaction}/${body.txnId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authentication: accessToken,
      },
      body: JSON.stringify(body),
    });
    var data = (await this.handleFetchResponse<TransactionHistoryResponse>(result, {
      ...options,
    })) as TransactionHistoryResponse;
    return data;
  }
}

export const portfolioApi = new PortfolioApi();
