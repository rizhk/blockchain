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

const Portfolio: NextPage = () => {
  const isMounted = useMounted();
  const { t } = useTranslation();

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

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
          <Grid container spacing={3} flexWrap="nowrap">
            <Grid container item flexDirection="column" flex="1 1 55%">
              {/* <Box sx={{ height: '400px', width: '400px' }}></Box> */}
              {/* <Box sx={{ mb: 6 }}></Box> */}
              <Assets />
            </Grid>
            <Grid container item flexDirection="column" flex="1 1 45%">
              <MyWallets />
              <Box sx={{ mb: 6 }}></Box>
              <RecentTransactions />
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
