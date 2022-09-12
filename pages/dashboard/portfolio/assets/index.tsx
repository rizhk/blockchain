import { ChangeEvent, createRef, useEffect, useMemo, useState } from 'react';
import type { KeyboardEvent } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import {
  Box,
  Button,
  Card,
  Container,
  Divider,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { DashboardLayout } from 'components/dashboard/dashboard-layout';
import { useTranslation } from 'react-i18next';
import { gtm } from 'lib/gtm';
import { AuthGuard } from 'components/authentication/auth-guard';
import { useClientPagination } from 'hooks/use-pagination';
import { build, sequence, fake, oneOf } from '@jackfranklin/test-data-bot';
import { MultiSelect } from 'components/multi-select';
import { Search as SearchIcon } from 'icons/search';
import useFetch from 'hooks/use-fetch';
import { portfolioApi } from 'api/portfolio-api';
import { DesktopDatePicker, MobileDatePicker } from '@mui/x-date-pickers';
import { AccountCircle, Clear } from '@mui/icons-material';
import { ChevronDown as ChevronDownIcon } from 'icons/chevron-down';
import { relative } from 'path';
import { DataDisplay } from 'components/common/data-display';
import { SingleSelect } from 'components/single-select';
import { DatePicker } from 'components/common/date-picker';
import { primitivesUtils } from 'utils/primitives-utils';
import { AssetsTable } from 'components/dashboard/portfolio/assets/assets-table';
import { useWalletData } from 'hooks/use-wallet-data';
import React from 'react';
import { IAssetsFilters } from 'types/portfolio';

const AssetsPage: NextPage = () => {
  const { t } = useTranslation();

  const { walletsData, getAllWalletsIsLoading } = useWalletData();

  const [filter, setFilter] = React.useState<IAssetsFilters>();

  const walletOption = useMemo(() => {
    if (!walletsData?.wallet) return [];
    return walletsData?.wallet.map((w) => {
      return {
        label: w.name,
        value: w.id,
      };
    });
  }, [JSON.stringify(walletsData?.wallet)]);

  const handleChangeWallet = (value: any | undefined) => {
    setFilter((preFilter) => {
      return { ...preFilter, wallet: value };
    });
  };

  const {
    data,
    loading: getUserAssetsLoading,
    error,
    trigger,
  } = useFetch(() => {
    return portfolioApi.getUserAssets(
      {
        defaultErrorMessage: t('portfolio.assets.getAssetsError'),
      },
      filter,
    );
  }, [JSON.stringify(filter)]);

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  const { currentData, count, onPageChange, onRowsPerPageChange, page, rowsPerPage } = useClientPagination(
    data?.items || [],
  );

  return (
    <>
      <Head>
        <title>
          {t('portfolio.assets.head')} | {process.env.NEXT_PUBLIC_PAGE_TITLE_SUFFEX}
        </title>
      </Head>

      <Box
        component="main"
        sx={{
          py: 6,
        }}
      >
        <Container maxWidth="xl">
          <Box sx={{ mb: 2 }}>
            <Grid container justifyContent="space-between" spacing={3} flexWrap="nowrap">
              <Grid item minWidth="fit-content">
                <Typography variant="h6" className="pageTitle">
                  {t('portfolio.assets.head')}
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ pt: 3 }}>
            <Card sx={{ mx: 0 }}>
              <DataDisplay
                isLoading={getUserAssetsLoading || getAllWalletsIsLoading}
                error={error}
                defaultLoaderOptions={{ height: '80vh', width: '100%' }}
              >
                <AssetsTable
                  noWallet={walletsData?.noWallet}
                  assets={currentData}
                  count={count}
                  onPageChange={onPageChange}
                  onRowsPerPageChange={onRowsPerPageChange}
                  page={page}
                  rowsPerPage={rowsPerPage}
                />
              </DataDisplay>
            </Card>
          </Box>
        </Container>
      </Box>

      <Card sx={{ mx: 4, mb: 3 }}>
        <Box
          sx={{
            justifyContent: 'flex-end',
            display: 'flex',
            p: 2,
          }}
        >
          <MultiSelect
            label={t('common.options.allWallets')}
            onChange={handleChangeWallet}
            options={walletOption}
            value={filter?.wallet}
          />
        </Box>
        <DataDisplay
          isLoading={getUserAssetsLoading || getAllWalletsIsLoading}
          error={error}
          defaultLoaderOptions={{ height: '80vh', width: '100%' }}
        >
          <AssetsTable
            noWallet={walletsData?.noWallet}
            assets={currentData}
            count={count}
            onPageChange={onPageChange}
            onRowsPerPageChange={onRowsPerPageChange}
            page={page}
            rowsPerPage={rowsPerPage}
          />
        </DataDisplay>
      </Card>
    </>
  );
};

AssetsPage.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default AssetsPage;
