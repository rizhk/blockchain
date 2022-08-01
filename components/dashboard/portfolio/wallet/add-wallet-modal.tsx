import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { Box, FormHelperText, Grid, TextField } from '@mui/material';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { NetworkSelector } from 'components/dashboard/network/network-selector';
import { walletApi } from 'api/portfolio/wallet-api';
import { useMounted } from 'hooks/use-mounted';
import { BlockchainNetwork } from 'types/blockchain/network';
import { Wallet } from 'types/portfolio/wallet';

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

export const AddWalletDialog: FC = (
  props: JSX.IntrinsicAttributes & React.ClassAttributes<HTMLFormElement> & React.FormHTMLAttributes<HTMLFormElement>,
) => {
  const isMounted = useMounted();

  const [step, setStep] = React.useState(1);
  const [networks, setNetworks] = React.useState<BlockchainNetwork[]>([]);

  const getNetworks = React.useCallback(async () => {
    try {
      const data = await walletApi.getNetworks();

      if (isMounted()) {
        setNetworks(data);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted]);

  React.useEffect(() => {
    getNetworks();
  }, []);

  const changeWalletType = (value: string) => {
    formik.setFieldValue('walletType', value);
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
      walletType: '',
      networkId: '',
      walletAddress: '',
      name: '',
      submit: null,
    },
    validationSchema: Yup.object({
      walletType: Yup.string().required('Please select a wallet type to continue'),
      ...(step == 2
        ? {
            walletAddress: Yup.string().required('Wallet address is required'),
            name: Yup.string().required('Wallet name is required'),
          }
        : {}),
    }),
    onSubmit: async (values, helpers): Promise<void> => {
      if (step == 1) {
        setStep(2);
      } else if (step == 2) {
        try {
          const success = await walletApi.create({
            networkId: values.walletType,
            walletAddress: values.walletAddress,
            name: values.name,
          });

          if (success) {
            const data = await walletApi.getItems();
            props.parentCallback(data);
            props.handleClose();
          }
        } catch (err) {
          console.error(err);
          console.error(err.data.message);
        }
      }
    },
  });

  return (
    <form noValidate onSubmit={formik.handleSubmit}>
      <BootstrapDialog onClose={props.handleClose} aria-labelledby="customized-dialog-title" open={props.open}>
        <BootstrapDialogTitle id="customized-dialog-title" onClose={props.handleClose}></BootstrapDialogTitle>
        {step == 1 && (
          <DialogContent>
            <Typography
              sx={{
                mb: 2,
              }}
            >
              Select a wallet to connect to:
            </Typography>
            <Typography>Wallet types</Typography>
            <Grid container columnGap={3}>
              {networks.map((i) => (
                <Grid key={i.network_id} item sx={{ display: 'flex', flexDirection: 'column' }}>
                  <Button
                    sx={{ backgroundColor: formik.values.walletType == `${i.network_id}` ? '#F34F1D0D' : undefined }}
                    variant="outlined"
                    color="secondary"
                    onClick={() => changeWalletType(`${i.network_id}`)}
                  >
                    <img src={`/static/crypto/color/${i.icon_tag}.svg`} height="30" />
                  </Button>
                  {i.name}
                </Grid>
              ))}
            </Grid>
          </DialogContent>
        )}
        {step == 2 && (
          <DialogContent>
            <Typography
              sx={{
                mb: 2,
              }}
            >
              Add wallet details
            </Typography>
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
              placeholder="E.g. Sumner’s Metamask"
              value={formik.values.name}
              error={Boolean(formik.touched.name && formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              onChange={handleNameChange}
            />
          </DialogContent>
        )}
        <DialogActions>
          {step == 1 && (
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              {formik.errors.walletType && (
                <Box sx={{ mr: 1 }}>
                  <FormHelperText error>{formik.errors.walletType}</FormHelperText>
                </Box>
              )}
              <Button variant="contained" color="info" type="submit" onClick={formik.handleSubmit}>
                Next
              </Button>
            </Box>
          )}
          {step == 2 && (
            <Button variant="contained" color="info" type="submit" onClick={formik.handleSubmit}>
              Finish
            </Button>
          )}
        </DialogActions>
      </BootstrapDialog>
    </form>
  );
};
