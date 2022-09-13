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
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { IAssetFilters, IAssetsFilters, Wallet } from 'types/portfolio';
import { primitivesUtils } from 'utils/primitives-utils';
import { AssetsChart } from './assets-chart';
import Image from 'next/image';
import { Dot } from 'icons/dot';
import Link from 'next/link';
import { TokenSymbolDisplay } from 'components/common/wallet-name-display';
import { useMemo } from 'react';

export interface IAssetsProps {
  updatedSince: string | null;
  loading: boolean;
  noWallet: boolean;
  wallets: Wallet[] | undefined;
}

export const Assets: React.FC<IAssetsProps> = ({ updatedSince, loading, noWallet, wallets }) => {
  const { t } = useTranslation();

  const [filter, setFilter] = React.useState<IAssetsFilters>({ desc: true });

  const {
    data,
    loading: getUserAssetsLoading,
    error,
    trigger,
  } = useFetch(() => {
    return portfolioApi.getUserAssets(
      {
        defaultErrorMessage: t('portfolio.dashboard.getAssetsError'),
      },
      filter,
    );
  }, [updatedSince, JSON.stringify(filter)]);

  const handleChangeWallet = (value: any | undefined) => {
    setFilter((preFilter) => {
      return { ...preFilter, wallet: value };
    });
  };
  const tableDisplayData = React.useMemo(() => {
    if (!data?.items) return data;
    var tempItems = data.items.filter(({ fiat_value }) => {
      return fiat_value > 0;
    });
    var top7Items = tempItems.slice(0, 7);
    return { ...data, items: top7Items };
  }, [JSON.stringify(data), JSON.stringify(filter)]);

  const theme = useTheme();

  const getColorByIndex = (index: number): string => {
    const randomColor = primitivesUtils.generateRgba();
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
      alpha(theme.palette.secondary.main, 1),
      alpha(theme.palette.secondary.dark, 1),
      alpha(theme.palette.secondary.main, 0.9),
      alpha(theme.palette.secondary.dark, 0.9),
      alpha(theme.palette.secondary.main, 0.8),
      alpha(theme.palette.secondary.dark, 0.8),
      alpha(theme.palette.secondary.main, 0.7),
      alpha(theme.palette.secondary.dark, 0.7),
      alpha(theme.palette.secondary.main, 0.6),
      alpha(theme.palette.secondary.dark, 0.6),
      alpha(theme.palette.secondary.main, 0.5),
      alpha(theme.palette.secondary.dark, 0.5),
      alpha(theme.palette.secondary.main, 0.4),
      alpha(theme.palette.secondary.dark, 0.4),
      alpha(theme.palette.secondary.main, 0.3),
      alpha(theme.palette.secondary.dark, 0.3),
      alpha(theme.palette.secondary.main, 0.2),
      alpha(theme.palette.secondary.dark, 0.2),
      alpha(theme.palette.secondary.main, 0.1),
      alpha(theme.palette.secondary.dark, 0.1),
    ];
    return chartBaseColors[index] ?? randomColor;
  };

  const chartDataSeries = (data?.items || []).map(({ name, balance, fiat_value, fiat_currency, symbol }, index) => {
    return {
      color: getColorByIndex(index),
      data: fiat_value,
      name,
      symbol: symbol + ' ' + primitivesUtils.convertFiatAmountDisplay(balance),
    };
  });

  const chartData = {
    series: chartDataSeries,
  };

  const walletOption = useMemo(() => {
    if (!wallets) return [];
    return wallets.map((w) => {
      return {
        label: w.name,
        value: w.id,
      };
    });
  }, [JSON.stringify(wallets)]);

  return (
    <>
      <Grid container flexDirection="row" width="100%">
        <Grid item>
          <Typography sx={{ mb: 3 }} variant="h6"></Typography>
        </Grid>
        <Grid item flex="1 1 100%">
          <Card>
            <CardContent sx={{ p: 0 }}>
              <Grid container justifyContent="space-between" alignItems="center">
                <Typography sx={{ pl: 3, pt: 1.5, pb: 1.2 }} variant="overline">{`${t(
                  'portfolio.dashboard.assets',
                )}`}</Typography>
                <Box
                  sx={{
                    position: 'relative',
                    alignItems: 'center',
                    display: 'flex',
                    flexWrap: 'wrap',
                    pr: 2,
                    py: 2,
                  }}
                >
                  <MultiSelect
                    label={t('portfolio.transHis.all')}
                    onChange={handleChangeWallet}
                    options={walletOption}
                    value={filter?.wallet}
                  />
                </Box>
              </Grid>
              <Divider sx={{ m: 0, p: 0 }} />
              <DataDisplay
                isLoading={getUserAssetsLoading || loading}
                error={error}
                defaultLoaderOptions={{ height: '400px', width: '100%' }}
              >
                {/* no wallet or assets have no data */}
                {noWallet ||
                (!noWallet && data?.items === undefined) ||
                (!noWallet && data?.items && data?.items.length === 0) ? (
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
                ) : null}
                {/* has wallet and assets have data */}
                {!noWallet && data?.items && data?.items.length > 0 ? (
                  <>
                    <Grid container columnSpacing={2} flexWrap="nowrap" sx={{ px: 4, py: 2 }} alignItems="flex-start">
                      <Grid item flex="0 1 auto" component={AssetsChart} data={chartData} />
                      <Grid item container>
                        <Grid
                          columnSpacing={0.5}
                          container
                          item
                          flex="1 1 auto"
                          alignItems="flex-end"
                          flexWrap="nowrap"
                          sx={{ py: 1 }}
                        >
                          <Grid item flex="1 1 45%" sx={{ justifyContent: 'space-between' }}>
                            <Typography variant="overline" sx={{ textTransform: 'none', lineHeight: 0.25 }}>
                              Total:{' '}
                            </Typography>
                            <Typography variant="overline" display="inline-block" color="secondary.main">
                              {primitivesUtils.convertFiatAmountDisplay(data?.total_bal || 0)}
                            </Typography>
                          </Grid>
                          <Grid item flex="1 1 27.5%">
                            <Typography variant="overline">BALANCE</Typography>
                          </Grid>
                          <Grid item flex="1 1 27.5%">
                            <Typography variant="overline">USD AMOUNT</Typography>
                          </Grid>
                        </Grid>
                        {tableDisplayData?.items?.map((item, index) => {
                          return (
                            <Grid
                              columnSpacing={0.5}
                              key={item.name}
                              container
                              item
                              flex="1 1 auto"
                              alignItems="center"
                              flexWrap="nowrap"
                              sx={{ borderTop: '1px solid #E6E8F0', py: 2 }}
                            >
                              <Grid container item flex="1 1 45%" alignItems="center">
                                <Grid item component={Dot} sx={{ color: getColorByIndex[index] }} />
                                <Grid
                                  item
                                  component={() => {
                                    return (
                                      <Image
                                        width="20"
                                        height="20"
                                        alt={item.symbol}
                                        src={item.icon === '' ? '/static/crypto/default/erc-20.svg' : item.icon}
                                      />
                                    );
                                  }}
                                />
                                <Grid item>
                                  <Typography sx={{ pl: 1 }} variant="caption">
                                    {item.name}
                                  </Typography>
                                </Grid>
                              </Grid>
                              <Grid item flex="1 1 27.5%" sx={{ mr: 3.5 }} textAlign="right">
                                <TokenSymbolDisplay amt={item.balance} name={item.symbol} variant="caption" />
                              </Grid>
                              <Grid item flex="1 1 27.5%" sx={{ mr: 3.5 }} textAlign="right">
                                <Typography variant="caption">
                                  {primitivesUtils.convertFiatAmountDisplay(item.fiat_value)}
                                </Typography>
                              </Grid>
                            </Grid>
                          );
                        })}
                      </Grid>
                    </Grid>
                    <Grid sx={{ px: 3, py: 2 }} container justifyContent="space-between" alignItems="center">
                      <Link href="/dashboard/portfolio/assets/" passHref>
                        <Typography
                          sx={{ cursor: 'pointer' }}
                          display="block"
                          textAlign="center"
                          variant="textLink1"
                          color="secondary.main"
                        >
                          {t('portfolio.dashboard.viewAllAssets')}
                        </Typography>
                      </Link>
                      <Typography variant="body1">
                        {`${t('portfolio.dashboard.totalAssets')}: `}
                        <Typography display="inline" variant="body1" color="secondary.main">
                          {data?.item_count}
                        </Typography>
                      </Typography>
                    </Grid>
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
