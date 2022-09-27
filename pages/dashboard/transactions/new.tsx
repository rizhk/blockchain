import { useEffect } from 'react';
import type { NextPage } from 'next';
import NextLink from 'next/link';
import Head from 'next/head';
import { Box, Breadcrumbs, Container, Link, Typography } from '@mui/material';
import { AuthGuard } from '../../../components/authentication/auth-guard';
import { DashboardLayout } from '../../../components/dashboard/dashboard-layout';
import { TransactionCreateForm } from '../../../components/dashboard/market/transaction/transaction-create-form';
import { gtm } from '../../../lib/gtm';

const TransactionCreate: NextPage = () => {
  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  return (
    <>
      <Head>
        <title>Dashboard: Transaction Create | {process.env.NEXT_PUBLIC_PAGE_TITLE_SUFFEX}</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="md">
          <Box sx={{ mb: 3 }}>
            <Typography variant="h4">Create a new transaction</Typography>
            <Breadcrumbs separator="/" sx={{ mt: 1 }}>
              <NextLink href="/dashboard" passHref>
                <Link variant="subtitle2">Dashboard</Link>
              </NextLink>
              <NextLink href="/dashboard" passHref>
                <Link color="primary" variant="subtitle2">
                  Management
                </Link>
              </NextLink>
              <Typography color="textSecondary" variant="subtitle2">
                Transactions
              </Typography>
            </Breadcrumbs>
          </Box>
          <TransactionCreateForm />
        </Container>
      </Box>
    </>
  );
};

TransactionCreate.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default TransactionCreate;
