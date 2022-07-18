import type { FC } from 'react';
import * as React from 'react';
import Button from '@mui/material/Button';
import { FormControl, InputLabel, TextField, MenuItem } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { BankAccount } from 'types/bank-account';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { Box, FormHelperText } from '@mui/material';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { bankAccountApi } from 'api/bank-account-api';

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

type BankAccountProps = {
  onPaymentMethodChange: any;
  error: boolean;
  helperText: string | false | undefined;
  bankAccounts: BankAccount[];
};

export const BankAccountSelector: FC<BankAccountProps> = (props) => {
  const { onPaymentMethodChange, error, helperText, bankAccounts, ...other } = props;
  const theme = useTheme();

  const [value, setValue] = React.useState('');

  const [newBankAccountOpen, setNewBankAccountOpen] = React.useState(false);

  const [saveErrorMsg, setSaveErrorMsg] = React.useState<string>('');

  const handleClickNewBankAccountOpen = () => {
    setNewBankAccountOpen(true);
  };
  const handleNewBankAccountClose = () => {
    setNewBankAccountOpen(false);
  };

  const handleChange = (event: { target: { value: React.SetStateAction<string> } }) => {
    setValue(event.target.value);
    onPaymentMethodChange(event);
  };

  const handleHolderChange = (event: { target: { value: any } }) => {
    formik.setFieldValue('holder', event.target.value);
  };

  const handleAccNumChange = (event: { target: { value: any } }) => {
    formik.setFieldValue('acc_num', event.target.value);
  };

  const handleSortCodeChange = (event: { target: { value: any } }) => {
    formik.setFieldValue('sort_code', event.target.value);
  };

  const handleIbanChange = (event: { target: { value: any } }) => {
    formik.setFieldValue('iban', event.target.value);
  };

  const formik = useFormik({
    initialValues: {
      holder: '',
      acc_num: '',
      sort_code: '',
      iban: '',
    },
    validationSchema: Yup.object({
      holder: Yup.string().required('Account holder is required'),
      acc_num: Yup.string().required('Account number is required'),
      sort_code: Yup.string().required('Sort code is required'),
      iban: Yup.string().required('Iban is required'),
    }),
    onSubmit: async (values, helpers): Promise<void> => {
      try {
        const success = await bankAccountApi.create(values);

        if (success) {
          const data = await bankAccountApi.getItems();
          props.parentCallback(data);
          handleNewBankAccountClose();
        } else {
          setSaveErrorMsg('Bank account info is incorrect, please recheck the detail.');
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
        id="payment-receive-select"
        value={value}
        label="Receiving bank"
        select
        onChange={handleChange}
        SelectProps={{ MenuProps: { disableScrollLock: true } }}
      >
        <MenuItem onClick={handleClickNewBankAccountOpen}>Add new account</MenuItem>
        {bankAccounts.map((bankAccount) => {
          return (
            // eslint-disable-next-line react/jsx-key
            <MenuItem value={bankAccount.iban}>
              {bankAccount.holder} - {bankAccount.acc_num}
            </MenuItem>
          );
        })}
      </TextField>
      <form noValidate onSubmit={formik.handleSubmit} {...props}>
        <BootstrapDialog
          onClose={handleNewBankAccountClose}
          aria-labelledby="customized-dialog-title"
          open={newBankAccountOpen}
        >
          <BootstrapDialogTitle
            id="customized-dialog-title"
            onClose={handleNewBankAccountClose}
            parentCallback={[]}
          ></BootstrapDialogTitle>
          <DialogContent>
            <Typography
              sx={{
                mb: 2,
              }}
            >
              Add an account
            </Typography>
            <TextField
              sx={{
                mt: 2,
                mb: 2,
              }}
              fullWidth
              id="create-bank-account-holder"
              label="Account holder"
              value={formik.values.holder}
              error={Boolean(formik.touched.holder && formik.errors.holder)}
              helperText={formik.touched.holder && formik.errors.holder}
              onChange={handleHolderChange}
            />
            <TextField
              sx={{
                mt: 2,
                mb: 2,
              }}
              fullWidth
              id="create-bank-account-acc-num"
              label="Account number"
              value={formik.values.acc_num}
              error={Boolean(formik.touched.acc_num && formik.errors.acc_num)}
              helperText={formik.touched.acc_num && formik.errors.acc_num}
              onChange={handleAccNumChange}
            />
            <TextField
              sx={{
                mt: 2,
                mb: 2,
              }}
              fullWidth
              id="create-bank-account-sort-code"
              label="Sort code"
              value={formik.values.sort_code}
              error={Boolean(formik.touched.sort_code && formik.errors.sort_code)}
              helperText={formik.touched.sort_code && formik.errors.sort_code}
              onChange={handleSortCodeChange}
            />
            <TextField
              sx={{
                mt: 2,
                mb: 2,
              }}
              fullWidth
              id="create-bank-account-iban"
              label="Iban"
              value={formik.values.iban}
              error={Boolean(formik.touched.iban && formik.errors.iban)}
              helperText={formik.touched.iban && formik.errors.iban}
              onChange={handleIbanChange}
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
              Add account
            </Button>
          </DialogActions>
        </BootstrapDialog>
      </form>
    </FormControl>
  );
};
