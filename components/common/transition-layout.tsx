import { useState, memo, useEffect } from 'react';

import * as React from 'react';
import { Box, keyframes, styled } from '@mui/system';

export interface ITransitionLayoutProps {}

const rightToLeft = keyframes`
  from {
    background-position-x: 50vw;
  }
  to {
    background-position-x: 0%;
  }
`;

export const TransitionLayout: React.FC<ITransitionLayoutProps> = ({ children }) => {
  const [transitionStage, setTransitionStage] = useState('fadeOut');
  useEffect(() => {
    setTransitionStage('fadeIn');
  }, []);

  return (
    <Box
      component="div"
      sx={[
        {
          width: '100vw',
          height: '100vh',
          // animation: `${rightToLeft} 1s ease`,
          // backgroundSize: 'cover',
        },
      ]}
    >
      <Box
        sx={[
          {
            zIndex: 1,
            position: 'fixed',
            width: '50vw',
            height: '100vh',
            background: 'color.contrastText',
          },
          transitionStage === 'fadeIn' && { width: 0 },
        ]}
      ></Box>
      <Box
        sx={[
          {
            zIndex: 1,
            position: 'fixed',
            width: '50vw',
            height: '100vh',
            left: '50vw',
            transition: 'all 1s',
            background: 'linear-gradient(90deg, #BC043D 0%, #FF5A04 100%)',
          },
          transitionStage === 'fadeIn' && { width: '100vw', backgroundPositionX: '0', left: 0 },
        ]}
      ></Box>
      {children}
    </Box>
  );
};
