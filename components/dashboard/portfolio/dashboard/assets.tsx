import {
  Box,
  Card,
  CardContent,
  Grid,
  Icon,
  IconButton,
  Link,
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

export interface IAssetsProps {}

export const Assets: React.FC<IAssetsProps> = ({}) => {
  const { t } = useTranslation();

  const { data, loading, error, trigger } = useFetch(() => {
    return portfolioApi.getUserAssets({
      defaultErrorMessage: t('portfolio.dashboard.getAssetsError'),
    });
  }, []);

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

  const chartBaseColors = [theme.palette.primary.main, theme.palette.primary.dark, '#828DF8', '#B9BDDF'];

  const chartDataSeries = filteredData?.items?.map(({ name, balance }, index) => {
    return {
      color: chartBaseColors[index],
      data: primitivesUtils.roundDownToTwo(balance),
      name,
    };
  });

  const chartData = {
    series: chartDataSeries,
  };

  return (
    <>
      <Grid container flexDirection="row" width="100%">
        <Grid item>
          <Typography sx={{ mb: 3 }} variant="h6">
            {`${t('portfolio.dashboard.assets')}`}
          </Typography>
        </Grid>
        <DataDisplay isLoading={loading} error={error} defaultLoaderOptions={{ height: '400px', width: '100%' }}>
          <Grid item flex="1 1 100%">
            <Card>
              <CardContent sx={{ p: 0 }}>
                {/* <Grid container justifyContent="space-between">
                  <Box
                    sx={{
                      position: 'relative',
                      alignItems: 'center',
                      display: 'flex',
                      flexWrap: 'wrap',
                      py: 2,
                      px: 2,
                    }}
                  >
                    <SingleSelect
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
                    />
                    <SingleSelect
                      shouldShowClearButton
                      onChange={handleChangeStatus}
                      label={t('portfolio.dashboard.status')}
                      value={filter?.status as string}
                      options={[{ value: 'Completed', label: 'Completed' }]}
                    />
                    <SingleSelect
                      onChange={handleChangeSorting}
                      label={t('portfolio.dashboard.mostRecent')}
                      value={filter.desc}
                      options={[
                        { value: true, label: t('portfolio.dashboard.mostRecent') },
                        { value: false, label: t('portfolio.dashboard.earliest') },
                      ]}
                    />
                  </Box>
                </Grid>
                <Divider sx={{ m: 0, p: 0 }} /> */}
                <Grid container flexWrap="nowrap" sx={{ py: 2 }} alignItems="center">
                  <Grid item flex="0 1 auto" component={AssetsChart} data={chartData} />
                  <Grid item container>
                    <Grid container item flex="1 1 auto" alignItems="flex-end" flexWrap="nowrap" sx={{ py: 1 }}>
                      <Grid item flex="1 1 33%">
                        <Typography variant="overline" sx={{ textTransform: 'none', lineHeight: 0.25 }}>
                          Total
                        </Typography>
                        <br />
                        <Typography variant="overline" display="inline-block" color="secondary.main">
                          {data?.total_bal_symbol}{' '}
                          {primitivesUtils.convertCurrencyDisplay(filteredData?.total_bal as string)}
                        </Typography>
                      </Grid>
                      <Grid item flex="1 1 33%">
                        <Typography variant="overline">BALANCE</Typography>
                      </Grid>
                      <Grid item flex="1 1 33%">
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
                          <Grid container item flex="1 1 33%" alignItems="center">
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
                          <Grid item flex="1 1 33%">
                            <Typography variant="caption">
                              {item.symbol} {primitivesUtils.convertCurrencyDisplay(item.balance)}
                            </Typography>
                          </Grid>
                          <Grid item flex="1 1 33%">
                            <Typography variant="caption">
                              {item.fiat_currency} {primitivesUtils.convertCurrencyDisplay(item.fiat_value)}
                            </Typography>
                          </Grid>
                        </Grid>
                      );
                    })}
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </DataDisplay>
      </Grid>
    </>
  );
};