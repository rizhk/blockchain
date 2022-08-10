import { useCallback, useEffect, useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { AuthGuard } from 'components/authentication/auth-guard';
import { DashboardLayout } from 'components/dashboard/dashboard-layout';
import { gtm } from 'lib/gtm';
import { useMounted } from 'hooks/use-mounted';
import { walletApi } from 'api/portfolio/wallet-api';
import { Wallet } from 'types/portfolio/wallet';
import { WalletList, ListAction } from 'components/dashboard/portfolio/wallet/wallet-list';
import { Alert, Box, Button, Collapse, Container, Grid, Modal, Typography } from '@mui/material';
import { AddWalletDialog } from 'components/dashboard/portfolio/wallet/add-wallet-modal';
import { useTranslation } from 'react-i18next';

const listActionAlertTranslationKey = (action: ListAction) => {
  switch (action) {
    case ListAction.ADD:
      return 'portfolio.walletList.addSuccess';
    case ListAction.EDIT:
      return 'portfolio.walletList.editSuccess';
    case ListAction.DELETE:
      return 'portfolio.walletList.deleteSuccess';
  }
};

const Wallets: NextPage = () => {
  const isMounted = useMounted();
  const { t } = useTranslation();

  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [open, setOpen] = useState(false);
  const [recentAction, setRecentAction] = useState<ListAction>();

  useEffect(() => {
    gtm.push({ event: 'page_view' });
    getWallets();
  }, []);

  const getWallets = useCallback(async () => {
    try {
      const data = await walletApi.getItems();

      if (isMounted()) {
        setWallets(data);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted]);

  const updateWallets = (updateWallets: any, action: ListAction = ListAction.EDIT): void => {
    setRecentAction(action);
    setOpen(true);
    setWallets(updateWallets);
    setTimeout(() => {
      setOpen(false);
    }, 3000);
  };

  return (
    <>
      <Head>
        <title>Portfolio: Wallets | {process.env.NEXT_PUBLIC_PAGE_TITLE_SUFFEX}</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 4,
        }}
      >
        <Collapse in={open && recentAction != null}>
          <Alert icon={false} severity="success">
            {t(listActionAlertTranslationKey(recentAction!))}
          </Alert>
        </Collapse>
        <Box sx={{ py: 4 }}>
          <WalletList wallets={wallets} walletsCount={wallets?.length | 0} parentCallback={updateWallets} />
        </Box>
        <Container>
          <Grid container>
            <AddWalletDialog parentCallback={updateWallets} />
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Wallets.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default Wallets;
