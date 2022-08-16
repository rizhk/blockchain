import { useEffect, useState } from 'react';
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

  const { data } = useFetch(() => {
    return portfolioApi.getWalletSyncStatus({ defaultErrorMessage: t('portfolio.dashboard.getWalletSyncStatusError') });
  }, []);

  useEffect(() => {
    if (!data?.last_updated_at || data?.status?.toLowerCase() !== 'completed') return;
    console.log('Setting', data.last_updated_at);
    setLastUpdatedDt(new Date(data.last_updated_at));
  }, [JSON.stringify(data)]);

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

  let UpdateSyncStatus = undefined;
  if (!requestWalletSyncIsSuccess && requestWalletSyncError) UpdateSyncStatus = requestWalletSyncError;
  if (requestWalletSyncIsSuccess && requestWalletSyncData?.message) UpdateSyncStatus = requestWalletSyncData.message;

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
          <Grid container spacing={3} justifyContent="space-between" alignItems="center">
            <Grid item>
              {/* <Typography variant="h6">{t('portfolio.dashboard.porfolioNetWorth')}: 172,636,829 USD</Typography> */}
            </Grid>
            <Grid item>
              <Typography variant="caption2" sx={{ fontSize: '0.7rem', pr: 2 }}>
                {lastUpdatedDt
                  ? `${t('portfolio.dashboard.dataLastUpdated')} ${formatDistanceToNow(lastUpdatedDt)} ago`
                  : null}
              </Typography>{' '}
              <Typography
                onClick={handleUpdateData}
                variant="caption2"
                sx={[
                  !requestWalletSyncData?.message && { textDecoration: 'underline', cursor: 'pointer' },
                  !!requestWalletSyncData?.message && { pointerEvents: 'none' },
                  { color: 'primary.main' },
                ]}
              >
                {UpdateSyncStatus && !requestWalletSyncIsLoading
                  ? UpdateSyncStatus
                  : t('portfolio.dashboard.updateDataNow')}
              </Typography>{' '}
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
          <Grid container spacing={3} flexWrap="nowrap">
            <Grid container item flexDirection="column" flex="1 1 60%">
              {/* <Box sx={{ height: '400px', width: '400px' }}></Box> */}
              {/* <Box sx={{ mb: 6 }}></Box> */}
              <Assets lastUpdatedDt={lastUpdatedDt} />
            </Grid>
            <Grid container item flexDirection="column" flex="1 1 40%">
              <MyWallets lastUpdatedDt={lastUpdatedDt} />
              <Box sx={{ mb: 6 }}></Box>
              <RecentTransactions lastUpdatedDt={lastUpdatedDt} />
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
