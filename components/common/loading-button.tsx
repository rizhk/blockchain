import { LoadingButton as MuiLoadingButton } from '@mui/lab';
import * as React from 'react';
import { RefObject, useEffect } from 'react';

export interface ILoadingButtonProps extends React.ComponentProps<typeof MuiLoadingButton> {
  isBlocking?: boolean;
}

export const LoadingButton: React.FC<ILoadingButtonProps> = ({ isBlocking = true, children, loading, ...rest }) => {
  useEffect(() => {
    if (isBlocking && loading) {
      document.body.style.pointerEvents = 'none';
      return;
    }
    if (isBlocking && !loading) {
      document.body.style.pointerEvents = 'unset';
      return;
    }
  }, [loading]);
  return (
    <MuiLoadingButton loading={loading} {...rest}>
      {children}
    </MuiLoadingButton>
  );
};
