import { BackdropProps, Box, Button, ButtonBase, Chip, Divider, Drawer, Grid, Typography } from '@mui/material';
import { EtherscanLogo } from 'components/ethercan-logo';
import { formatDistance } from 'date-fns';
import { format } from 'date-fns-tz';
import { ChevronLeft } from 'icons/chevron-left';
import { ExitApp } from 'icons/exit-app';
import { SuccessTick } from 'icons/success-tick';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { TransactionHistory } from 'types/portfolio';
import { primitivesUtils } from 'utils/primitives-utils';

export interface ITransactionHistoryDetailsProps {
  setOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>;
  openDrawer: boolean;
  transactionHistory: TransactionHistory;
}

export const TransactionHistoryDetails: React.FC<ITransactionHistoryDetailsProps> = ({
  setOpenDrawer,
  openDrawer,
  transactionHistory,
}) => {
  const { t } = useTranslation();
  const handleCloseDrawer = () => {
    setOpenDrawer(false);
  };
  return (
    <Drawer
      // key={transactionHistory?.id}
      anchor="right"
      onClose={handleCloseDrawer}
      open={openDrawer}
      ModalProps={{ onBackdropClick: handleCloseDrawer }}
      PaperProps={{
        sx: {
          position: 'absolute',
          backgroundColor: 'background.paper',
          width: 580,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      <Grid container flexDirection="column">
        <Grid sx={{ py: 4, px: 2 }} rowSpacing={3} item container alignItems="center">
          <Typography onClick={() => setOpenDrawer(false)} variant="subtitle2">
            <ChevronLeft sx={{ cursor: 'pointer' }} />
          </Typography>
          <Typography
            onClick={() => setOpenDrawer(false)}
            sx={{ cursor: 'pointer', height: '24px' }}
            variant="subtitle2"
          >
            {t('portfolio.transHis.goBack')}
          </Typography>
        </Grid>
        <Divider sx={{ m: 0 }} />
        <Grid sx={{ px: 3, pb: 3 }} rowSpacing={3} container item flexDirection="row">
          <Grid flexWrap="nowrap" container item justifyContent="space-between">
            <Typography flex="1 0 auto" variant="subtitle1">
              {t('portfolio.transHis.transDetails')}
            </Typography>
            <Grid container item alignItems="center" justifyContent="flex-end">
              <Typography variant="caption2" sx={{ pr: 1, fontSize: '0.5rem' }}>
                {t('portfolio.transHis.poweredBy')}
              </Typography>
              <EtherscanLogo width="111px" height="25px" />
            </Grid>
          </Grid>
          <Grid container item>
            <Grid item xs={4}>
              <Typography variant="body2">{`${t('portfolio.transHis.orderType')}:`}</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="body2">
                {transactionHistory?.type.toLowerCase() === 'in' ? (
                  <Typography variant="body2" color="success.main">
                    {t('portfolio.transHis.incoming')}
                  </Typography>
                ) : (
                  <Typography variant="body2" color="success.main">
                    {t('portfolio.transHis.outgoing')}
                  </Typography>
                )}
              </Typography>
            </Grid>
          </Grid>
          <Grid container item>
            <Grid item xs={4}>
              <Typography variant="body2">{`${t('portfolio.transHis.from')}:`}</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography display="inline" variant="body2">
                {transactionHistory?.blockchain_network}
              </Typography>{' '}
              <Typography display="inline" variant="body2" color="text.secondary">
                ({primitivesUtils.getShortTxnId(transactionHistory?.from)})
              </Typography>
            </Grid>
          </Grid>
          <Grid container item>
            <Grid item xs={4}>
              <Typography variant="body2">{`${t('portfolio.transHis.to')}:`}</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography display="inline" variant="body2">
                {transactionHistory?.blockchain_network}
              </Typography>{' '}
              <Typography display="inline" variant="body2" color="text.secondary">
                ({primitivesUtils.getShortTxnId(transactionHistory?.to)})
              </Typography>{' '}
            </Grid>
          </Grid>
        </Grid>
        <Divider sx={{ width: '95%', m: '0 auto' }} />
        <Grid sx={{ px: 3, pb: 3 }} rowSpacing={3} container item flexDirection="row">
          <Grid container item>
            <Grid item xs={4}>
              <Typography variant="body2">{`${t('portfolio.transHis.blockchain')}:`}</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="body2">{transactionHistory?.blockchain_network}</Typography>
            </Grid>
          </Grid>
          <Grid container item>
            <Grid item xs={4}>
              <Typography variant="body2">{`${t('portfolio.transHis.value')}:`}</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography display="inline" variant="subtitle2">
                {primitivesUtils.roundDownToTwo(parseFloat(transactionHistory?.crypto_amount))}{' '}
                {transactionHistory?.token_symbol}
              </Typography>{' '}
              <Typography display="inline" variant="body2" sx={{ color: 'text.secondary' }}>
                {primitivesUtils.roundDownToTwo(parseFloat(transactionHistory?.crypto_amount_fiat))} USD
              </Typography>
            </Grid>
          </Grid>
          <Grid container item>
            <Grid item xs={4}>
              <Typography variant="body2">{`${t('portfolio.transHis.transactionFee')}:`}</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography display="inline" variant="subtitle2">
                {primitivesUtils.roundDownToTwo(parseFloat(transactionHistory?.gas_used))}{' '}
                {transactionHistory?.token_symbol}
              </Typography>{' '}
              <Typography display="inline" variant="body2" sx={{ color: 'text.secondary' }}>
                {transactionHistory?.gas_fiat} USD
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Divider sx={{ width: '95%', m: '0 auto' }} />
        <Grid sx={{ px: 3, pb: 3 }} rowSpacing={3} container item flexDirection="row">
          <Grid container item>
            <Grid item xs={4}>
              <Typography variant="body2">{`${t('portfolio.transHis.gasPrice')}:`}</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography display="inline" variant="subtitle2">
                {primitivesUtils.roundDownToTwo(parseFloat(transactionHistory?.gas_used))}{' '}
                {transactionHistory?.token_symbol}
              </Typography>{' '}
              <Typography display="inline" variant="body2" sx={{ color: 'text.secondary' }}>
                {transactionHistory?.gas_fiat} USD
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Divider sx={{ width: '95%', m: '0 auto' }} />
        <Grid sx={{ px: 3, pb: 3 }} rowSpacing={3} container item flexDirection="row">
          <Grid container item>
            <Grid item xs={4}>
              <Typography variant="body2">{`${t('portfolio.transHis.transactionHash')}:`}</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="body2" sx={{ wordWrap: 'break-word' }}>
                {transactionHistory?.hash}
              </Typography>
            </Grid>
          </Grid>
          <Grid container item alignItems="center">
            <Grid item xs={4}>
              <Typography variant="body2">{`${t('portfolio.transHis.status')}:`}</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography
                variant="body2"
                display="flex"
                width="min-content"
                alignItems="center"
                sx={{
                  fontWeight: 600,
                  px: 1,
                  py: 0.5,
                  backgroundColor: '#E5F9F6',
                  color: '#00C9A7',
                  borderRadius: '4px',
                }}
              >
                <SuccessTick sx={{ fontSize: '0.725rem', mr: 1 }} />
                Success
              </Typography>
            </Grid>
          </Grid>
          <Grid container item>
            <Grid item xs={4}>
              <Typography variant="body2">{`${t('portfolio.transHis.block')}:`}</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="body2" display="inline">
                {transactionHistory?.block_num}
              </Typography>{' '}
              <Typography variant="body2" display="inline" sx={{ color: 'text.secondary' }}>
                ({39} {t('portfolio.transHis.blockConfirmation')})
              </Typography>
            </Grid>
          </Grid>
          <Grid container item>
            <Grid item xs={4}>
              <Typography variant="body2">{`${t('portfolio.transHis.timestamp')}:`}</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="body2" display="inline">
                {transactionHistory?.transaction_date
                  ? formatDistance(new Date(), new Date(transactionHistory.transaction_date), { includeSeconds: true })
                  : null}{' '}
                {t('portfolio.transHis.ago')}
              </Typography>{' '}
              <Typography variant="body2" display="inline" sx={{ color: 'text.secondary' }}>
                (
                {transactionHistory?.transaction_date
                  ? format(new Date(transactionHistory.transaction_date), `MMM-dd-yyyy hh:mm:ss aaaaa'm' z`)
                  : null}
                )
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Divider sx={{ width: '95%', m: '0 auto' }} />
        <Grid sx={{ px: 3, pb: 3 }} rowSpacing={3} container item alignItems="center">
          <Grid item xs={4}>
            <Typography variant="body2">{`${t('portfolio.transHis.tag')}:`}</Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="body2">
              {transactionHistory?.tag_name ? (
                transactionHistory.tag_name
              ) : (
                <Button variant="outlined">{t('portfolio.transHis.addTag')}</Button>
              )}
            </Typography>
          </Grid>
        </Grid>
        <Divider sx={{ width: '95%', m: '0 auto' }} />
        <Grid sx={{ px: 3, pb: 3 }} rowSpacing={3} container item alignItems="center">
          <Grid item xs={4}>
            <Typography variant="body2">{`${t('portfolio.transHis.note')}:`}</Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="body2">
              {transactionHistory?.note ? (
                transactionHistory.note
              ) : (
                <Button variant="outlined">{t('portfolio.transHis.addNote')}</Button>
              )}
            </Typography>
          </Grid>
        </Grid>
        <Divider sx={{ width: '95%', m: '0 auto' }} />
        <Grid sx={{ pt: 4, px: 2 }} rowSpacing={3} flexWrap="nowrap" container item flexDirection="row">
          <Typography flex="0 1 max-content" sx={{ pr: 1 }} variant="body2" display="inline">
            {`${t('portfolio.transHis.viewOn')} Etherscan: `}
          </Typography>
          <Typography
            component="a"
            variant="body2"
            color="info.main"
            sx={{ verticalAlign: 'center', display: 'flex', alignItems: 'center' }}
            rel="noreferrer"
            href={`https://etherscan.io/tx/${transactionHistory?.hash}`}
            target="_blank"
          >
            {`https://etherscan.io/tx/${primitivesUtils.getShortTxnId(transactionHistory?.hash)}`}
            <ExitApp />
          </Typography>
        </Grid>
      </Grid>
    </Drawer>
  );
};
