import { PortfolioApiEndPoints } from './end-point';
import { PicanteApi } from './end-point';
import { BaseApi } from './base-api';
import { AttachmentApiResponse, BaseApiResponse } from 'types/response';
import {
  AssetsResponse,
  CreatePortfolioResponse,
  CreateUserTagResponse,
  GetTransactionBreakdownResponse,
  GetTrendsResponse,
  GetUserTagsResponse,
  GetWalletActivitiesResponse,
  GetWalletSyncStatusResponse,
  IExportTransactionFilters,
  ITransactionBreakdownFilters,
  ITransactionHistoryFilters,
  IWalletActivitiesFilters,
  TransactionHistory,
  TransactionHistoryResponse,
  UpdateTransactionHistoryResponse,
  WalletResponse,
  AuthmeResponse,
} from 'types/portfolio';
import { format } from 'date-fns-tz';

class PortfolioApi extends BaseApi {
  async exportTransactionHistory(
    filters: IExportTransactionFilters,
    options: { defaultErrorMessage: string },
  ): Promise<AttachmentApiResponse> {
    const accessToken = globalThis.localStorage.getItem('accessToken') || '';

    const filterParams = new URLSearchParams({
      ...(filters?.start_date ? { start_date: format(filters.start_date, 'yyyy-MM-dd') } : {}),
      ...(filters?.end_date ? { end_date: format(filters.end_date, 'yyyy-MM-dd') } : {}),
    });

    var result = await fetch(`${PortfolioApiEndPoints.ExportTransactionHistory}?${filterParams}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authentication: accessToken,
      },
    }).catch(() => {
      throw new Error(options.defaultErrorMessage);
    });

    var data = await this.handleFetchAttachmentResponse(result, { ...options });
    data.timestamp = new Date().toISOString();
    return data;
  }
  async getAllTransactionHistory(
    options: {
      limit: any;
      defaultErrorMessage: string;
    },
    filters: ITransactionHistoryFilters = {
      sort: 'DESC',
      limit: 0,
      page: 0,
    },
  ): Promise<TransactionHistoryResponse> {
    const limit = options.limit;
    const accessToken = globalThis.localStorage.getItem('accessToken') || '';
    const filterParams = new URLSearchParams({
      sort: filters.sort,
      ...(filters.start_date ? { start_date: format(filters.start_date, 'yyyy-MM-dd') } : {}),
      ...(filters.end_date ? { end_date: format(filters.end_date, 'yyyy-MM-dd') } : {}),
      ...(filters.keyword ? { keyword: filters.keyword } : {}),
      ...(filters.type ? { type: filters.type } : {}),
      ...(filters.status ? { status: filters.status } : {}),
    });
    if (filters.wallet) {
      filters.wallet?.forEach((w) => {
        filterParams.append('wallet[]', w);
      });
    }

    console.log(filters);
    console.log(filters.tag);

    if (filters.tag) {
      filters.tag?.forEach((w) => {
        filterParams.append('tag[]', w);
      });

      if (!filters.tag.length && Array.isArray(filters.tag)) {
        filterParams.append('tag[]', '');
      }
    }

    if (filters.limit) {
      filterParams.append('limit', filters.limit.toString());
    }
    if (filters.page) {
      filterParams.append('p', filters.page.toString());
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
    var data = await this.handleFetchResponse<TransactionHistoryResponse>(result, {
      ...options,
    });
    return data;
  }
  async getLatestNTranscationHistory(
    body: { latestN?: number },
    options: { defaultErrorMessage: string; limit: string },
  ): Promise<TransactionHistoryResponse> {
    const data = await this.getAllTransactionHistory({
      defaultErrorMessage: options?.defaultErrorMessage,
      limit: options?.limit,
    });
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
    var data = await this.handleFetchResponse<GetUserTagsResponse>(result, {
      ...options,
    });
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
    var data = await this.handleFetchResponse<CreateUserTagResponse>(result, {
      ...options,
    });
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
    var data = await this.handleFetchResponse<UpdateTransactionHistoryResponse>(result, {
      ...options,
    });
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
    var data = await this.handleFetchResponse<WalletResponse>(result, {
      ...options,
    });
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
  async getUserAssets(
    options: { defaultErrorMessage: string },
    filters: IWalletActivitiesFilters | undefined,
  ): Promise<AssetsResponse> {
    const accessToken = globalThis.localStorage.getItem('accessToken') || '';
    const filterParams = new URLSearchParams();
    if (filters?.wallet) {
      filters.wallet?.forEach((w) => {
        filterParams.append('wallet[]', w);
      });
    }
    var result = await fetch(`${PortfolioApiEndPoints.GetUserAssets}?${filterParams}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authentication: accessToken,
      },
    }).catch(() => {
      throw new Error(options.defaultErrorMessage);
    });
    var data = await this.handleFetchResponse<AssetsResponse>(result, {
      ...options,
    });
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
    var data = await this.handleFetchResponse<GetWalletSyncStatusResponse>(result, {
      ...options,
    });
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
    }).catch((error) => {
      throw new Error(options.defaultErrorMessage);
    });
    try {
      var data = await this.handleFetchResponse<BaseApiResponse>(result, {
        ...options,
      });
      return data;
    } catch (error) {
      if (error?.message === 'Data synchronization is already in progress') return { error: false };
      throw error;
    }
  }
  async getUserWalletActivities(
    options: { defaultErrorMessage: string },
    filters: IWalletActivitiesFilters | undefined,
  ): Promise<GetWalletActivitiesResponse> {
    const accessToken = globalThis.localStorage.getItem('accessToken') || '';
    const filterParams = new URLSearchParams({
      ...(filters?.start_date ? { start_date: format(filters.start_date, 'yyyy-MM-dd') } : {}),
      ...(filters?.end_date ? { end_date: format(filters.end_date, 'yyyy-MM-dd') } : {}),
    });
    if (filters?.wallet) {
      filters.wallet?.forEach((w) => {
        filterParams.append('wallet[]', w);
      });
    }
    var result = await fetch(`${PortfolioApiEndPoints.GetUserWalletActivities}?${filterParams}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authentication: accessToken,
      },
    }).catch(() => {
      throw new Error(options.defaultErrorMessage);
    });
    var data = await this.handleFetchResponse<GetWalletActivitiesResponse>(result, {
      ...options,
    });
    return data;
  }
  async getUserTransactionBreakdown(
    options: { defaultErrorMessage: string },
    filters?: ITransactionBreakdownFilters,
  ): Promise<GetTransactionBreakdownResponse> {
    const accessToken = globalThis.localStorage.getItem('accessToken') || '';
    const filterParams = new URLSearchParams({
      ...(filters?.start_date ? { start_date: format(filters.start_date, 'yyyy-MM-dd') } : {}),
      ...(filters?.end_date ? { end_date: format(filters.end_date, 'yyyy-MM-dd') } : {}),
    });
    if (filters?.wallet) {
      filters.wallet?.forEach((w) => {
        filterParams.append('wallet[]', w);
      });
    }
    // only apply type filter when one of them is selected
    if (filters?.types && filters.types.length == 1) {
      filterParams.append('type', filters.types[0]);
    }
    var result = await fetch(`${PortfolioApiEndPoints.GetUserTransactionBreakdown}?${filterParams}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authentication: accessToken,
      },
    }).catch(() => {
      throw new Error(options.defaultErrorMessage);
    });
    var data = await this.handleFetchResponse<GetTransactionBreakdownResponse>(result, {
      ...options,
    });
    return data;

    await new Promise((resolve) => setTimeout(resolve, 500));
    const testData = {
      total: 86_394_298.22,
      item_count: 86,
      items: [
        { name: 'Payroll', currency_iso3: 'USD', currency_symbol: '$', percentage: 40, value: 2_385_289 },
        { name: 'Equipment', currency_iso3: 'USD', currency_symbol: '$', percentage: 40, value: 2_385_289 },
        { name: 'Consultancy services', currency_iso3: 'USD', currency_symbol: '$', percentage: 20, value: 1_134_632 },
        { name: 'Rent', currency_iso3: 'USD', currency_symbol: '$', percentage: 15, value: 781_289 },
        { name: 'Entertainment', currency_iso3: 'USD', currency_symbol: '$', percentage: 5, value: 65_291 },
        { name: 'Others', currency_iso3: 'USD', currency_symbol: '$', percentage: 2, value: 65_291 },
      ],
    };
    return {
      error: false,
      ...testData,
    };
  }
  async getTrends(options: { defaultErrorMessage: string }): Promise<GetTrendsResponse> {
    const accessToken = globalThis.localStorage.getItem('accessToken') || '';

    var result = await fetch(PortfolioApiEndPoints.GetWalletTrends, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authentication: accessToken,
      },
    }).catch(() => {
      throw new Error(options.defaultErrorMessage);
    });
    var data = await this.handleFetchResponse<GetTrendsResponse>(result, {
      ...options,
    });
    return data;
  }

  async createPortfolio(
    body: { full_name: string; profile_pic?: Blob; base_currency: string },
    options: { defaultErrorMessage: string },
  ): Promise<CreatePortfolioResponse> {
    const accessToken = globalThis.localStorage.getItem('accessToken') || '';

    const req = new FormData();
    if (body.profile_pic) {
      req.append('profile_pic', body.profile_pic, 'avatar.png');
    }
    req.append('full_name', body.full_name);
    req.append('base_currency', body.base_currency);

    var result = await fetch(PortfolioApiEndPoints.CreatePortfolio, {
      method: 'POST',
      headers: {
        Authentication: accessToken,
      },
      body: req,
    }).catch(() => {
      throw new Error(options.defaultErrorMessage);
    });
    var data = await this.handleFetchResponse<CreatePortfolioResponse>(result, {
      ...options,
    });
    return data;
  }

  async Authme(): Promise<AuthmeResponse> {
    const accessToken = globalThis.localStorage.getItem('accessToken') || '';
    console.log('accessToken' + accessToken);

    var result = await fetch(PicanteApi.AuthMe, {
      method: 'POST',
      headers: {
        Authentication: accessToken,
      },
    }).catch((e: any) => {
      throw new Error(e.message);
    });
    var data = await this.handleFetchResponse<AuthmeResponse>(result, {
      defaultErrorMessage: 'Error Authme',
    });
    return data;
  }
}

export const portfolioApi = new PortfolioApi();
