import { CircularProgress, SxProps, Theme } from '@mui/material';
import * as React from 'react';

export interface ICircularLoaderProps {
  sx?: SxProps<Theme>;
}

export const CircularLoader: React.FC<ICircularLoaderProps> = ({ sx }) => {
  return (
    <CircularProgress
      color="secondary"
      size={35}
      sx={[{ textAlign: 'center' }, ...(Array.isArray(sx) ? sx : [sx])]}
      thickness={7}
    />
  );
};
