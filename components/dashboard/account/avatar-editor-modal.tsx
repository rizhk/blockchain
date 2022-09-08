import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { Box, DialogActions, FormHelperText, Grid, MenuItem, TextField } from '@mui/material';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { NetworkSelector } from 'components/dashboard/network/network-selector';
import { walletApi } from 'api/portfolio/wallet-api';
import { useMounted } from 'hooks/use-mounted';
import { BlockchainNetwork } from 'types/blockchain/network';
import { Wallet } from 'types/portfolio/wallet';
import { LoadingButton } from '@mui/lab';
import { useTranslation } from 'react-i18next';
import AvatarEditor from 'react-avatar-editor';
import { useState, useRef } from 'react';
import { accountApi } from 'api/account-api';
import { useAuth } from 'hooks/use-auth';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

export const AvatarEditorDialog: React.FC = (
  props: JSX.IntrinsicAttributes & React.ClassAttributes<HTMLFormElement> & React.FormHTMLAttributes<HTMLFormElement>,
) => {
  const { t } = useTranslation();

  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);

  const editor = useRef<AvatarEditor>();

  const { updateUser } = useAuth();

  const handleScale = (e: React.ChangeEvent<HTMLInputElement>) => {
    setScale(parseFloat(e.target.value));
  };

  const rotateLeft: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setRotate((rotate - 90) % 360);
  };

  const rotateRight: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setRotate((rotate + 90) % 360);
  };

  const handleUpload = () => {
    (editor.current?.getImage() as HTMLCanvasElement).toBlob(async (blob) => {
      if (blob) {
        try {
          const result = await accountApi.uploadAvatar(blob, { defaultErrorMessage: 'fail to upload' });
          if (!result.error) {
            await updateUser();
          }
        } catch (e) {
          console.log(e);
          alert(e);
        }
      }
    }, 'image/png');
  };

  React.useEffect(() => {}, []);

  return (
    <BootstrapDialog onClose={props.handleClose} aria-labelledby="customized-dialog-title" open={props.open}>
      <BootstrapDialogTitle id="customized-dialog-title" onClose={props.handleClose}></BootstrapDialogTitle>
      <DialogContent>
        <AvatarEditor
          ref={editor}
          image={props.image}
          width={200}
          height={200}
          border={50}
          color={[255, 255, 255, 0.6]} // RGBA
          scale={scale}
          rotate={rotate}
        />
        <br />
        Zoom:
        <input name="scale" type="range" onChange={handleScale} min={1} max="2" step="0.01" defaultValue="1" />
        <br />
        Rotate:
        <button onClick={rotateLeft}>Left</button>
        <button onClick={rotateRight}>Right</button>
        <br />
      </DialogContent>
      <DialogActions>
        <LoadingButton onClick={handleUpload} loading={false} color="info" type="submit" variant="contained">
          Upload
        </LoadingButton>
      </DialogActions>
    </BootstrapDialog>
  );
};
