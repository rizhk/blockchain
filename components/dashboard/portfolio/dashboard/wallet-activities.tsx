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
import { portfolioApi } from 'api/portfolio-api';
import { DataDisplay } from 'components/common/data-display';
import { Divider } from 'components/common/divider';
import { MultiSelect } from 'components/multi-select';
import { SingleSelect } from 'components/single-select';
import useFetch from 'hooks/use-fetch';
import { filter } from 'lodash';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { primitivesUtils } from 'utils/primitives-utils';
import Link from 'next/link';
import { IWalletActivitiesFilters, Wallet } from 'types/portfolio';
import { useMemo } from 'react';
import { DatePickerSelect } from 'components/common/date-picker-select';

export interface IWalletActivitiesProps {
  updatedSince: string | null;
  loading: boolean;
  noWallet: boolean;
  wallets: Wallet[] | undefined;
}

export const WalletActivities: React.FC<IWalletActivitiesProps> = ({ updatedSince, loading, noWallet, wallets }) => {
  const { t } = useTranslation();

  const walletOption = useMemo(() => {
    if (!wallets) return [];
    return wallets.map((w) => {
      return {
        label: w.name,
        value: w.address,
      };
    });
  }, [JSON.stringify(wallets)]);

  const handleChangeWallet = (value: any | undefined) => {
    setFilter((preFilter) => {
      return { ...preFilter, wallet: value };
    });
  };
  const handleChangeDates = (startDate: Date | undefined, endDate: Date | undefined) => {
    setFilter((preFilter) => {
      return { ...preFilter, start_date: startDate, end_date: endDate };
    });
  };

  const defaultRange = '30d';
  const { startDate: defaultStartDate, endDate: defaultEndDate } = primitivesUtils.getStartEndDateByRange(defaultRange);

  const [filter, setFilter] = React.useState<IWalletActivitiesFilters>({
    start_date: defaultStartDate,
    end_date: defaultEndDate,
    wallet: undefined,
  });

  const {
    data,
    loading: getUserWalletActivitiesLoading,
    error,
    trigger,
  } = useFetch(() => {
    return portfolioApi.getUserWalletActivities(
      {
        defaultErrorMessage: t('portfolio.dashboard.getWalletActivitiesError'),
      },
      filter,
    );
  }, [updatedSince, JSON.stringify(filter)]);

  return (
    <>
      <Grid container flexDirection="row" width="100%">
        <Grid item flex="1 1 100%">
          <Card>
            <CardContent sx={{ p: 0 }}>
              <Grid container justifyContent="space-between" alignItems="center" flexWrap="nowrap">
                <Grid item component={Typography} variant="overline" sx={{ pl: 3, pt: 1.5, pb: 0.8 }}>
                  {t('portfolio.dashboard.walletActivities')}
                </Grid>
                <Grid container item flexWrap="nowrap" flexBasis="fit-content" sx={{ mr: 2 }}>
                  <MultiSelect
                    label={t('portfolio.transHis.all')}
                    onChange={handleChangeWallet}
                    options={walletOption}
                    value={filter?.wallet}
                  />
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
                isLoading={getUserWalletActivitiesLoading || loading}
                error={error}
                defaultLoaderOptions={{ height: '80px', width: '100%' }}
              >
                {!data?.error && !noWallet ? (
                  <Grid container justifyContent="space-between" alignItems="center" flexWrap="nowrap">
                    <Grid container flexDirection="column" flex="fit-content" sx={{ ml: 3 }}>
                      <Grid
                        item
                        component={Typography}
                        variant="body1"
                        sx={{ mt: 2, fontSize: '18px', color: 'success.main' }}
                      >
                        {data?.currency} {primitivesUtils.convertCurrencyDisplay(data?.money_in_fiat || 0)}
                      </Grid>
                      <Grid item component={Typography} variant="caption" sx={{ mb: 2 }}>
                        Total money in
                      </Grid>
                    </Grid>
                    <Grid container flexDirection="column" flex="fit-content">
                      <Grid
                        item
                        component={Typography}
                        variant="body1"
                        sx={{ mt: 2, fontSize: '18px', color: 'secondary.main' }}
                      >
                        {data?.currency} {primitivesUtils.convertCurrencyDisplay(data?.money_out_fiat || 0)}
                      </Grid>
                      <Grid item component={Typography} variant="caption" sx={{ mb: 2 }}>
                        Total money out
                      </Grid>
                    </Grid>
                    <Grid container flexDirection="column" flex="fit-content">
                      <Grid item component={Typography} variant="body1" sx={{ mt: 2, fontSize: '18px' }}>
                        {data?.currency} {primitivesUtils.convertCurrencyDisplay(data?.total_wallet_value || 0)}
                      </Grid>
                      <Grid item component={Typography} variant="caption" sx={{ mb: 2 }}>
                        Total wallet value
                      </Grid>
                    </Grid>
                    {/*Hide PL untill backend apply the new formula */
                    /* <Grid container flexDirection="column" flex="fit-content">
                      <Grid item component={Typography} variant="body1" sx={{ mt: 2, fontSize: '18px' }}>
                        {data?.profit_and_loss}
                        {data?.profit_and_loss !== 'N/A' && <>%</>}
                      </Grid>
                      <Grid item component={Typography} variant="caption" sx={{ mb: 2 }}>
                        P/L
                      </Grid>
                    </Grid> */}
                  </Grid>
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
                      {t('portfolio.dashboard.noWalletActivitiesCtaText')}
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
              </DataDisplay>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};
