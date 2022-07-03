import { Alert, Button, Skeleton, Typography } from '@mui/material';
import * as React from 'react';

export interface IDataDisplayProps {
  isLoading: boolean;
  error: string | undefined;
  loadingComponent?: React.ReactElement;
  defaultLoaderOptions?: React.ComponentProps<typeof Skeleton>;
  errorComponent?: React.ReactElement;
  shouldShowRetryOnError?: boolean;
  onClickRetry?: () => void;
}

export const DataDisplay: React.FC<IDataDisplayProps> = ({
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
    <Skeleton sx={{ bgcolor: 'neutral.200' }} animation="pulse" {...defaultLoaderOptions} />
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
  if (isLoading) content = loadingComponent || defaultLoadingComponent;
  if (!isLoading && !!error) content = errorComponent || defaultErrorComponent;
  return <>{content}</>;
};
