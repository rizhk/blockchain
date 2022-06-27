import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import ReactDOM from 'react-dom';

export interface IModalLoaderProps {
  isShowing: boolean;
}

export const ModalLoader: React.FC<IModalLoaderProps> = ({ isShowing }) => {
  return ReactDOM.createPortal(
    <Backdrop
      transitionDuration={{ appear: 500, enter: 500, exit: 500 }}
      sx={{ color: '#ffffff', zIndex: (theme) => theme.zIndex.modal + 1 }}
      open={isShowing}
    >
      <CircularProgress color="inherit" />
    </Backdrop>,
    document.body,
  );
};
