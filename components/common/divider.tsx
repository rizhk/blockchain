import { Box, SxProps, Theme } from '@mui/system';
import * as React from 'react';

export interface IDividerProps {
  sx?: SxProps<Theme> | undefined;
}

export const Divider: React.FC<IDividerProps> = ({ sx }) => {
  return (
    <Box
      component="hr"
      sx={[
        {
          width: '100%',
          my: 1,
          display: 'block',
          height: '1px',
          border: 0,
          borderTop: '1px solid #E6E8F0',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    />
  );
};
