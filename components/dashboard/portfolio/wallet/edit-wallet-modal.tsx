import CloseIcon from '@mui/icons-material/Close';
import { LoadingButton } from '@mui/lab';
import { Box, DialogActions, FormHelperText, InputAdornment, TextField } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { walletApi } from 'api/portfolio/wallet-api';
import { useFormik } from 'formik';
import * as React from 'react';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Wallet } from 'types/portfolio/wallet';
import * as Yup from 'yup';

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

interface EditWalletDialogProps {
  open: boolean;
  handleClose: () => void;
  wallet: Wallet;
  parentCallback: (wallet: Wallet[]) => void;
}

export const EditWalletDialog: FC<EditWalletDialogProps> = (props) => {
  const { t } = useTranslation();

  const handleNameChange = (event: { target: { value: any } }) => {
    formik.setFieldValue('name', event.target.value);
  };

  const formik = useFormik({
    initialValues: {
      name: props.wallet.name,
      submit: null,
    },
    validationSchema: Yup.object({
      name: Yup.string().required(t('portfolio.walletList.walletNameRequired')),
    }),
    onSubmit: async (values, helpers): Promise<void> => {
      try {
        const networks = await walletApi.getNetworks();
        // todo fix network id matching, data was not given in wallet list
        const networkId = networks.find((network) => network.name === props.wallet.type)?.network_id;
        if (networkId == null) {
          throw new Error(`Network ${props.wallet.type} not found`);
        }

        const { error, message } = await walletApi.patch(
          {
            walletId: props.wallet.id,
            networkId,
            address: props.wallet.address,
            data: { name: values.name },
          },
          { defaultErrorMessage: t('portfolio.walletList.failToPatch') },
        );

        if (!error) {
          const data = await walletApi.getItems();
          props.parentCallback(data);
          props.handleClose();
          helpers.resetForm();
        }
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });

  return (
    <form noValidate onSubmit={formik.handleSubmit}>
      <BootstrapDialog onClose={props.handleClose} aria-labelledby="customized-dialog-title" open={props.open}>
        <BootstrapDialogTitle id="customized-dialog-title" onClose={props.handleClose}></BootstrapDialogTitle>
        <DialogContent>
          <Typography
            sx={{
              mb: 2,
            }}
          >
            {t('portfolio.walletList.editWallet')}
          </Typography>
          <TextField
            sx={{
              mt: 2,
              mb: 2,
            }}
            fullWidth
            id="create-wallet-network"
            label={t('portfolio.walletList.walletType')}
            value={props.wallet.type}
            disabled
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <img src={`/static/crypto/color/${props.wallet.icon_tag}.svg`} height="30" width="30" />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            sx={{
              mt: 2,
              mb: 2,
            }}
            fullWidth
            id="create-wallet-address"
            label={t('portfolio.walletList.walletAddress')}
            value={props.wallet.address}
            disabled
          />
          <TextField
            sx={{
              mt: 2,
              mb: 2,
            }}
            fullWidth
            id="create-wallet-name"
            label={t('portfolio.walletList.enterNickname')}
            placeholder="E.g. Sumner’s Metamask"
            value={formik.values.name}
            error={Boolean(formik.touched.name && formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            onChange={handleNameChange}
          />
          {formik.errors.submit && (
            <Box sx={{ mx: 1 }}>
              <FormHelperText error>{formik.errors.submit}</FormHelperText>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <LoadingButton
            onClick={() => formik.handleSubmit()}
            loading={formik.isSubmitting}
            color="info"
            type="submit"
            variant="contained"
          >
            {t('portfolio.walletList.edit')}
          </LoadingButton>
        </DialogActions>
      </BootstrapDialog>
    </form>
  );
};
