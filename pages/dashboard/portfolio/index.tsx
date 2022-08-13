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

const Portfolio: NextPage = () => {
  const isMounted = useMounted();
  const { t } = useTranslation();

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  const [lastUpdatedDt, setLastUpdatedDt] = useState(new Date());
  const handleUpdateData = () => {
    setLastUpdatedDt(new Date());
  };

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
              <Typography variant="h6">{t('portfolio.dashboard.porfolioNetWorth')}: 172,636,829 USD</Typography>
            </Grid>
            <Grid item>
              <Typography variant="caption2" sx={{ fontSize: '0.7rem', pr: 2 }}>
                {t('portfolio.dashboard.dataLastUpdated')} 52 seconds ago
              </Typography>{' '}
              <Typography
                onClick={handleUpdateData}
                variant="caption2"
                sx={{ color: 'primary.main', textDecoration: 'underline', cursor: 'pointer' }}
              >
                {t('portfolio.dashboard.updateDataNow')}
              </Typography>{' '}
              <Typography
                onClick={handleUpdateData}
                variant="caption2"
                sx={{ color: 'primary.main', cursor: 'pointer', verticalAlign: 'bottom' }}
              >
                <Refresh sx={{ fontSize: '0.75rem' }} />
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
