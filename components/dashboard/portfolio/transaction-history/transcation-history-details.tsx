import { BackdropProps, Button, Divider, Drawer, Grid, Typography } from '@mui/material';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { TransactionHistory } from 'types/transaction-history';

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
  return (
    <Drawer
      anchor="right"
      onClose={setOpenDrawer}
      open={openDrawer}
      PaperProps={{
        sx: {
          position: 'fixed',
          backgroundColor: 'background.paper',
          width: 580,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      <Grid rowSpacing={2} container flexDirection="column">
        <Typography onClick={() => setOpenDrawer(false)} sx={{ p: 2 }} variant="body2">
          {t('portfolio.transHis.goBack')}
        </Typography>

        <Divider sx={{ m: 0 }} />
        <Grid rowSpacing={2} sx={{ p: 2 }} container item flexDirection="row">
          <Grid item>
            <Typography variant="h6">{t('portfolio.transHis.transDetails')}</Typography>
          </Grid>
          <Grid container item>
            <Grid item xs={4}>
              <Typography variant="body2">{`${t('portfolio.transHis.orderType')}:`}</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="body2">{transactionHistory?.data_type}</Typography>
            </Grid>
          </Grid>
          <Grid container item>
            <Grid item xs={4}>
              <Typography variant="body2">{`${t('portfolio.transHis.from')}:`}</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="body2">{transactionHistory?.from_wallet_name}</Typography>
            </Grid>
          </Grid>
          <Grid container item>
            <Grid item xs={4}>
              <Typography variant="body2">{`${t('portfolio.transHis.to')}:`}</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="body2">{transactionHistory?.to_wallet_name}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Divider sx={{ width: '95%', m: '0 auto' }} />
        <Grid rowSpacing={2} sx={{ p: 2 }} container item flexDirection="row">
          <Grid container item>
            <Grid item xs={4}>
              <Typography variant="body2">{`${t('portfolio.transHis.blockchain')}:`}</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="body2">{transactionHistory?.data_type}</Typography>
            </Grid>
          </Grid>
          <Grid container item>
            <Grid item xs={4}>
              <Typography variant="body2">{`${t('portfolio.transHis.value')}:`}</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="body2">{transactionHistory?.from_wallet_name}</Typography>
            </Grid>
          </Grid>
          <Grid container item>
            <Grid item xs={4}>
              <Typography variant="body2">{`${t('portfolio.transHis.transactionFee')}:`}</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="body2">{transactionHistory?.to_wallet_name}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Divider sx={{ width: '95%', m: '0 auto' }} />
        <Grid rowSpacing={2} sx={{ p: 2 }} container item flexDirection="row">
          <Grid container item>
            <Grid item xs={4}>
              <Typography variant="body2">{`${t('portfolio.transHis.gasPrice')}:`}</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="body2">{transactionHistory?.data_type}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Divider sx={{ width: '95%', m: '0 auto' }} />
        <Grid rowSpacing={2} sx={{ p: 2 }} container item flexDirection="row">
          <Grid container item>
            <Grid item xs={4}>
              <Typography variant="body2">{`${t('portfolio.transHis.transactionHash')}:`}</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="body2">{transactionHistory?.data_type}</Typography>
            </Grid>
          </Grid>
          <Grid container item>
            <Grid item xs={4}>
              <Typography variant="body2">{`${t('portfolio.transHis.status')}:`}</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="body2">{transactionHistory?.data_type}</Typography>
            </Grid>
          </Grid>
          <Grid container item>
            <Grid item xs={4}>
              <Typography variant="body2">{`${t('portfolio.transHis.block')}:`}</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="body2">{transactionHistory?.data_type}</Typography>
            </Grid>
          </Grid>
          <Grid container item>
            <Grid item xs={4}>
              <Typography variant="body2">{`${t('portfolio.transHis.timestamp')}:`}</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="body2">{transactionHistory?.data_type}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Divider sx={{ width: '95%', m: '0 auto' }} />
        <Grid rowSpacing={2} sx={{ p: 2 }} container item flexDirection="row">
          <Grid container item>
            <Grid item xs={4}>
              <Typography variant="body2">{`${t('portfolio.transHis.notes')}:`}</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="body2">{transactionHistory?.data_type}</Typography>
            </Grid>
            <Grid item sx={{ m: '0 0 0 auto' }}>
              <Button variant="outlined" color="secondary">
                Remove note
              </Button>
              <Button variant="outlined" color="primary">
                Edit note
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Divider sx={{ width: '95%', m: '0 auto' }} />
      </Grid>
    </Drawer>
  );
};
