import { Box, Button, Card, CardContent, Grid, Typography } from '@mui/material';
import { portfolioApi } from 'api/portfolio-api';
import { DataDisplay } from 'components/common/data-display';
import { TokenSymbolDisplay } from 'components/common/wallet-name-display';
import useFetch from 'hooks/use-fetch';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { primitivesUtils } from 'utils/primitives-utils';
import Link from 'next/link';
import { Divider } from 'components/common/divider';

export interface IRecentTransactionsProps {
  updatedSince: string | null;
  loading: boolean;
  noWallet: boolean;
}

export const RecentTransactions: React.FC<IRecentTransactionsProps> = ({ updatedSince, loading, noWallet }) => {
  const { t } = useTranslation();

  const {
    data,
    loading: getLatestNTranscationHistoryLoading,
    error,
    trigger,
  } = useFetch(() => {
    return portfolioApi.getLatestNTranscationHistory(
      { latestN: 3 },
      {
        defaultErrorMessage: t('portfolio.dashboard.getRecentTransactionError'),
        limit: '3',
      },
    );
  }, [updatedSince]);
  return (
    <>
      <Grid container flexDirection="row" width="100%">
        <Grid item flex="1 1 100%">
          <Card>
            <CardContent sx={{ p: 0 }}>
              <Grid container justifyContent="space-between" alignItems="center">
                <Grid item component={Typography} variant="overline" sx={{ px: 3, pt: 1.2, pb: 1 }}>
                  {t('portfolio.dashboard.recentTrans')}
                </Grid>
                <Typography sx={{ pr: 4 }} variant="textLink1" color="secondary.main">
                  <Link href="/dashboard/portfolio/wallet" passHref>
                    {t('portfolio.dashboard.addWallet')}
                  </Link>
                </Typography>
              </Grid>
              <Divider sx={{ m: 0, p: 0 }} />
              <DataDisplay
                isLoading={getLatestNTranscationHistoryLoading || loading}
                error={error}
                defaultLoaderOptions={{ height: '100px', width: '100%' }}
              >
                {/* no wallet or transaction have no data */}
                {noWallet ||
                (!noWallet && data?.items === undefined) ||
                (!noWallet && data?.items && data?.items.length === 0) ? (
                  <Grid container alignItems="center" justifyContent="center">
                    <Grid
                      item
                      component={Typography}
                      flex="1 1 100%"
                      sx={{ mx: 2, my: 4, maxWidth: '300px' }}
                      display="block"
                      textAlign="center"
                      variant="ctaText1"
                    >
                      {noWallet
                        ? t('portfolio.dashboard.noWalletTransCtaText')
                        : t('portfolio.dashboard.hasWalletNoTransCtaText')}
                    </Grid>
                    <Grid container item flex="1 1 100%" justifyContent="center">
                      <Link href="/dashboard/portfolio/wallet/" passHref>
                        <Button type="button" variant="contained" color="primary" sx={{ mb: 4 }}>
                          {t('portfolio.dashboard.addWalletNow')}
                        </Button>
                      </Link>
                    </Grid>
                  </Grid>
                ) : null}
                {/* has wallet and transaction have data */}
                {!noWallet && data?.items && data?.items.length > 0 ? (
                  <>
                    {data?.items.map(({ id, wallet_name, crypto_amount, token_symbol, type, crypto_amount_fiat }) => {
                      return (
                        <Grid sx={{ px: 3, pt: 1.2, pb: 0.8 }} container key={id}>
                          <Grid container item>
                            <Grid component={Typography} flex="1 1 auto">
                              <Typography variant="subtitle1">{wallet_name}</Typography>
                            </Grid>
                            <Grid component={Typography} flex="0 1 50%" textAlign="right">
                              <TokenSymbolDisplay amt={crypto_amount} display="inline" name={token_symbol} />
                            </Grid>
                          </Grid>
                          <Grid container item>
                            <Grid flex="1 1 auto">
                              {type.toLowerCase() === 'in' ? (
                                <Typography variant="subtitle2" color="success.main">
                                  {t('portfolio.dashboard.incoming')}
                                </Typography>
                              ) : (
                                <Typography variant="subtitle2" color="error.main">
                                  {t('portfolio.dashboard.outgoing')}
                                </Typography>
                              )}{' '}
                            </Grid>
                            <Grid
                              component={Typography}
                              variant="subtitle2"
                              flex="0 1 50%"
                              color="text.secondary"
                              textAlign="right"
                            >
                              {primitivesUtils.convertFiatAmountDisplay(crypto_amount_fiat)}
                            </Grid>
                          </Grid>
                        </Grid>
                      );
                    })}
                    <Link href="/dashboard/portfolio/transaction-history/" passHref>
                      <Typography
                        sx={{ px: 3, py: 2, cursor: 'pointer' }}
                        display="block"
                        textAlign="left"
                        variant="textLink1"
                        color="secondary.main"
                      >
                        {t('portfolio.dashboard.vewAllTrans')}
                      </Typography>
                    </Link>
                  </>
                ) : null}
              </DataDisplay>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};
