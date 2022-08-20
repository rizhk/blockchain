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

const Portfolio: NextPage = () => {
  const isMounted = useMounted();
  const { t } = useTranslation();

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  const [lastUpdatedDt, setLastUpdatedDt] = useState<Date>();
  const handleUpdateData = () => {
    requestWalletSync({});
  };

  const {
    mutate: requestWalletSync,
    data: requestWalletSyncData,
    error: requestWalletSyncError,
    isSuccess: requestWalletSyncIsSuccess,
    loading: requestWalletSyncIsLoading,
  } = useMutation(() => {
    return portfolioApi.requestWalletSync({
      defaultErrorMessage: t('portfolio.dashboard.requestWalletSyncError'),
    });
  });

  const { data: getWalletSyncStatusData } = useFetch(() => {
    return portfolioApi.getWalletSyncStatus({ defaultErrorMessage: t('portfolio.dashboard.getWalletSyncStatusError') });
  }, [JSON.stringify(requestWalletSyncData)]);

  useEffect(() => {
    if (!getWalletSyncStatusData?.last_updated_at || getWalletSyncStatusData?.status?.toLowerCase() !== 'completed')
      return;
    console.log('Setting', getWalletSyncStatusData.last_updated_at);
    setLastUpdatedDt(new Date(getWalletSyncStatusData.last_updated_at));
  }, [JSON.stringify(getWalletSyncStatusData)]);

  const { data: getAllWalletsData, loading: getAllWalletsLoading } = useFetch(() => {
    return portfolioApi.getAllWallets({ defaultErrorMessage: t('portfolio.dashboard.getNetWorthError') });
  }, []);

  const wallet = useMemo(() => {
    if (!getAllWalletsData?.items?.length || getAllWalletsData?.items?.length === 0) return { noWallet: true };
    const networth = getAllWalletsData?.items.reduce((sum, wallet) => {
      return parseFloat(wallet?.fiat_value || '0') + sum;
    }, 0);
    return { noWallet: false, networth };
  }, [JSON.stringify(getAllWalletsData)]);

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
          flexGrow: 1,
          py: 6,
        }}
      >
        <Container maxWidth="xl">
          {!wallet?.noWallet && (
            <Grid container spacing={3} justifyContent="space-between" alignItems="center">
              <Grid item>
                <Typography variant="h6">
                  {t('portfolio.dashboard.porfolioNetWorth')}:{' '}
                  {primitivesUtils.convertCurrencyDisplay(wallet?.networth || 0)} USD
                </Typography>
              </Grid>
              <Grid item>
                {getWalletSyncStatusData?.status?.toUpperCase() === 'IN_PROGRESS' && (
                  <Typography variant="caption2" sx={[{ color: 'primary.main', pr: 0.5 }]}>
                    {t('portfolio.dashboard.fetchingLatestData')}
                  </Typography>
                )}
                {getWalletSyncStatusData?.status?.toUpperCase() === 'COMPLETED' && (
                  <>
                    <Typography variant="caption2" sx={{ fontSize: '0.7rem', pr: 2 }}>
                      {lastUpdatedDt
                        ? `${t('portfolio.dashboard.dataLastUpdated')} ${formatDistanceToNow(lastUpdatedDt)} ago`
                        : null}
                    </Typography>
                    <Typography
                      onClick={handleUpdateData}
                      variant="caption2"
                      sx={[{ textDecoration: 'underline', cursor: 'pointer', color: 'primary.main', pr: 0.5 }]}
                    >
                      {t('portfolio.dashboard.updateDataNow')}
                    </Typography>
                  </>
                )}
                <Typography
                  onClick={handleUpdateData}
                  variant="caption2"
                  sx={{ color: 'primary.main', cursor: 'pointer', verticalAlign: 'bottom' }}
                >
                  <Refresh
                    sx={[
                      { fontSize: '0.75rem' },
                      requestWalletSyncIsLoading && {
                        animation: 'spin 0.5s linear infinite',
                        '@keyframes spin': {
                          '0%': {
                            transform: 'rotate(0deg)',
                          },
                          '100%': {
                            transform: 'rotate(360deg)',
                          },
                        },
                      },
                    ]}
                  />
                </Typography>
              </Grid>
            </Grid>
          )}
          <Grid container spacing={3} flexWrap="nowrap">
            <Grid container item flexDirection="column" flex="1 1 65%">
              {/* <Box sx={{ height: '400px', width: '400px' }}></Box> */}
              {/* <Box sx={{ mb: 6 }}></Box> */}
              <Assets lastUpdatedDt={lastUpdatedDt} loading={getAllWalletsLoading} noWallet={wallet?.noWallet} />
            </Grid>
            <Grid container item flexDirection="column" flex="1 1 35%">
              <MyWallets lastUpdatedDt={lastUpdatedDt} loading={getAllWalletsLoading} noWallet={wallet?.noWallet} />
              <Box sx={{ mb: 6 }}></Box>
              <RecentTransactions
                lastUpdatedDt={lastUpdatedDt}
                loading={getAllWalletsLoading}
                noWallet={wallet?.noWallet}
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
