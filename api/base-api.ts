import { format } from 'date-fns';
import { AttachmentApiResponse, BaseApiResponse } from 'types/response';

export class BaseApi {
  async handleFetchResponse<T extends BaseApiResponse>(
    result: any,
    options: { defaultErrorMessage: string },
  ): Promise<T> {
    const { defaultErrorMessage } = options;
    let body = undefined;
    try {
      const contentType = result.headers.get('content-type');
      if (contentType && contentType.indexOf('application/json') !== -1) body = (await result.json()) as T;
    } catch (ex) {
      throw new Error(defaultErrorMessage);
    }
    if (!body) throw new Error(defaultErrorMessage);
    var { error, message, message_code } = body;
    if (error) throw new Error(message || message_code);
    return body;
  }
  async handleFetchAttachmentResponse(
    result: any,
    options: { defaultErrorMessage: string },
  ): Promise<AttachmentApiResponse> {
    const { defaultErrorMessage } = options;
    let body = undefined;
    try {
      const contentType = result.headers.get('content-type');
      if (contentType && contentType.indexOf('text/csv') !== -1) {
        var blob = await result.blob();
        if (!blob) body = undefined;
        else {
          body = {} as AttachmentApiResponse;
          body.blob = blob;
          const header = result.headers.get('content-disposition');
          const parts = header?.split(';');
          body.fileName = parts?.[1]?.split('=')[1] || `${format(new Date(), 'dd-MMM-yyyy')}.csv`;
        }
      }
    } catch (ex) {
      throw new Error(defaultErrorMessage);
    }
    if (!body) throw new Error(defaultErrorMessage);
    var { error, message, message_code } = body;
    if (error) throw new Error(message || message_code);
    return body;
  }
}
