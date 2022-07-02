import {
  Box,
  Dialog,
  DialogContent,
  Typography,
  Grid,
  useTheme,
  useMediaQuery,
  Button,
  Alert,
  Skeleton,
} from '@mui/material';
import { transactionApi } from 'api/transaction-api';
import { DataDisplay } from 'components/common/data-display';
import { Divider } from 'components/common/divider';
import { ModalLoader } from 'components/common/modal-loader';
import { TextButton } from 'components/common/text-button';
import useFetch from 'hooks/use-fetch';
import { useModalLoader } from 'hooks/use-modal-loader';
import { useMounted } from 'hooks/use-mounted';
import { useCancelSubmittedModal } from 'hooks/use-transaction-modal';
import React, { forwardRef, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useTranslation } from 'react-i18next';
import { Transaction, TxnType, WithdrawalPreview } from 'types/transaction';
import { primitivesUtils } from 'utils/primitives-utils';
import CancelSubmittedModal from './cancel-submitted-modal';
import OrderDetailsSummary from './order-details-summary';

export interface ICancelOrderModalProps {
  isShowing: boolean;
  hide: () => void;
  txn: Transaction;
}

export default ({ isShowing, hide, txn }: ICancelOrderModalProps): JSX.Element => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClose = () => {
    hide();
    document.body.style.overflow = 'auto';
  };

  const { isCancelSubmittedShowing, toggleCancelSubmitted } = useCancelSubmittedModal();
  const { isModalLoaderShowing, toggleModalLoader } = useModalLoader();
  const { i18n, t } = useTranslation();

  const onClickCancel = async () => {
    try {
      toggleModalLoader();
      const data = await transactionApi.cancelTransaction(txn.id);
      toggleModalLoader();
      handleClose();
      toggleCancelSubmitted();
    } catch (err) {
      toggleModalLoader();
      console.error(err);
    }
  };

  const {
    data: withdrawalPreviewData,
    loading: withdrawalPreviewLoading,
    error: withdrawalPreviewError,
  } = useFetch(() => {
    if (!isShowing) return;
    return transactionApi.fetchWithdrawalPreview({
      defaultErrorMessage: t('transaction.withdrawalPreviewError'),
    });
  }, [isShowing]);

  return (
    <>
      <CancelSubmittedModal
        networkName="Etherscan"
        networkUrl=""
        hash="0x3ee89ed1a7be434d192c0e6a6364fbcbe2f7a65bdfdee1fe4daeec05caa23ec8"
        isShowing={isCancelSubmittedShowing}
        hide={toggleCancelSubmitted}
      />
      <ModalLoader isShowing={isModalLoaderShowing} />
      <Dialog fullScreen={fullScreen} open={isShowing} onClose={handleClose}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6" component="h2">
                {t('transaction.cancelOrderTitle')}
              </Typography>
            </Grid>
            <OrderDetailsSummary txn={txn} />
            <Grid item xs={12} sx={{ padding: 0 }}>
              <Divider />
            </Grid>
            <Grid container item xs={12}>
              <Grid item xs={4}>
                <Typography variant="subtitle2">{t('transaction.cancellationGasFee')}</Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="body2">
                  <DataDisplay
                    defaultLoaderOptions={{ width: 100 }}
                    isLoading={withdrawalPreviewLoading}
                    error={withdrawalPreviewError}
                  >
                    <>
                      {withdrawalPreviewData?.pay_gem_amt}
                      {withdrawalPreviewData?.pay_gem_token} ({withdrawalPreviewData?.suggested_gas_fee}{' '}
                      {withdrawalPreviewData?.chain_token})
                    </>
                  </DataDisplay>
                </Typography>
              </Grid>
            </Grid>
            <Grid container item xs={12}>
              <Grid item xs={4}>
                <Typography variant="subtitle2" color="secondary.main">
                  {t('transaction.warningTitle')}
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="body2" color="secondary.main">
                  {t('transaction.warningMessage')}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid justifyContent="center" container item xs={12}>
            <Box mt={4} mb={1}>
              <TextButton onClick={hide}>{t('transaction.nevermindGoBack')}</TextButton>
              <Button onClick={onClickCancel} variant="contained" color="secondary" sx={{ ml: 1 }}>
                {t('transaction.confirmCancelOrder')}
              </Button>
            </Box>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
};
