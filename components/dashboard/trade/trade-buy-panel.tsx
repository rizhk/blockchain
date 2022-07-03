import { FC, useCallback, useEffect, useState } from 'react';
import React, { useRef } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Box, Button, FormHelperText, Grid, TextField, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { FiatSelector } from './trade-fiat-selector';
import { BankAccountSelector } from './trade-payment-method-selector';
import { CryptoSelector } from './trade-crypto-selector';
import { PicanteReward } from './trade-picante-reward';
import { WalletSelector } from './trade-wallet-selector';
import TradePaymentModal from './buy-steps/payment-modal';
import { TradeMatchingOfferModal } from './buy-steps/matching-offer-modal';
import RequestTransferModal from './buy-steps/request-transfer-modal';
import TokenTransferedModal from './buy-steps/token-transfered-modal';
import ConfirmPurchaseModal from './buy-steps/confirm-purchase-modal';
import {
  usePaymentModal,
  useMatchingOfferModal,
  useRequestTransferModal,
  useTokenTransferedModal,
  useConfirmPurchaseModal,
} from 'hooks/use-buy-modal';
import { ethers } from 'ethers';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { walletApi } from 'api/wallet-api';
import { useMounted } from 'hooks/use-mounted';
import { Wallet } from 'types/wallet';
import { buyOfferApi } from 'api/market-buy-offer-api';
import { CreateBuyOfferRequest } from 'types/buy-offer';
import { transactionApi } from 'api/transaction-api';
import { TransferRequest, VeriftyTokenTransferRequest } from 'types/transaction';
import { DataDisplay } from 'components/common/data-display';
import useFetch from 'hooks/use-fetch';
import { useTranslation } from 'react-i18next';
import { primitivesUtils } from 'utils/primitives-utils';

const tokenAddr = process.env.NEXT_PUBLIC_TOKEN_CONTRACT_ADDRESS!;
const DexContractAddr = process.env.NEXT_PUBLIC_DEX_CONTRACT_ADDRESS!;

export const BuyPanel: FC = (props) => {
  const { i18n, t } = useTranslation();

  const theme = useTheme();
  const cref = useRef(Object)!;
  const isMounted = useMounted();

  var picanteChargePercentage = 0.1;

  //payment modal
  const [paymentObject, setPaymentObject] = React.useState(null);
  const { isPaymentShowing, togglePayment } = usePaymentModal();

  const [txnHash, setTxnHash] = React.useState('');

  const sendPaymentMetaToParent = (req: TransferRequest) => {
    // the callback. Use a better name
    togglePayment(); //close payment modal
    toggleRequestTransfer();
    requestTransfer(req);
  };

  const [wallets, setWallets] = useState<Wallet[]>([]);

  const updateWallets = (updateWallets: any): void => {
    setWallets(updateWallets);
  };

  const getWallets = useCallback(async () => {
    try {
      const data = await walletApi.getItems();

      if (isMounted()) {
        setWallets(data);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted]);

  useEffect(() => {
    getWallets();
  }, []);

  //find offer modal
  const { isMatchingOfferShowing, toggleMatchingOffer } = useMatchingOfferModal();

  //request transferred modal
  const { isRequestTransferShowing, toggleRequestTransfer } = useRequestTransferModal();

  //find token transferred
  const { isTokenTransferedShowing, toggleTokenTransfered } = useTokenTransferedModal();

  //confirm purchase
  const { isConfirmPurchaseShowing, toggleConfirmPurchase } = useConfirmPurchaseModal();

  //form error message
  const [errorMessage, setErrorMessage] = React.useState('');

  const [picanteCharge, setPicanteCharge] = React.useState(0);

  const changePaymentMethod = (event: { target: { value: any } }) => {
    formik.setFieldValue('paymentMethod', event.target.value);
  };

  const changeWallet = (event: { target: { value: any } }) => {
    formik.setFieldValue('receiveWallet', event.target.value);
  };

  const handlePayAmountChange = (event: { target: { value: any } }) => {
    formik.setFieldValue('amountPay', event.target.value);
    var receiveValue = ((event.target.value * (100 - picanteChargePercentage)) / 100) * (xRateData?.rate || 1.25);
    setPicanteCharge((event.target.value * picanteChargePercentage) / 100);
    formik.setFieldValue('amountReceive', receiveValue);

    formik.setFieldValue('amountReward', 1);
  };

  const callCreatePaymentToken = (cref: React.MutableRefObject<Object>, payment: Object) => {
    cref?.current?.callCreatePaymentToken(payment);
  };

  const requestTransfer = async (req: TransferRequest) => {
    try {
      const hex = await transactionApi.requestTransfer(req);
      if (!hex) {
        throw new Error('transfer request error');
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum);

      let txn = await provider.waitForTransaction(hex);

      if (txn) {
        let txnHash = hex;
        if (txn.blockNumber) {
          toggleRequestTransfer();
          setTxnHash(txnHash);
          toggleTokenTransfered();

          let vReq: VeriftyTokenTransferRequest = {
            txn_id: String(req.txn_id),
            txn_hash: String(txnHash),
          };

          await transactionApi.verifyTokenTransfer(vReq);
          console.log('Transfer success');
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const formik = useFormik({
    initialValues: {
      amountPay: undefined,
      amountReceive: 0,
      amountReward: 0,
      paymentMethod: 'plaid',
      receiveWallet: undefined,
      submit: null,
    },
    validationSchema: Yup.object({
      amountPay: Yup.number().required('Amount Pay is required').min(1, 'at least £1').max(5000, 'at most £5000'),
      paymentMethod: Yup.string().required('Select a payment method'),
      receiveWallet: Yup.string().required('Select a wallet'),
    }),
    onSubmit: async (values, helpers): Promise<void> => {
      setErrorMessage('');
      try {
        toggleMatchingOffer();

        //TODO: use selected option instead of hard code
        const req: CreateBuyOfferRequest = {
          wallet_addr: String(values.receiveWallet),
          buy_gem: String(tokenAddr),
          pay_gem: 'GBP',
          pay_gem_total: Number(values.amountPay),
          payment_method: String(values.paymentMethod),
          network_id: '80001',
        };

        let result = await buyOfferApi.create(req);
        toggleMatchingOffer();
        callCreatePaymentToken(cref, result);
        togglePayment();
        return;
      } catch (err) {
        console.error(err);
        console.error(err.data.message);
        if (err.data.message == 'execution reverted: no suitable offer') {
          setErrorMessage('No suitable offer for now.');
        }
      }
    },
  });

  const [fetchXRate, setFetchXRate] = useState(true);

  const {
    data: xRateData,
    loading: xRateLoading,
    error: xRateError,
  } = useFetch(() => {
    if (!fetchXRate) return;
    setFetchXRate(false);
    return buyOfferApi.getXRate(
      { fromCur: 'GBP', toCur: 'USDC' },
      {
        defaultErrorMessage: t('overview.xRateError'),
      },
    );
  }, [fetchXRate]);

  return (
    <form noValidate onSubmit={formik.handleSubmit} {...props}>
      {/* <WalletConnectModal
				isWalletConnectShowing={isWalletConnectShowing}
				hide={isWalletConnectShowing}
			/> */}
      <TradeMatchingOfferModal isMatchingOfferShowing={isMatchingOfferShowing} hide={toggleMatchingOffer} />
      <TradePaymentModal
        sendPaymentMetaToParent={sendPaymentMetaToParent}
        isPaymentShowing={isPaymentShowing}
        hide={togglePayment}
        ref={cref}
      />
      <RequestTransferModal isRequestTransferShowing={isRequestTransferShowing} hide={toggleRequestTransfer} />
      <TokenTransferedModal
        isTokenTransferedShowing={isTokenTransferedShowing}
        txnHash={txnHash}
        hide={toggleTokenTransfered}
      />
      <ConfirmPurchaseModal isConfirmPurchaseShowing={isConfirmPurchaseShowing} hide={toggleConfirmPurchase} />
      <Grid container spacing={2} mb={0.5}>
        <Grid item md={8} xs={8}>
          <TextField
            error={Boolean(formik.touched.amountPay && formik.errors.amountPay)}
            helperText={formik.touched.amountPay && formik.errors.amountPay}
            fullWidth
            id="buy-form-pay"
            label="Enter amount"
            variant="outlined"
            value={formik.values.amountPay}
            type="number"
            inputProps={{
              maxLength: 13,
              max: 5000,
              min: 1,
              step: '1',
            }}
            onChange={(e) => {
              handlePayAmountChange(e);
            }}
          />
        </Grid>
        <Grid item md={4} xs={4}>
          <FiatSelector />
        </Grid>
      </Grid>
      <Grid container spacing={2} mb={0.5}>
        <Grid item md={12} xs={12}>
          <BankAccountSelector
            error={Boolean(formik.touched.paymentMethod && formik.errors.paymentMethod)}
            helperText={formik.touched.paymentMethod && formik.errors.paymentMethod}
            onPaymentMethodChange={changePaymentMethod}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2} mb={0.5} sx={{ marginLeft: '0px', marginTop: '5px' }}>
        <LazyLoadImage
          src={process.env.NEXT_PUBLIC_URL + 'static/Connector.svg'} // use normal <img> attributes as props
        />
        <Typography variant="body2" color="neutral.500" mt={3} mb={3}>
          <span>
            &nbsp;&nbsp;&#163;{picanteCharge} GBP - 0.1% Estimated Fees
            <br />
            <Typography variant="caption" color="neutral.400">
              <DataDisplay
                shouldShowRetryOnError
                onClickRetry={() => setFetchXRate(true)}
                defaultLoaderOptions={{ width: 200 }}
                isLoading={xRateLoading}
                error={xRateError}
              >
                <>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#163;1 GBP = {primitivesUtils.roundToTwo(xRateData?.rate)}{' '}
                  USDC (Estimated)
                </>
              </DataDisplay>
            </Typography>
          </span>
        </Typography>
      </Grid>
      <Grid container spacing={2} mb={0.5}>
        <Grid item md={8} xs={8}>
          <TextField
            fullWidth
            id="buy-form-amount-receive"
            label="You receive (estimated)"
            disabled={true}
            type="number"
            inputProps={{
              maxLength: 13,
              step: '0.000000000000000001',
            }}
            value={formik.values.amountReceive}
          />
        </Grid>
        <Grid item md={4} xs={4}>
          <CryptoSelector />
        </Grid>
      </Grid>
      <Grid container spacing={2} mb={0}>
        <Grid item md={8} xs={8}>
          <TextField
            fullWidth
            id="buy-form-amount-reward"
            label="Rewards (Picante tokens)"
            variant="outlined"
            disabled={true}
            value={formik.values.amountReward}
          />
        </Grid>
        <Grid item md={4} xs={4}>
          <PicanteReward />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item md={12} xs={12}>
          <WalletSelector
            wallets={wallets}
            parentCallback={updateWallets}
            error={Boolean(formik.touched.receiveWallet && formik.errors.receiveWallet)}
            helperText={formik.touched.receiveWallet && formik.errors.receiveWallet}
            onWalletChange={changeWallet}
          />
        </Grid>
      </Grid>
      {errorMessage && (
        <Grid container spacing={2}>
          <Grid item md={12} xs={12}>
            <p className="error"> {errorMessage} </p>
          </Grid>
        </Grid>
      )}
      {formik.errors.submit && (
        <Box sx={{ mt: 3 }}>
          <FormHelperText error>{formik.errors.submit}</FormHelperText>
        </Box>
      )}
      <Box sx={{ mt: 2 }}>
        <Button fullWidth size="large" variant="contained" type="submit">
          Buy now
        </Button>
      </Box>
    </form>
  );
};
