import { Alert, Button, Grid, Skeleton, Typography } from '@mui/material';
import * as React from 'react';

export interface IDataDisplayProps<T> {
  data?: T;
  isLoading: boolean;
  error: string | undefined;
  loadingComponent?: React.ReactElement;
  defaultLoaderOptions?: React.ComponentProps<typeof Skeleton>;
  errorComponent?: React.ReactElement;
  shouldShowRetryOnError?: boolean;
  onClickRetry?: () => void;
  children?: React.ReactChild;
}

export const DataDisplay: <T>(props: IDataDisplayProps<T>) => React.ReactElement = ({
  data,
  isLoading,
  error,
  loadingComponent,
  errorComponent,
  children,
  defaultLoaderOptions,
  shouldShowRetryOnError = false,
  onClickRetry,
}) => {
  const defaultLoadingComponent = (
    <Skeleton sx={{ bgcolor: 'neutral.200', transform: 'unset' }} animation="pulse" {...defaultLoaderOptions} />
  );
  const defaultErrorComponent = (
    <>
      <Alert severity="error">
        {error}
        {shouldShowRetryOnError && (
          <Typography
            onClick={onClickRetry}
            variant="inherit"
            sx={{ ml: 1, display: 'inline-block', cursor: 'pointer', textDecoration: 'underline' }}
          >
            Retry
          </Typography>
        )}
      </Alert>
    </>
  );
  let content = children;
  if (data) return <>{content}</>;
  if (!isLoading && !!error) content = errorComponent || defaultErrorComponent;
  if (isLoading) content = loadingComponent || defaultLoadingComponent;
  return <>{content}</>;
};
