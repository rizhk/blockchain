export interface BaseApiResponse {
  error: boolean;
  message?: string;
}

export interface AttachmentApiResponse extends BaseApiResponse {
  blob: Blob;
  fileName: string;
  timestamp?: string;
}
