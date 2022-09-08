export interface BaseApiResponse {
  error: boolean;
  message?: string;
  message_code?: string;
}

export interface AttachmentApiResponse extends BaseApiResponse {
  blob: Blob;
  fileName: string;
  timestamp?: string;
}
