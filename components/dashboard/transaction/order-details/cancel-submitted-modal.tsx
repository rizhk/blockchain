import { Box, Dialog, DialogContent, Typography, Grid, useTheme, useMediaQuery, Button } from '@mui/material';
import { Divider } from 'components/common/divider';
import { NetworkLinkButton } from 'components/common/network-link-button';
import { TextButton } from 'components/common/text-button';
import React, { forwardRef } from 'react';
import ReactDOM from 'react-dom';
import { useTranslation } from 'react-i18next';
import { Transaction, TxnType } from 'types/transaction';
import { primitivesUtils } from 'utils/primitives-utils';
import OrderDetailsSummary from './order-details-summary';

export interface ICancelSubmittedModalProps {
  isShowing: boolean;
  hide: () => void;
  hash: string;
  networkName: string;
  networkUrl: string;
}

export default ({ isShowing, hide, hash, networkName, networkUrl }: ICancelSubmittedModalProps): JSX.Element => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClose = (event: React.ChangeEvent<HTMLButtonElement>, reason: string) => {
    hide();
    document.body.style.overflow = 'auto';
  };

  const { i18n, t } = useTranslation();

  return (
    <Dialog fullScreen={fullScreen} open={isShowing} onClose={handleClose}>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6" component="h2">
              {t('transaction.cancelOrderSubmittedTitle')}
            </Typography>
          </Grid>
          <Grid container item xs={12}>
            <Typography variant="subtitle2" sx={{ fontWeight: 400 }}>
              {t('transaction.cancelOrderProgressHint')}
            </Typography>
          </Grid>
          <Grid container item xs={12}>
            <Grid item xs={4}>
              <Typography variant="subtitle2">{t('transaction.hash')}</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="body2" sx={{ wordBreak: 'break-word' }}>
                {hash}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sx={{ mt: 4 }}>
          <Divider />
        </Grid>
        <Grid justifyContent="center" container item xs={12}>
          <Box mt={4} mb={1}>
            <TextButton onClick={hide}>{t('transaction.close')}</TextButton>
            <NetworkLinkButton sx={{ ml: 2 }} networkName={networkName} networkUrl={networkUrl} />
          </Box>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};
