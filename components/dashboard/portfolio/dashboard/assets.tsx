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
  const handleChangeSorting = (value: boolean | undefined) => {
    setFilter((preFilter) => {
      return { ...preFilter, desc: value === undefined ? true : value };
    });
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
                <Grid container justifyContent="space-between">
                  <Box
                    sx={{
                      position: 'relative',
                      alignItems: 'center',
                      display: 'flex',
                      flexWrap: 'wrap',
                      py: 3,
                      px: 2,
                    }}
                  >
                    <SingleSelect
                      shouldShowClearButton
                      onChange={handleChangeWallet}
                      label={t('portfolio.dashboard.allWallets')}
                      value={filter?.wallet as string}
                      options={[
                        { value: 'MetamaskWallet', label: 'MetamaskWallet' },
                        { value: 'Trezor', label: 'Trezor' },
                      ]}
                    />
                    <SingleSelect
                      shouldShowClearButton
                      onChange={handleChangeWallet}
                      label={t('portfolio.dashboard.status')}
                      value={filter?.wallet as string}
                      options={[{ value: 'Completed', label: 'Completed' }]}
                    />
                    <SingleSelect
                      onChange={handleChangeSorting}
                      label={t('portfolio.dashboard.mostRecent')}
                      value={filter.desc}
                      options={[
                        { value: true, label: t('portfolio.dashboard.mostRecent') },
                        { value: false, label: t('portfolio.dashboard.mostRecent') },
                      ]}
                    />
                  </Box>
                </Grid>
                <Divider sx={{ m: 0, p: 0 }} />
                <Grid container flexWrap="nowrap" sx={{ p: 3 }}>
                  <Grid item flex="0 1 auto" component={AssetsChart}></Grid>
                  <Grid item component={Table} flex="1 1 auto">
                    <TableHead>
                      <TableRow>
                        <TableCell>
                          <Typography variant="overline">TOTAL</Typography>
                          <br />
                          <Typography variant="body2" display="inline-block" color="secondary.main">
                            {data?.total_bal_symbol}{' '}
                            {primitivesUtils.thousandSeparator(
                              primitivesUtils.roundDownToTwo(parseFloat(data?.total_bal as string)),
                            )}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="overline">BALANCE</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="overline">USD AMOUNT</Typography>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data?.items ||
                        [{ key: '123' }].map((item: any) => {
                          return (
                            <TableRow hover key="123">
                              <TableCell>Ethereum</TableCell>
                              <TableCell>63.52 ETH</TableCell>
                              <TableCell>USD 23,267,283.21</TableCell>
                            </TableRow>
                          );
                        })}
                    </TableBody>
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
