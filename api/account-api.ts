import type { User } from '../types/user';
import { BaseApi } from './base-api';
import { PicanteApi } from './end-point';

class AccountApi extends BaseApi {
  async uploadAvatar(image: Blob, options: { defaultErrorMessage: string }) {
    const accessToken = globalThis.localStorage.getItem('accessToken') || '';

    const req = new FormData();
    req.append('pic', image, 'avatar.png');

    var response = await fetch(`${PicanteApi.UploadAvatar}`, {
      method: 'POST',
      headers: {
        Authentication: accessToken,
      },
      body: req,
    });
    const result = await this.handleFetchResponse(response, { ...options });
    return result;
  }
}

export const accountApi = new AccountApi();
