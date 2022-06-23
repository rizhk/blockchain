import { Box, Dialog, DialogContent, Typography, Grid, useTheme, useMediaQuery } from '@mui/material';
import { Divider } from 'components/common/divider';
import { TextButton } from 'components/common/text-button';
import React, { forwardRef } from 'react';
import ReactDOM from 'react-dom';
import { Transaction, TxnType } from 'types/transaction';
import { primitivesUtils } from 'utils/primitives-utils';

export interface ItxnsProps {
  isOrderDetailsShowing: boolean;
  hide: () => void;
  txn: Transaction;
}

export default ({ isOrderDetailsShowing, hide, txn }: ItxnsProps): JSX.Element => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClose = (event: React.ChangeEvent<HTMLButtonElement>, reason: string) => {
    hide();
    document.body.style.overflow = 'auto';
  };

  let paidAmount = 0;
  let receivedAmount = 0;
  let buyerOrSeller = '';
  if (txn?.txn_type?.toUpperCase() === TxnType.SELL) {
    paidAmount = txn?.token_amt;
    receivedAmount = txn?.fiat_amt;
    buyerOrSeller = 'Buyer';
  } else if (txn?.txn_type?.toUpperCase() === TxnType.BUY) {
    paidAmount = txn?.token_amt;
    receivedAmount = txn?.fiat_amt;
    buyerOrSeller = 'Seller';
  }

  return (
    <Dialog fullScreen={fullScreen} open={isOrderDetailsShowing} onClose={handleClose}>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6" component="h2">
              Order details
            </Typography>
          </Grid>
          <Grid container item xs={12}>
            <Grid item xs={4}>
              <Typography variant="subtitle2">Order type</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="body2">{txn?.txn_type}</Typography>
            </Grid>
          </Grid>
          <Grid container item xs={12}>
            <Grid item xs={4}>
              <Typography variant="subtitle2">Submitted</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography display="inline" variant="body2">
                {new Date(txn?.created_at).toLocaleDateString()}
              </Typography>{' '}
              <Typography display="inline" color="text.secondary" variant="body2">
                {new Date(txn?.created_at).toLocaleTimeString()}
              </Typography>
            </Grid>
          </Grid>
          <Grid container item xs={12}>
            <Grid item xs={4}>
              <Typography variant="subtitle2">Amount paid</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="body2">
                {paidAmount} {txn?.token}
              </Typography>
            </Grid>
          </Grid>
          <Grid container item xs={12}>
            <Grid item xs={4}>
              <Typography variant="subtitle2">Amount received</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="body2">
                {receivedAmount} {txn?.fiat}
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} sx={{ padding: 0 }}>
            <Divider />
          </Grid>
          <Grid container item xs={12}>
            <Grid item xs={4}>
              <Typography variant="subtitle2">Status</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="body2" color="secondary.main">
                {txn?.status}
              </Typography>
            </Grid>
          </Grid>
          <Grid container item xs={12}>
            <Grid item xs={4}>
              <Typography variant="subtitle2">Details</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="body2">{txn?.details}</Typography>
            </Grid>
          </Grid>
          {txn?.breakdown && (
            <>
              <Box sx={{ mt: 2 }}>&nbsp;</Box>
              <Grid container item xs={12}>
                <Grid item xs={3}>
                  <Typography sx={{ mt: 4 }} variant="subtitle3">
                    {buyerOrSeller}
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography variant="subtitle3">{txn.token}</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography variant="subtitle3">Fiat Price</Typography>
                </Grid>
                <Grid item xs={5}>
                  <Typography variant="subtitle3">Date</Typography>
                </Grid>
              </Grid>
              {txn?.breakdown.map(({ txn_id, token_amt, fiat_amt, date }) => {
                const shortTxnId = primitivesUtils.getShortTxnId(txn_id);
                return (
                  <Grid key={txn_id} container item xs={12}>
                    <Grid item xs={3}>
                      <Typography variant="body2">{shortTxnId}</Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Typography variant="body2">
                        {token_amt} {txn.token}
                      </Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Typography variant="body2">
                        {fiat_amt} {txn.fiat}
                      </Typography>
                    </Grid>
                    <Grid item xs={5}>
                      <Typography display="inline" variant="body2">
                        {new Date(date).toLocaleDateString()}
                      </Typography>{' '}
                      <Typography display="inline" color="text.secondary" variant="body2">
                        {new Date(date).toLocaleTimeString()}
                      </Typography>
                    </Grid>
                  </Grid>
                );
              })}
            </>
          )}
        </Grid>
        <Grid justifyContent="flex-end" container item xs={12}>
          <TextButton onClick={hide} sx={{ mt: 4 }}>
            Close
          </TextButton>
        </Grid>
        <Grid container item xs={12}>
          <Typography variant="caption2">
            For support, please contact {<a href="mailto:help@picante.io">help@picante.io</a>}
          </Typography>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};
