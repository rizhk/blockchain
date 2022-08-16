import {
  alpha,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Icon,
  IconButton,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { ApexOptions } from 'apexcharts';
import { portfolioApi } from 'api/portfolio-api';
import { Chart } from 'components/chart';
import { DataDisplay } from 'components/common/data-display';
import { Divider } from 'components/common/divider';
import { MultiSelect } from 'components/multi-select';
import { SingleSelect } from 'components/single-select';
import useFetch from 'hooks/use-fetch';
import { filter } from 'lodash';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { IAssetFilters } from 'types/portfolio';
import { primitivesUtils } from 'utils/primitives-utils';
import { AssetsChart } from './assets-chart';
import Image from 'next/image';
import { Dot } from 'icons/dot';
import Link from 'next/link';

export interface IAssetsProps {
  lastUpdatedDt: Date | undefined;
}

export const Assets: React.FC<IAssetsProps> = ({ lastUpdatedDt }) => {
  const { t } = useTranslation();

  const { data, loading, error, trigger } = useFetch(() => {
    return portfolioApi.getUserAssets({
      defaultErrorMessage: t('portfolio.dashboard.getAssetsError'),
    });
  }, [lastUpdatedDt]);

  const [filter, setFilter] = React.useState<IAssetFilters>({ desc: true });

  const handleChangeWallet = (value: string | undefined) => {
    setFilter((preFilter) => {
      return { ...preFilter, wallet: value };
    });
  };
  const handleChangeStatus = (value: string | undefined) => {
    setFilter((preFilter) => {
      return { ...preFilter, status: value };
    });
  };
  const handleChangeSorting = (value: boolean | undefined) => {
    setFilter((preFilter) => {
      return { ...preFilter, desc: value === undefined ? true : value };
    });
  };
  const filteredData = React.useMemo(() => {
    if (!data?.items) return data;
    var items = data.items.filter(({ name }) => {
      return !filter?.wallet || name === filter.wallet;
    });
    return { ...data, items };
  }, [JSON.stringify(data), JSON.stringify(filter)]);

  const theme = useTheme();

  const chartBaseColors = [
    alpha(theme.palette.primary.main, 1),
    alpha(theme.palette.primary.dark, 1),
    alpha('#828DF8', 1),
    alpha('#B9BDDF', 1),
    alpha(theme.palette.primary.main, 0.8),
    alpha(theme.palette.primary.dark, 0.8),
    alpha('#828DF8', 0.8),
    alpha('#B9BDDF', 0.8),
    alpha(theme.palette.primary.main, 0.6),
    alpha(theme.palette.primary.dark, 0.6),
    alpha('#828DF8', 0.6),
    alpha('#B9BDDF', 0.6),
    alpha(theme.palette.primary.main, 0.4),
    alpha(theme.palette.primary.dark, 0.4),
    alpha('#828DF8', 0.4),
    alpha('#B9BDDF', 0.4),
    alpha(theme.palette.primary.main, 0.2),
    alpha(theme.palette.primary.dark, 0.2),
    alpha('#828DF8', 0.2),
    alpha('#B9BDDF', 0.2),
  ];

  const chartDataSeries = filteredData?.items?.map(({ name, balance, fiat_value, fiat_currency, symbol }, index) => {
    return {
      color: chartBaseColors[index],
      data: primitivesUtils.roundDownToTwo(fiat_value),
      name,
      symbol: symbol + ' ' + fiat_currency + ' ' + primitivesUtils.convertCurrencyDisplay(balance),
    };
  });

  const chartData = {
    series: chartDataSeries,
  };

  return (
    <>
      <Grid container flexDirection="row" width="100%">
        <Grid item>
          <Typography sx={{ mb: 3 }} variant="h6"></Typography>
        </Grid>
        <DataDisplay isLoading={loading} error={error} defaultLoaderOptions={{ height: '400px', width: '100%' }}>
          <Grid item flex="1 1 100%">
            <Card>
              <CardContent sx={{ p: 0 }}>
                <Grid container justifyContent="space-between" alignItems="center">
                  <Typography sx={{ pl: 4 }} variant="overline">{`${t('portfolio.dashboard.assets')}`}</Typography>
                  <Box
                    sx={{
                      position: 'relative',
                      alignItems: 'center',
                      display: 'flex',
                      flexWrap: 'wrap',
                      pr: 4,
                      py: 2,
                    }}
                  >
                    <SingleSelect
                      small
                      shouldShowClearButton
                      onChange={handleChangeWallet}
                      label={t('portfolio.dashboard.allWallets')}
                      value={filter?.wallet as string}
                      options={
                        data?.items?.map(({ name }) => {
                          return {
                            value: name,
                            label: name,
                          };
                        }) || []
                      }
                      labelProps={{ variant: 'overline', textTransform: 'none' }}
                    />
                    <SingleSelect
                      small
                      shouldShowClearButton
                      onChange={handleChangeStatus}
                      label={t('portfolio.dashboard.status')}
                      value={filter?.status as string}
                      options={[{ value: 'Completed', label: 'Completed' }]}
                      labelProps={{ variant: 'overline', textTransform: 'none' }}
                    />
                    <SingleSelect
                      small
                      onChange={handleChangeSorting}
                      label={t('portfolio.dashboard.mostRecent')}
                      value={filter.desc}
                      options={[
                        { value: true, label: t('portfolio.dashboard.mostRecent') },
                        { value: false, label: t('portfolio.dashboard.earliest') },
                      ]}
                      labelProps={{ variant: 'overline', textTransform: 'none' }}
                    />
                  </Box>
                </Grid>
                <Divider sx={{ m: 0, p: 0 }} />
                {data?.items && data?.items.length > 0 ? (
                  <Grid container spacing={2} flexWrap="nowrap" sx={{ px: 4, py: 2 }} alignItems="center">
                    <Grid item flex="0 1 auto" component={AssetsChart} data={chartData} />
                    <Grid item container>
                      <Grid container item flex="1 1 auto" alignItems="flex-end" flexWrap="nowrap" sx={{ py: 1 }}>
                        <Grid item flex="1 1 40%">
                          <Typography variant="overline" sx={{ textTransform: 'none', lineHeight: 0.25 }}>
                            Total
                          </Typography>
                          <br />
                          <Typography variant="overline" display="inline-block" color="secondary.main">
                            {data?.total_bal_symbol}{' '}
                            {primitivesUtils.convertCurrencyDisplay(filteredData?.total_bal as string)}
                          </Typography>
                        </Grid>
                        <Grid item flex="1 1 30%">
                          <Typography variant="overline">BALANCE</Typography>
                        </Grid>
                        <Grid item flex="1 1 30%">
                          <Typography variant="overline">USD AMOUNT</Typography>
                        </Grid>
                      </Grid>
                      {filteredData?.items?.map((item, index) => {
                        return (
                          <Grid
                            key={item.name}
                            container
                            item
                            flex="1 1 auto"
                            alignItems="center"
                            flexWrap="nowrap"
                            sx={{ borderTop: '1px solid #E6E8F0', py: 2 }}
                          >
                            <Grid container item flex="1 1 40%" alignItems="center">
                              <Grid item component={Dot} sx={{ color: [chartBaseColors[index]] }} />
                              <Grid
                                item
                                component={() => {
                                  return <Image width="20" height="20" alt={item.symbol} src={item.icon} />;
                                }}
                              />
                              <Grid item>
                                <Typography sx={{ pl: 1 }} variant="caption">
                                  {item.name}
                                </Typography>
                              </Grid>
                            </Grid>
                            <Grid item flex="1 1 30%">
                              <Typography variant="caption">
                                {item.symbol} {primitivesUtils.convertCurrencyDisplay(item.balance)}
                              </Typography>
                            </Grid>
                            <Grid item flex="1 1 30%">
                              <Typography variant="caption">
                                {item.fiat_currency} {primitivesUtils.convertCurrencyDisplay(item.fiat_value)}
                              </Typography>
                            </Grid>
                          </Grid>
                        );
                      })}
                    </Grid>
                  </Grid>
                ) : (
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
                      {t('portfolio.dashboard.noAssetCtaText')}
                    </Grid>
                    <Grid container item flex="1 1 100%" justifyContent="center">
                      <Link href="/dashboard/portfolio/wallet/" passHref>
                        <Button type="button" variant="contained" color="primary" sx={{ mb: 8 }}>
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
