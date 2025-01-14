import type { FC } from 'react';
import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { FormControl, InputLabel, TextField, MenuItem } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Wallet } from 'types/wallet';
import { CreateWalletDialogs } from 'components/dashboard/wallets/create-wallet-modal';
import { Box, Button, Container, Grid, Modal, Typography, FormHelperText } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { walletApi } from 'api/wallet-api';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { NetworkSelector } from 'components/dashboard/network/network-selector';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

type WalletProps = {
  onWalletChange: any;
  error: boolean;
  helperText: string | false | undefined;
  wallets: Wallet[];
};

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
  parentCallback: Wallet[];
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

// export const WalletSelector: FC<{ wallet: string }> = (props) =>
export const WalletSelector: FC<WalletProps> = (props) => {
  const { onWalletChange, error, helperText, wallets, ...other } = props;
  const theme = useTheme();

  const [value, setValue] = React.useState('');

  const handleChange = (event: { target: { value: React.SetStateAction<string> } }) => {
    console.log(event);
    setValue(event.target.value);
    onWalletChange(event);
  };

  const [newWalletOpen, setNewWalletOpen] = React.useState(false);

  const handleClickOpen = () => {
    setNewWalletOpen(true);
  };
  const handleClose = () => {
    setNewWalletOpen(false);
  };

  const changeNetworkId = (event: { target: { value: any } }) => {
    formik.setFieldValue('networkId', event.target.value);
  };

  const handleAddressChange = (event: { target: { value: any } }) => {
    formik.setFieldValue('walletAddress', event.target.value);
  };

  const handleNameChange = (event: { target: { value: any } }) => {
    formik.setFieldValue('name', event.target.value);
  };

  const formik = useFormik({
    initialValues: {
      networkId: '80001',
      walletAddress: '',
      name: '',
    },
    validationSchema: Yup.object({
      networkId: Yup.string().required('Select a blockchain network'),
      walletAddress: Yup.string().required('Wallet address is required'),
      name: Yup.string().required('Wallet name is required'),
    }),
    onSubmit: async (values, helpers): Promise<void> => {
      try {
        const success = await walletApi.create(values);

        if (success) {
          const data = await walletApi.getItems();
          // props.wallets = data;
          props.parentCallback(data);
          handleClose();
        }
      } catch (err) {
        console.error(err);
        console.error(err.data.message);
      }
    },
  });

  return (
    <FormControl fullWidth>
      <TextField
        error={error}
        helperText={helperText}
        id="wallet-select"
        value={value}
        select
        label="Select receiving payee"
        onChange={handleChange}
        SelectProps={{ MenuProps: { disableScrollLock: true } }}
      >
        {/* {wallets.length == 0 && ( */}
        <MenuItem onClick={handleClickOpen}>Add new wallet</MenuItem>
        {/* )} */}
        {wallets.map((wallet) => {
          return (
            <MenuItem value={wallet.address} key={wallet.address}>
              {wallet.name} - {wallet.address}
            </MenuItem>
          );
        })}
      </TextField>
      <form noValidate onSubmit={formik.handleSubmit} {...props}>
        <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={newWalletOpen}>
          <BootstrapDialogTitle
            id="customized-dialog-title"
            onClose={handleClose}
            parentCallback={[]}
          ></BootstrapDialogTitle>
          <DialogContent>
            <Typography
              sx={{
                mb: 2,
              }}
            >
              Add a wallet
            </Typography>
            <NetworkSelector
              error={Boolean(formik.touched.networkId && formik.errors.networkId)}
              helperText={formik.touched.networkId && formik.errors.networkId}
              onNetworkChange={changeNetworkId}
            />
            <TextField
              sx={{
                mt: 2,
                mb: 2,
              }}
              fullWidth
              id="create-wallet-address"
              label="Wallet Address"
              value={formik.values.walletAddress}
              error={Boolean(formik.touched.walletAddress && formik.errors.walletAddress)}
              helperText={formik.touched.walletAddress && formik.errors.walletAddress}
              onChange={handleAddressChange}
            />
            <TextField
              sx={{
                mt: 2,
                mb: 2,
              }}
              fullWidth
              id="create-wallet-name"
              label="Enter a nickname"
              value={formik.values.name}
              error={Boolean(formik.touched.name && formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              onChange={handleNameChange}
            />
          </DialogContent>
          {formik.errors.submit && (
            <Box sx={{ mt: 3 }}>
              <FormHelperText error>{formik.errors.submit}</FormHelperText>
            </Box>
          )}
          <DialogActions>
            <Button
              sx={{
                mt: 4,
                background: '#5048E5',
                borderRadius: 1,
              }}
              variant="contained"
              type="submit"
              onClick={formik.handleSubmit}
            >
              Add wallet
            </Button>
          </DialogActions>
        </BootstrapDialog>
      </form>
    </FormControl>
  );
};
