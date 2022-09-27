import { useCallback, useEffect, useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { AuthGuard } from '../../components/authentication/auth-guard';
import { DashboardLayout } from '../../components/dashboard/dashboard-layout';
import { gtm } from '../../lib/gtm';
import { useMounted } from 'hooks/use-mounted';
import { bankAccountApi } from 'api/bank-account-api';
import { BankAccount } from 'types/bank-account';
import { BankAccountList } from 'components/dashboard/market/bank-account/bank-account-list';
import { Box, Button, Container, Grid, Modal, Typography } from '@mui/material';
import { CreateBankAccountDialogs } from 'components/dashboard/market/bank-account/create-bank-account-modal';

const BankAccounts: NextPage = () => {
  const isMounted = useMounted();
  const [bankAccounts, setBankAccounts] = useState<bankAccount[]>([]);

  useEffect(() => {
    gtm.push({ event: 'page_view' });
    getBankAccounts();
  }, []);

  const getBankAccounts = useCallback(async () => {
    try {
      const data = await bankAccountApi.getItems();

      if (isMounted()) {
        setBankAccounts(data);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted]);

  const updateBankAccounts = (updateBankAccounts: any): void => {
    setBankAccounts(updateBankAccounts);
  };

  return (
    <>
      <Head>
        <title>Dashboard: BankAccounts | {process.env.NEXT_PUBLIC_PAGE_TITLE_SUFFEX}</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <BankAccountList bankAccounts={bankAccounts} parentCallback={updateBankAccounts} />
        <Container>
          <Grid container>
            <CreateBankAccountDialogs parentCallback={updateBankAccounts} />
          </Grid>
        </Container>
      </Box>
    </>
  );
};

BankAccounts.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default BankAccounts;
