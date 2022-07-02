import { BaseApiResponse } from 'types/response';

export class BaseApi {
  async handleFetchResponse<T extends BaseApiResponse>(
    result: any,
    options: { defaultErrorMessage: string },
  ): Promise<T> {
    let body = undefined;
    try {
      body = (await result.json()) as T;
    } catch (ex) {
      throw new Error(options.defaultErrorMessage);
    }
    if (!body) throw new Error(options.defaultErrorMessage);
    var { error, message } = body;
    if (error) throw new Error(message);
    return body;
  }
}
