import { Grid, Typography } from '@mui/material';
import * as React from 'react';
import { Transaction, TxnType } from 'types/transaction';
import { primitivesUtils } from 'utils/primitives-utils';

export interface IOrderDetailsSummaryProps {
  txn: Transaction;
}

const OrderDetailsSummary: React.FC<IOrderDetailsSummaryProps> = ({ txn }) => {
  let tokenAmt = primitivesUtils.thousandSeparator(primitivesUtils.roundDownToTwo(txn?.token_amt));
  let fiatAmt = primitivesUtils.convertFiatAmountDisplay(txn?.fiat_amt);
  let paidAmount = undefined;
  let receivedAmount = undefined;

  let buyerOrSeller = '';
  if (txn?.txn_type?.toUpperCase() === TxnType.SELL) {
    paidAmount = tokenAmt;
    receivedAmount = fiatAmt;
    buyerOrSeller = 'Buyer';
  } else if (txn?.txn_type?.toUpperCase() === TxnType.BUY) {
    paidAmount = fiatAmt;
    receivedAmount = paidAmount;
    buyerOrSeller = 'Seller';
  }
  return (
    <>
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
    </>
  );
};
export default OrderDetailsSummary;
