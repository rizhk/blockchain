import { Box, Button, Card, CardContent, Grid, Typography } from '@mui/material';
import { portfolioApi } from 'api/portfolio-api';
import { DataDisplay } from 'components/common/data-display';
import { TokenSymbolDisplay } from 'components/common/wallet-name-display';
import useFetch from 'hooks/use-fetch';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { primitivesUtils } from 'utils/primitives-utils';
import Link from 'next/link';

export interface IRecentTransactionsProps {}

export const RecentTransactions: React.FC<IRecentTransactionsProps> = ({}) => {
  const { t } = useTranslation();

  const { data, loading, error, trigger } = useFetch(() => {
    return portfolioApi.getLatestNTranscationHistory(
      { latestN: 3 },
      {
        defaultErrorMessage: t('portfolio.dashboard.getRecentTransactionError'),
      },
    );
  }, []);
  return (
    <>
      <Grid container flexDirection="row" width="100%">
        <Grid item>
          <Typography sx={{ mb: 3 }} variant="h6">
            {t('portfolio.dashboard.recentTrans')}
          </Typography>
        </Grid>
        <DataDisplay isLoading={loading} error={error} defaultLoaderOptions={{ height: '100px', width: '100%' }}>
          <Grid item flex="1 1 100%">
            <Card>
              <CardContent sx={{ m: 2 }}>
                {data?.items && data.items.length > 0 ? (
                  <>
                    {data?.items.map(
                      ({ id, from_name, to_name, crypto_amount, token_symbol, type, crypto_amount_fiat }) => {
                        return (
                          <Grid container key={id}>
                            <Grid container item>
                              <Grid component={Typography} variant="body1" flex="1 1 auto">
                                {type.toLowerCase() == 'in' ? (
                                  <Typography>{from_name}</Typography>
                                ) : (
                                  <Typography>{to_name}</Typography>
                                )}
                              </Grid>
                              <Grid component={Typography} variant="subtitle1" flex="0 1 35%">
                                {primitivesUtils.convertCurrencyDisplay(crypto_amount)}{' '}
                                <TokenSymbolDisplay display="inline" name={token_symbol} />
                              </Grid>
                            </Grid>
                            <Grid container item>
                              <Grid flex="1 1 auto">
                                {type.toLowerCase() === 'in' ? (
                                  <Typography variant="body1" color="success.main">
                                    {t('portfolio.dashboard.incoming')}
                                  </Typography>
                                ) : (
                                  <Typography variant="body1" color="error.main">
                                    {t('portfolio.dashboard.outgoing')}
                                  </Typography>
                                )}{' '}
                              </Grid>
                              <Grid component={Typography} variant="subtitle1" flex="0 1 35%" color="text.secondary">
                                {'USD '}
                                {primitivesUtils.convertCurrencyDisplay(crypto_amount_fiat)}
                              </Grid>
                              <Box flex="1 1 100%" sx={{ mb: 2 }}></Box>
                            </Grid>
                          </Grid>
                        );
                      },
                    )}
                    <Link href="/dashboard/portfolio/transaction-history/" passHref>
                      <Typography
                        sx={{ m: 2, cursor: 'pointer' }}
                        display="block"
                        textAlign="center"
                        variant="textLink1"
                        color="secondary.main"
                      >
                        {t('portfolio.dashboard.vewAllTrans')}
                      </Typography>
                    </Link>
                  </>
                ) : (
                  <Grid container alignItems="center" justifyContent="center">
                    <Typography
                      sx={{ mx: 2, my: 4, maxWidth: '300px' }}
                      display="block"
                      textAlign="center"
                      variant="ctaText1"
                    >
                      {t('portfolio.dashboard.noTransactionCtaText')}
                    </Typography>
                    <Link href="/dashboard/portfolio/wallet/" passHref>
                      <Button type="button" variant="contained" color="primary" sx={{ mb: 4 }}>
                        {t('portfolio.dashboard.addWalletNow')}
                      </Button>
                    </Link>
                  </Grid>
                )}
              </CardContent>
            </Card>
          </Grid>
        </DataDisplay>
      </Grid>
    </>
  );
};
