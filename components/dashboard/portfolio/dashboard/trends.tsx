import { Button, Card, CardContent, Divider, Grid, Typography } from '@mui/material';
import { DataDisplay } from 'components/common/data-display';
import * as React from 'react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { GetTrendsResponse, TrendChartData, Wallet } from 'types/portfolio';
import { primitivesUtils } from 'utils/primitives-utils';
import Link from 'next/link';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { TrendsAreaChart } from './trends-area-chart';
import useFetch from 'hooks/use-fetch';
import { portfolioApi } from 'api/portfolio-api';
import { format } from 'date-fns-tz';
import { useQuery } from 'react-query';
import { useTrendsQuery } from './trends.queries';

export interface ITrendsProps {
  updatedSince: string | null;
  loading: boolean;
  noWallet: boolean;
  wallets: Wallet[] | undefined;
}

export const Trends: React.FC<ITrendsProps> = ({ updatedSince, loading, noWallet, wallets }) => {
  const { t } = useTranslation();

  const { data, isLoading, error } = useTrendsQuery();

  const trendChartData: TrendChartData[] = React.useMemo(() => {
    if (!data?.items) return [];

    return data.items.map(({ date, ...rest }) => {
      const dateObj: Date = new Date(date);
      return {
        date: dateObj,
        day: format(dateObj, 'dd'),
        month: format(dateObj, 'MMM'),
        year: format(dateObj, 'yyyy'),
        ...rest,
      };
    });
  }, [JSON.stringify(data?.items)]);

  return (
    <>
      <Grid container flexDirection="row" width="100%">
        <Grid item flex="1 1 100%">
          <Card>
            <CardContent sx={{ p: 0, height: !noWallet && data?.items ? '450px' : 'auto' }}>
              <Grid container justifyContent="space-between" alignItems="center">
                <Grid item component={Typography} variant="overline" sx={{ px: 3, pt: 1.2, pb: 1 }}>
                  {t('portfolio.dashboard.trends')}
                </Grid>
              </Grid>
              <Divider sx={{ m: 0, p: 0 }} />
              <DataDisplay
                data={!!data?.items && !noWallet}
                isLoading={isLoading || loading}
                error={error?.message}
                defaultLoaderOptions={{ height: '100px', width: '100%' }}
              >
                {noWallet && !loading && !isLoading ? (
                  <Grid container alignItems="center" justifyContent="center">
                    <Grid
                      item
                      component={Typography}
                      flex="1 1 100%"
                      sx={{ mx: 4, mt: 8, mb: 4, maxWidth: '400px' }}
                      display="block"
                      textAlign="center"
                      variant="ctaText1"
                    >
                      {t('portfolio.dashboard.noTrendsCtaText')}
                    </Grid>
                    <Grid container item flex="1 1 100%" justifyContent="center">
                      <Link href="/dashboard/portfolio/wallet/" passHref>
                        <Button type="button" variant="contained" color="primary" sx={{ mb: 8 }}>
                          {t('portfolio.dashboard.addWalletNow')}
                        </Button>
                      </Link>
                    </Grid>
                  </Grid>
                ) : (
                  <TrendsAreaChart trends={trendChartData ?? []} />
                )}
              </DataDisplay>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};
