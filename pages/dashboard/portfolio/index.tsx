import { useEffect, useMemo, useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import { AuthGuard } from '../../../components/authentication/auth-guard';
import { gtm } from '../../../lib/gtm';
import { TutorialDialog } from 'components/dashboard/tutorial-dialog';
import { useAuth } from 'hooks/use-auth';
import { useMounted } from 'hooks/use-mounted';
import { DashboardLayout } from 'components/dashboard/dashboard-layout';
import { useTranslation } from 'react-i18next';
import { RecentTransactions } from 'components/dashboard/portfolio/dashboard/recent-transactions';
import { MyWallets } from 'components/dashboard/portfolio/dashboard/my-wallets';
import { Assets } from 'components/dashboard/portfolio/dashboard/assets';
import { Refresh } from '@mui/icons-material';
import useFetch from 'hooks/use-fetch';
import { portfolioApi } from 'api/portfolio-api';
import { formatDistanceToNow } from 'date-fns';
import useMutation from 'hooks/use-mutation';
import { walletApi } from 'api/wallet-api';
import { primitivesUtils } from 'utils/primitives-utils';
import { useWalletData } from 'hooks/use-wallet-data';
import { WalletSync } from 'components/dashboard/portfolio/wallet/wallet-sync';
import { WalletActivities } from 'components/dashboard/portfolio/dashboard/wallet-activities';

const Portfolio: NextPage = () => {
  const isMounted = useMounted();
  const { t } = useTranslation();

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  const {
    walletsData,
    getAllWalletsIsLoading,
    requestWalletSyncIsLoading,
    getWalletSyncStatusIsLoading,
    getWalletSyncStatusData,
    requestWalletSync,
    updatedSince,
    requestWalletSyncError,
    getAllWalletsError,
    getWalletSyncStatusError,
    walletSyncStatus,
  } = useWalletData();

  return (
    <>
      <Head>
        <title>
          {t('portfolio.head')} | {process.env.NEXT_PUBLIC_PAGE_TITLE_SUFFEX}
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
                  {t('portfolio.dashboard.portfolioNetWorth')}
                  {primitivesUtils.convertFiatAmountDisplay(walletsData?.networth || 0)}
                </Typography>
              </Grid>
              <Grid
                containerProps={{ flexBasis: 'fit-content' }}
                container
                item
                justifyContent="flex-end"
                component={WalletSync}
                walletSyncStatus={walletSyncStatus}
                walletsData={walletsData}
                requestWalletSync={requestWalletSync}
                getWalletSyncStatusData={getWalletSyncStatusData}
                getWalletSyncStatusIsLoading={getWalletSyncStatusIsLoading}
                requestWalletSyncIsLoading={requestWalletSyncIsLoading}
                updatedSince={updatedSince}
                requestWalletSyncError={requestWalletSyncError}
                getWalletSyncStatusError={getWalletSyncStatusError}
              />
            </Grid>
          </Box>
          <Grid container spacing={3} flexWrap="nowrap">
            <Grid container item flexDirection="column" flex="1 1 65%">
              <WalletActivities
                updatedSince={updatedSince}
                loading={getAllWalletsIsLoading}
                noWallet={walletsData?.noWallet}
                wallets={walletsData?.wallet}
              />
              <Box sx={{ mb: 6 }}></Box>
              <Assets
                updatedSince={updatedSince}
                loading={getAllWalletsIsLoading}
                noWallet={walletsData?.noWallet}
                wallets={walletsData?.wallet}
              />
            </Grid>
            <Grid container item flexDirection="column" flex="1 1 35%">
              <MyWallets
                updatedSince={updatedSince}
                loading={getAllWalletsIsLoading}
                noWallet={walletsData?.noWallet}
              />
              <Box sx={{ mb: 6 }}></Box>
              <RecentTransactions
                updatedSince={updatedSince}
                loading={getAllWalletsIsLoading}
                noWallet={walletsData?.noWallet}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Portfolio.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default Portfolio;
