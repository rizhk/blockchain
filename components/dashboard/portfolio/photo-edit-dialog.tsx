import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { Box, DialogActions, FormHelperText, Grid, MenuItem, Slider, TextField } from '@mui/material';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { NetworkSelector } from 'components/dashboard/network/network-selector';
import { walletApi } from 'api/portfolio/wallet-api';
import { useMounted } from 'hooks/use-mounted';
import { BlockchainNetwork } from 'types/blockchain/network';
import { Wallet } from 'types/portfolio/wallet';
import { LoadingButton } from '@mui/lab';
import { useTranslation } from 'react-i18next';
import { useState, useRef } from 'react';
import { accountApi } from 'api/account-api';
import { useAuth } from 'hooks/use-auth';
import AvatarEditor from 'react-avatar-editor';

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

export const PhotoEditorDialog: React.FC = (props: any) => {
  const { t } = useTranslation();

  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);

  const [loading, setLoading] = useState(false);

  const editor = useRef<AvatarEditor>();

  const { updateUser } = useAuth();

  const handleScale = (_: any, value: number | number[], __: any) => {
    setScale(parseFloat(value));
  };

  const handleRotation = (_: any, value: number | number[], __: any) => {
    setRotate(parseFloat(value));
  };

  const handleUpload = () => {
    const canvasScaled = editor.current?.getImageScaledToCanvas();
    canvasScaled?.toBlob(async (blob) => {
      if (blob) {
        props.handleClose(canvasScaled?.toDataURL(), blob);
      }
    }, 'image/png');
  };

  React.useEffect(() => {}, []);

  return (
    <BootstrapDialog onClose={() => props.handleClose()} aria-labelledby="customized-dialog-title" open={props.open}>
      <Box sx={{ px: 3, py: 2 }}>Crop and rotate image</Box>
      <AvatarEditor
        ref={editor}
        image={props.image}
        width={250}
        height={250}
        border={[88, 33]}
        borderRadius={16}
        color={[0, 0, 0, 0.6]} // RGBA
        scale={scale}
        rotate={rotate}
        disableBoundaryChecks
        disableHiDPIScaling
      />
      <Box sx={{ display: 'flex', py: 3 }}>
        <Box sx={{ flex: 1, pl: 4, pr: 2 }}>
          <Typography variant="overline">Zoom</Typography>
          <Slider defaultValue={1} min={0.5} max={1.5} step={0.01} onChange={handleScale} />
        </Box>
        <Box sx={{ flex: 1, pl: 2, pr: 4 }}>
          <Typography variant="overline">Rotation</Typography>
          <Slider defaultValue={0} min={-180} max={180} step={1} onChange={handleRotation} />
        </Box>
      </Box>
      <DialogActions>
        <Box sx={{ mb: 2, mx: 2, display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography
            onClick={() => {
              props.handleClose();
            }}
            variant="caption2"
            sx={{ textDecoration: 'underline', cursor: 'pointer' }}
          >
            {t('portfolio.transHis.cancel')}
          </Typography>
          <LoadingButton onClick={handleUpload} loading={loading} color="info" type="submit" variant="contained">
            OK
          </LoadingButton>
        </Box>
      </DialogActions>
    </BootstrapDialog>
  );
};
