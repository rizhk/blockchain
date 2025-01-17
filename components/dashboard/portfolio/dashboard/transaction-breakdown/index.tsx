import { alpha, capitalize, Card, CardContent, Grid, Typography, useTheme } from '@mui/material';
import { portfolioApi } from 'api/portfolio-api';
import { DataDisplay } from 'components/common/data-display';
import { DatePickerSelect } from 'components/common/date-picker-select';
import { Divider } from 'components/common/divider';
import { MultiSelect } from 'components/multi-select';
import useFetch from 'hooks/use-fetch';
import { Dot } from 'icons/dot';
import { random, sum, take } from 'lodash';
import * as React from 'react';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { neutral } from 'theme/colors';
import { ITransactionBreakdownFilters, TransactionBreakdownItem, Wallet } from 'types/portfolio';
import { primitivesUtils } from 'utils/primitives-utils';
import { NoWalletCTA } from '../no-wallet-cta';
import { BreakdownChart, BreakdownChartProps } from './chart';

export interface IAssetsProps {
  updatedSince: string | null;
  loading: boolean;
  noWallet: boolean;
  wallets: Wallet[] | undefined;
}

const chartBaseColors = [
  alpha('#5173B8', 1),
  alpha('#0BB39C', 1),
  alpha('#F09739', 1),
  alpha('#F06549', 1),
  alpha('#A267AD', 1),
  alpha('#DBD42D', 1),
];

const UNASSIGNED = 'unassigned';
const SUCCESS_NO_ITEMS = 'SUCCESS_NO_ITEMS';

export const TransactionBreakdown: React.FC<IAssetsProps> = ({ updatedSince, loading, noWallet, wallets }) => {
  const { t } = useTranslation();

  const theme = useTheme();

  const getItemColor = useCallback(
    (item: TransactionBreakdownItem, index: number): string => {
      if (item.name.toLowerCase() === UNASSIGNED) return theme.palette.neutral?.[400] ?? neutral[400]; // just in case
      return chartBaseColors[index] ?? primitivesUtils.generateRgba();
    },
    [theme.palette.neutral],
  );

  // #region filter
  const walletOption = useMemo(() => {
    if (!wallets) return [];
    return wallets.map((w) => {
      return {
        label: w.name,
        value: w.id,
      };
    });
  }, [JSON.stringify(wallets)]);

  const handleChangeWallet = (value: any | undefined) => {
    setFilter((preFilter) => {
      return { ...preFilter, wallet: value };
    });
  };

  const defaultRange = '30d';
  const { startDate: defaultStartDate, endDate: defaultEndDate } = primitivesUtils.getStartEndDateByRange(defaultRange);
  const handleChangeDates = (startDate: Date | undefined, endDate: Date | undefined) => {
    setFilter((preFilter) => {
      return { ...preFilter, start_date: startDate, end_date: endDate };
    });
  };

  const typeOptions = ['in', 'out'].map((value) => ({
    value,
    label: t(`portfolio.breakdown.type.${value}`),
  }));
  const handleChangeType = (value: ITransactionBreakdownFilters['types']) => {
    setFilter((preFilter) => {
      return { ...preFilter, types: value };
    });
  };

  // todo: change interface name?
  const [filter, setFilter] = React.useState<ITransactionBreakdownFilters>({
    start_date: defaultStartDate,
    end_date: defaultEndDate,
  });
  // #endregion filters

  const {
    data,
    loading: isFetching,
    error,
    trigger,
  } = useFetch(() => {
    return portfolioApi.getUserTransactionBreakdown(
      {
        defaultErrorMessage: t('portfolio.breakdown.fetchError'),
      },
      filter,
    );
  }, [updatedSince, JSON.stringify(filter)]);

  // #region memoized
  const coloredItems = useMemo(
    () => data?.items?.map((item, index) => ({ ...item, color: getItemColor(item, index) })) ?? [],
    [data?.items, getItemColor],
  );

  const isEmptyData = useMemo(
    () => data?.item_count == 0 && data?.message == SUCCESS_NO_ITEMS,
    [data?.item_count, data?.message],
  );

  const chartItems: BreakdownChartProps['items'] = useMemo(() => {
    if (isFetching) {
      return []; // don't generate chart data yet
    }
    if (isEmptyData) {
      const ratios = new Array(6).fill(0).map(() => random(true));
      const total = sum(ratios);
      return ratios.map((ratio, index) => {
        const percentage = (ratio / total) * 70 + 5;
        return {
          percentage,
          color: chartBaseColors[index],
        };
      });
    }
    return coloredItems;
  }, [isFetching, isEmptyData, coloredItems]);
  // #endregion memoized

  return (
    <>
      <Grid container flexDirection="row" width="100%">
        <Grid item flex="1 1 100%">
          <Card>
            <CardContent sx={{ p: 0 }}>
              {/* Header */}
              <Grid container justifyContent="space-between" alignItems="center" flexWrap="nowrap">
                <Grid item component={Typography} variant="overline" sx={{ pl: 3, pt: 1.5, pb: 0.8 }}>
                  {t('portfolio.breakdown.$')}
                </Grid>
                {/* Filter */}
                <Grid container item flexWrap="nowrap" flexBasis="fit-content" sx={{ width: 'fit-content', mr: 2 }}>
                  <MultiSelect
                    label={t('portfolio.transHis.all')}
                    onChange={handleChangeWallet}
                    options={walletOption}
                    value={filter?.wallet}
                  />
                  {/* <MultiSelect
                    label={t('portfolio.breakdown.allTypes')}
                    onChange={handleChangeType}
                    options={typeOptions}
                    value={filter?.types}
                  /> */}
                  <DatePickerSelect
                    handleChangeDates={handleChangeDates}
                    defaultStartDate={defaultStartDate}
                    defaultEndDate={defaultEndDate}
                    defaultRange={defaultRange}
                  />
                </Grid>
              </Grid>
              <Divider sx={{ m: 0, p: 0 }} />
              <DataDisplay
                isLoading={isFetching || loading}
                error={error}
                defaultLoaderOptions={{ height: '400px', width: '100%' }}
              >
                {!noWallet ? (
                  <>
                    <Grid container columnSpacing={2} flexWrap="nowrap" sx={{ px: 2, py: 2 }} alignItems="flex-start">
                      <Grid item flex="0" sx={{ opacity: isEmptyData ? 0.4 : 1 }}>
                        <BreakdownChart
                          items={chartItems}
                          total={isEmptyData ? '$10.00' : primitivesUtils.convertFiatAmountDisplay(data?.total ?? 0)}
                          showLabels={!isEmptyData}
                        />
                      </Grid>
                      <Grid item container flexDirection="column" sx={{ mx: 4 }} minHeight={274}>
                        {/* Header */}
                        <Grid
                          container
                          item
                          flex="0 1 auto"
                          alignItems="flex-end"
                          flexWrap="nowrap"
                          sx={{ py: 1, borderBottom: '1px solid #E6E8F0' }}
                        >
                          <Grid item flex="1 1 50%">
                            <Typography variant="overline" sx={{ color: '#6B7280' }}>
                              {capitalize(t('portfolio.breakdown.account'))}
                            </Typography>
                          </Grid>
                          <Grid item flex="1 1 50%">
                            <Typography variant="overline" sx={{ color: '#6B7280' }}>
                              {capitalize(t('portfolio.breakdown.expenditures'))}
                            </Typography>
                          </Grid>
                        </Grid>
                        {/* Rows */}
                        {coloredItems.length > 0 &&
                          coloredItems.map((item, index) => (
                            <Grid
                              columnSpacing={0.5}
                              key={item.name}
                              container
                              item
                              alignItems="center"
                              flexWrap="nowrap"
                              py={1.5}
                              borderBottom={index != coloredItems.length - 1 ? '1px solid #E6E8F0' : ''}
                            >
                              <Grid container item flex="1 1 50%" alignItems="center">
                                <Grid item component={Dot} sx={{ color: item.color }} />
                                <Grid item>
                                  <Typography sx={{ pl: 1 }} variant="subtitle2">
                                    {item.name}
                                  </Typography>
                                </Grid>
                              </Grid>
                              <Grid container item flex="1 1 50%">
                                <Typography variant="subtitle2">
                                  {primitivesUtils.convertPercentageDisplay(item.percentage)}
                                </Typography>
                                <Typography variant="body2" sx={{ color: '#6B7280', fontWeight: 500, ml: 2 }}>
                                  {primitivesUtils.convertFiatAmountDisplay(item.value)}
                                </Typography>
                              </Grid>
                            </Grid>
                          ))}
                        {coloredItems.length < 5 && (
                          <Grid
                            container
                            item
                            flex="0.5 1 auto"
                            alignItems="center"
                            flexWrap="nowrap"
                            borderTop={'1px solid #E6E8F0'}
                          >
                            <Typography
                              variant="subtitle2"
                              textAlign="center"
                              color="#9CA3AF"
                              sx={{ mt: 3, mx: 'auto' }}
                            >
                              {t(`portfolio.breakdown.${coloredItems.length == 0 ? 'hintEmpty' : 'hintLT5'}`)}
                            </Typography>
                          </Grid>
                        )}
                      </Grid>
                    </Grid>
                    {/* <Grid sx={{ px: 3, py: 2 }} container justifyContent="space-between" alignItems="center">
                      { TODO: no breakdown page yet }
                      <Link href="/dashboard/portfolio/breakdown/" passHref>
                        <Typography
                          sx={{ cursor: 'pointer' }}
                          display="block"
                          textAlign="center"
                          variant="textLink1"
                          color="secondary.main"
                        >
                          {t('portfolio.breakdown.viewCompleteBreakdown')}
                        </Typography>
                      </Link>
                      <Typography variant="body2">
                        {`${t('portfolio.breakdown.totalAccounts')}: `}
                        <Typography display="inline" variant="body1" color="secondary.main">
                          {data?.item_count}
                        </Typography>
                      </Typography>
                    </Grid> */}
                  </>
                ) : (
                  <NoWalletCTA />
                )}
              </DataDisplay>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};
