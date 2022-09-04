import { Button, Card, CardContent, Divider, Grid, Typography } from '@mui/material';
import { DataDisplay } from 'components/common/data-display';
import * as React from 'react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { GetTrendsResponse, Wallet } from 'types/portfolio';
import { primitivesUtils } from 'utils/primitives-utils';
import Link from 'next/link';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { TrendsAreaChart } from './trends-area-chart';

export interface ITrendsProps {
  updatedSince: string | null;
  loading: boolean;
  noWallet: boolean;
  wallets: Wallet[] | undefined;
}

export const Trends: React.FC<ITrendsProps> = ({ updatedSince, loading, noWallet, wallets }) => {
  const { t } = useTranslation();

  const data: GetTrendsResponse = {
    error: false,
    items: [
      {
        fiat_value: 100,
        fiat_currency: 'USD',
        token_symbol: 'ETH',
        crypto_amount: 100,
        date: new Date('2022/01/01'),
      },
      {
        fiat_value: 100,
        fiat_currency: 'USD',
        token_symbol: 'ETH',
        crypto_amount: 20,
        date: new Date('2022/02/01'),
      },
      {
        fiat_value: 100,
        fiat_currency: 'USD',
        token_symbol: 'ETH',
        crypto_amount: 100,
        date: new Date('2022/03/01'),
      },
      {
        fiat_value: 100,
        fiat_currency: 'USD',
        token_symbol: 'ETH',
        crypto_amount: 242,
        date: new Date('2022/04/01'),
      },
      {
        fiat_value: 100,
        fiat_currency: 'USD',
        token_symbol: 'ETH',
        crypto_amount: 290,
        date: new Date('2022/05/01'),
      },
      {
        fiat_value: 100,
        fiat_currency: 'USD',
        token_symbol: 'ETH',
        crypto_amount: 100,
        date: new Date('2022/06/01'),
      },
      {
        fiat_value: 100,
        fiat_currency: 'USD',
        token_symbol: 'ETH',
        crypto_amount: 52,
        date: new Date('2022/07/01'),
      },
      {
        fiat_value: 100,
        fiat_currency: 'USD',
        token_symbol: 'ETH',
        crypto_amount: 100,
        date: new Date('2022/08/01'),
      },
      {
        fiat_value: 100,
        fiat_currency: 'USD',
        token_symbol: 'ETH',
        crypto_amount: 70,
        date: new Date('2022/09/01'),
      },
      {
        fiat_value: 100,
        fiat_currency: 'USD',
        token_symbol: 'ETH',
        crypto_amount: 100,
        date: new Date('2022/10/01'),
      },
      {
        fiat_value: 100,
        fiat_currency: 'USD',
        token_symbol: 'ETH',
        crypto_amount: 43,
        date: new Date('2022/11/01'),
      },
      {
        fiat_value: 100,
        fiat_currency: 'USD',
        token_symbol: 'ETH',
        crypto_amount: 100,
        date: new Date('2022/12/01'),
      },
    ],
  };

  return (
    <>
      <Grid container flexDirection="row" width="100%">
        <DataDisplay
          isLoading={false || loading}
          error={undefined}
          defaultLoaderOptions={{ height: '100px', width: '100%' }}
        >
          <Grid item flex="1 1 100%">
            <Card>
              <CardContent sx={{ p: 0, height: !noWallet && data?.items ? '450px' : 'auto' }}>
                <Grid container justifyContent="space-between" alignItems="center">
                  <Grid item component={Typography} variant="overline" sx={{ px: 3, pt: 1.2, pb: 1 }}>
                    {t('portfolio.dashboard.trends')}
                  </Grid>
                </Grid>
                <Divider sx={{ m: 0, p: 0 }} />
                {!data?.error && !noWallet ? (
                  <TrendsAreaChart trends={data?.items ?? []} />
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
                      {t('portfolio.dashboard.noTrendsCtaText')}
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
