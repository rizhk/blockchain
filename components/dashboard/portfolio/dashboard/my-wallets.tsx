import { Box, Card, CardContent, Grid, Icon, IconButton, Link, Typography } from '@mui/material';
import { portfolioApi } from 'api/portfolio-api';
import { DataDisplay } from 'components/common/data-display';
import useFetch from 'hooks/use-fetch';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { primitivesUtils } from 'utils/primitives-utils';

export interface IMyWalletsProps {}

export const MyWallets: React.FC<IMyWalletsProps> = ({}) => {
  const { t } = useTranslation();

  const { data, loading, error, trigger } = useFetch(() => {
    return portfolioApi.getFirstNWallets(
      { latestN: 5 },
      {
        defaultErrorMessage: t('portfolio.dashboard.getMyWalletsError'),
      },
    );
  }, []);

  const totalBalance = React.useMemo(() => {
    if (!data?.items) return 0;
    return data.items
      .map((item) => primitivesUtils.roundDownToTwo(parseFloat(item.fiat_value)) || 0)
      .reduce((prev, curr) => prev + curr, 0);
  }, [JSON.stringify(data)]);

  return (
    <>
      <Grid container flexDirection="row" width="100%">
        <Grid item>
          <Typography sx={{ mb: 3 }} variant="h6">
            {`${t('portfolio.dashboard.totalWalletBal')}: ${totalBalance}`}
          </Typography>
        </Grid>
        <DataDisplay isLoading={loading} error={error} defaultLoaderOptions={{ height: '400px', width: '100%' }}>
          <Grid item flex="1 1 100%">
            <Card>
              <CardContent>
                <Grid container justifyContent="space-between">
                  <Grid item component={Typography} variant="overline" sx={{ margin: '0 auto 0 0' }}>
                    {t('portfolio.dashboard.myWallets')}
                  </Grid>
                  <Grid
                    item
                    component={Link}
                    href="/dashboard/portfolio/transaction-history/"
                    variant="textLink1"
                    color="secondary.main"
                    sx={{ textDecoration: 'underline ' }}
                  >
                    {t('portfolio.dashboard.addWallet')}
                  </Grid>
                </Grid>
                {data?.items.map(({ id, type, name, icon_tag, address, fiat_value, fiat_currency }) => {
                  return (
                    <Grid spacing={3} container key={id}>
                      <Grid container item flexWrap="nowrap" alignItems="center">
                        <Grid component={Typography} variant="body1" flex="0 0 auto" sx={{ mr: 2 }}>
                          <img alt="Firebase" src={`/static/icons/cryptocurrency/svg/icon/${icon_tag}.svg`} />
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
                          {primitivesUtils.thousandSeparator(primitivesUtils.roundDownToTwo(parseFloat(fiat_value)))}
                        </Grid>
                      </Grid>
                    </Grid>
                  );
                })}
                <Typography
                  component={Link}
                  href="/dashboard/wallets/"
                  sx={{ m: 2 }}
                  display="block"
                  textAlign="center"
                  variant="textLink1"
                  color="secondary.main"
                >
                  {t('portfolio.dashboard.viewAllWallets')}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </DataDisplay>
      </Grid>
    </>
  );
};
