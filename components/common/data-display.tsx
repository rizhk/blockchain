import { Alert, Button, CircularProgress, Grid, Skeleton, Typography } from '@mui/material';
import * as React from 'react';
import { CircularLoader } from './circular-loader';

interface NoDataComponentProps {
  predicate?: () => boolean;
  noDataComponent: React.ReactElement;
}

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
    <Grid container justifyContent="center">
      <CircularLoader sx={[{ m: 4 }]} />
    </Grid>
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
  // If data is available and no need to display no data found, display children
  if (data) return <>{content}</>;
  if (!isLoading && !!error) content = errorComponent || defaultErrorComponent;
  if (isLoading) content = loadingComponent || defaultLoadingComponent;
  return <>{content}</>;
};
