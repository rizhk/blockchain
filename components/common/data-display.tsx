import { Alert, Skeleton } from '@mui/material';
import * as React from 'react';

export interface IDataDisplayProps {
  isLoading: boolean;
  error: string | undefined;
  loadingComponent?: React.ReactElement;
  defaultLoaderOptions?: React.ComponentProps<typeof Skeleton>;
  errorComponent?: React.ReactElement;
}

export const DataDisplay: React.FC<IDataDisplayProps> = ({
  isLoading,
  error,
  loadingComponent,
  errorComponent,
  children,
  defaultLoaderOptions,
}) => {
  const defaultLoadingComponent = (
    <Skeleton sx={{ bgcolor: 'neutral.200' }} animation="pulse" {...defaultLoaderOptions} />
  );
  const defaultErrorComponent = <Alert severity="error">{error}</Alert>;
  let content = children;
  if (isLoading) content = loadingComponent || defaultLoadingComponent;
  if (!isLoading && !!error) content = errorComponent || defaultErrorComponent;
  return <>{content}</>;
};
