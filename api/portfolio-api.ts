import { PortfolioApiEndPoints } from './end-point';
import { BaseApi } from './base-api';
import { AttachmentApiResponse, BaseApiResponse } from 'types/response';
import {
  AssetsResponse,
  CreateUserTagResponse,
  GetUserTagsResponse,
  GetWalletSyncStatusResponse,
  ITransactionHistoryFilters,
  TransactionHistory,
  TransactionHistoryResponse,
  UpdateTransactionHistoryResponse,
  WalletResponse,
} from 'types/portfolio';
import { format } from 'date-fns-tz';

class PortfolioApi extends BaseApi {
  async exportTransactionHistory(body: {}, options: { defaultErrorMessage: string }): Promise<AttachmentApiResponse> {
    const accessToken = globalThis.localStorage.getItem('accessToken') || '';

    var result = await fetch(PortfolioApiEndPoints.ExportTransactionHistory, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authentication: accessToken,
      },
    }).catch(() => {
      throw new Error(options.defaultErrorMessage);
    });

    var data = (await this.handleFetchResponse(result, { ...options })) as AttachmentApiResponse;
    data.timestamp = new Date().toISOString();
    return data;
  }
  async getAllTransactionHistory(
    options: { defaultErrorMessage: string },
    filters: ITransactionHistoryFilters = { sort: 'DESC' },
  ): Promise<TransactionHistoryResponse> {
    const accessToken = globalThis.localStorage.getItem('accessToken') || '';
    const filterParams = new URLSearchParams({
      sort: filters.sort,
      ...(filters.start_date ? { start_date: format(filters.start_date, 'yyyy-MM-dd') } : {}),
      ...(filters.end_date ? { end_date: format(filters.end_date, 'yyyy-MM-dd') } : {}),
      ...(filters.keyword ? { keyword: filters.keyword } : {}),
      ...(filters.type ? { type: filters.type } : {}),
      ...(filters.status != undefined ? { status: filters.status } : {}),
    });
    if (filters.wallet) {
      filters.wallet?.forEach((w) => {
        filterParams.append('wallet[]', w);
      });
    }
    if (filters.tag) {
      filters.tag?.forEach((w) => {
        filterParams.append('tag[]', w);
      });
    }
    var result = await fetch(`${PortfolioApiEndPoints.GetAllTransactionHistory}?${filterParams}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authentication: accessToken,
      },
    }).catch(() => {
      throw new Error(options.defaultErrorMessage);
    });
    var data = (await this.handleFetchResponse<TransactionHistoryResponse>(result, {
      ...options,
    })) as TransactionHistoryResponse;
    return data;
  }
  async getLatestNTranscationHistory(
    body: { latestN?: number },
    options: { defaultErrorMessage: string },
  ): Promise<TransactionHistoryResponse> {
    const data = await this.getAllTransactionHistory({ defaultErrorMessage: options?.defaultErrorMessage });
    if (data?.items) data.items = data.items.slice(0, body.latestN);
    return data;
  }
  async getUserTags(options: { defaultErrorMessage: string }): Promise<GetUserTagsResponse> {
    const accessToken = globalThis.localStorage.getItem('accessToken') || '';

    var result = await fetch(PortfolioApiEndPoints.GetUserTags, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authentication: accessToken,
      },
    }).catch(() => {
      throw new Error(options.defaultErrorMessage);
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

    var result = await fetch(PortfolioApiEndPoints.CreateTransactionTag, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authentication: accessToken,
      },
      body: JSON.stringify(body),
    }).catch(() => {
      throw new Error(options.defaultErrorMessage);
    });
    var data = (await this.handleFetchResponse<CreateUserTagResponse>(result, {
      ...options,
    })) as CreateUserTagResponse;
    return data;
  }
  async updateTransaction(
    body: { tag_id?: string; note?: string; txnId: string },
    options: { defaultErrorMessage: string },
  ): Promise<UpdateTransactionHistoryResponse> {
    const accessToken = globalThis.localStorage.getItem('accessToken') || '';

    var result = await fetch(`${PortfolioApiEndPoints.UpdateTransaction}/${body.txnId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authentication: accessToken,
      },
      body: JSON.stringify(body),
    }).catch(() => {
      throw new Error(options.defaultErrorMessage);
    });
    var data = (await this.handleFetchResponse<UpdateTransactionHistoryResponse>(result, {
      ...options,
    })) as UpdateTransactionHistoryResponse;
    return data;
  }
  async getAllWallets(options: { defaultErrorMessage: string }): Promise<WalletResponse> {
    const accessToken = globalThis.localStorage.getItem('accessToken') || '';

    var result = await fetch(PortfolioApiEndPoints.GetAllWallets, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authentication: accessToken,
      },
    }).catch(() => {
      throw new Error(options.defaultErrorMessage);
    });
    var data = (await this.handleFetchResponse<WalletResponse>(result, {
      ...options,
    })) as WalletResponse;
    return data;
  }
  async getFirstNWallets(
    body: { latestN?: number },
    options: { defaultErrorMessage: string },
  ): Promise<WalletResponse> {
    const data = await this.getAllWallets({ defaultErrorMessage: options?.defaultErrorMessage });
    if (data?.items) data.items = data.items.slice(0, body.latestN);
    return data;
  }
  async getUserAssets(options: { defaultErrorMessage: string }): Promise<AssetsResponse> {
    const accessToken = globalThis.localStorage.getItem('accessToken') || '';

    var result = await fetch(PortfolioApiEndPoints.GetUserAssets, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authentication: accessToken,
      },
    }).catch(() => {
      throw new Error(options.defaultErrorMessage);
    });
    var data = (await this.handleFetchResponse<AssetsResponse>(result, {
      ...options,
    })) as AssetsResponse;
    return data;
  }
  async getWalletSyncStatus(options: { defaultErrorMessage: string }): Promise<GetWalletSyncStatusResponse> {
    const accessToken = globalThis.localStorage.getItem('accessToken') || '';

    var result = await fetch(PortfolioApiEndPoints.GetWalletSyncStatus, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authentication: accessToken,
      },
    }).catch(() => {
      throw new Error(options.defaultErrorMessage);
    });
    var data = (await this.handleFetchResponse<GetWalletSyncStatusResponse>(result, {
      ...options,
    })) as GetWalletSyncStatusResponse;
    return data;
  }
  async requestWalletSync(options: { defaultErrorMessage: string }): Promise<BaseApiResponse> {
    const accessToken = globalThis.localStorage.getItem('accessToken') || '';

    var result = await fetch(PortfolioApiEndPoints.RequestWalletSync, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authentication: accessToken,
      },
    }).catch(() => {
      throw new Error(options.defaultErrorMessage);
    });
    var data = (await this.handleFetchResponse<BaseApiResponse>(result, {
      ...options,
    })) as BaseApiResponse;
    return data;
  }
}

export const portfolioApi = new PortfolioApi();
