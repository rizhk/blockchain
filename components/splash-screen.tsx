import type { FC } from 'react';
import { Box } from '@mui/material';
import { Logo } from './logo';
import { LazyLoadImage } from 'react-lazy-load-image-component';

export const SplashScreen: FC = () => (
  <Box
    sx={{
      alignItems: 'center',
      backgroundColor: 'neutral.900',
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      justifyContent: 'center',
      left: 0,
      p: 3,
      position: 'fixed',
      top: 0,
      width: '100vw',
      zIndex: 2000,
    }}
  >
    <img width="80" height="80" src={process.env.NEXT_PUBLIC_URL + 'static/loading-dual-rings.gif'} />
  </Box>
);
