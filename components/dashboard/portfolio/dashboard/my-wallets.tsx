import { Box, Button, Card, CardContent, Grid, Icon, IconButton, Typography } from '@mui/material';
import { portfolioApi } from 'api/portfolio-api';
import { DataDisplay } from 'components/common/data-display';
import useFetch from 'hooks/use-fetch';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { primitivesUtils } from 'utils/primitives-utils';
import Image from 'next/image';
import Link from 'next/link';
import { Divider } from 'components/common/divider';

export interface IMyWalletsProps {
  updatedSince: string | null;
  loading: boolean;
  noWallet: boolean;
}

export const MyWallets: React.FC<IMyWalletsProps> = ({ updatedSince, loading, noWallet }) => {
  const { t } = useTranslation();

  const {
    data,
    loading: getFirstNWalletsLoading,
    error,
    trigger,
  } = useFetch(() => {
    return portfolioApi.getFirstNWallets(
      { latestN: 5 },
      {
        defaultErrorMessage: t('portfolio.dashboard.getMyWalletsError'),
      },
    );
  }, [updatedSince]);

  const totalBalance = React.useMemo(() => {
    if (!data?.items) return 0;
    return data.items
      .map((item) => primitivesUtils.roundDownToTwo(parseFloat(item.fiat_value)) || 0)
      .reduce((prev, curr) => prev + curr, 0);
  }, [JSON.stringify(data)]);

  return (
    <>
      <Grid container flexDirection="row" width="100%">
        <DataDisplay
          isLoading={getFirstNWalletsLoading || loading}
          error={error}
          defaultLoaderOptions={{ height: '400px', width: '100%' }}
        >
          <Grid item flex="1 1 100%">
            <Card>
              <CardContent sx={{ p: 0 }}>
                <Grid container justifyContent="space-between" alignItems="center">
                  <Grid item component={Typography} variant="overline" sx={{ pl: 3, pt: 1.5, pb: 0.8 }}>
                    {t('portfolio.dashboard.myWallets')}
                  </Grid>
                  <Typography sx={{ pr: 4, py: 2 }} variant="textLink1" color="secondary.main">
                    <Link href="/dashboard/portfolio/wallet" passHref>
                      {t('portfolio.dashboard.addWallet')}
                    </Link>
                  </Typography>
                </Grid>
                <Divider sx={{ m: 0, p: 0 }} />
                {data?.items && data.items.length > 0 && !noWallet ? (
                  <>
                    {data?.items?.map(({ id, type, name, icon_tag, address, fiat_value, fiat_currency }) => {
                      return (
                        <Grid sx={{ px: 3, py: 2 }} container key={id}>
                          <Grid container item flexWrap="nowrap" alignItems="center">
                            <Grid component={Typography} variant="body1" flex="0 0 auto" sx={{ mr: 2 }}>
                              <Image src={`/static/crypto/color/${icon_tag}.svg`} height="30" width="30" />{' '}
                            </Grid>
                            <Grid flexDirection="column" container flex="1 1 auto">
                              <Grid component={Typography} variant="body1" sx={{ pb: 0.25 }}>
                                {name}
                              </Grid>
                              <Grid component={Typography} variant="body2" color="text.secondary">
                                {primitivesUtils.getShortTxnId(address)}
                              </Grid>
                            </Grid>
                            <Grid component={Typography} variant="body1" flex="0 0 auto">
                              {fiat_currency}{' '}
                              {primitivesUtils.thousandSeparator(
                                primitivesUtils.roundDownToTwo(parseFloat(fiat_value)),
                              )}
                            </Grid>
                          </Grid>
                        </Grid>
                      );
                    })}
                    <Grid sx={{ px: 3, py: 2 }} container justifyContent="space-between" alignItems="center">
                      <Link href="/dashboard/portfolio/wallet/" passHref>
                        <Typography
                          sx={{ cursor: 'pointer' }}
                          display="block"
                          textAlign="center"
                          variant="textLink1"
                          color="secondary.main"
                        >
                          {t('portfolio.dashboard.viewAllWallets')}
                        </Typography>
                      </Link>
                      <Typography variant="body1">
                        {`${t('portfolio.dashboard.total')}: `}
                        <Typography display="inline" variant="body1" color="secondary.main">
                          USD {primitivesUtils.convertCurrencyDisplay(totalBalance)}
                        </Typography>
                      </Typography>
                    </Grid>
                  </>
                ) : (
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
                      {t('portfolio.dashboard.noWalletCtaText')}
                    </Grid>
                    <Grid container item flex="1 1 100%" justifyContent="center">
                      <Link href="/dashboard/portfolio/wallet/" passHref>
                        <Button type="button" variant="contained" color="primary" sx={{ mb: 4 }}>
                          {t('portfolio.dashboard.addWalletNow')}
                        </Button>
                      </Link>
                    </Grid>
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
