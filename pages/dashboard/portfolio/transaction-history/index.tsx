import { ChangeEvent, useEffect, useState } from 'react';
import type { KeyboardEvent } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Box, Button, Card, Container, Divider, Grid, Input, Typography, useTheme } from '@mui/material';
import { TutorialDialog } from 'components/dashboard/tutorial-dialog';
import { useAuth } from 'hooks/use-auth';
import { useMounted } from 'hooks/use-mounted';
import { DashboardLayout } from 'components/dashboard/dashboard-layout';
import { useTranslation } from 'react-i18next';
import { gtm } from 'lib/gtm';
import { AuthGuard } from 'components/authentication/auth-guard';
import { TransactionHistoryTable } from 'components/dashboard/portfolio/transaction-history/transaction-history-table';
import { useClientPagination } from 'hooks/use-pagination';
import { build, sequence, fake, oneOf } from '@jackfranklin/test-data-bot';
import { TransactionHistory } from 'types/transaction-history';
import { MultiSelect } from 'components/multi-select';
import { Search as SearchIcon } from 'icons/search';
import ExportTransactionHistoryModal from 'components/dashboard/portfolio/transaction-history/export-transaction-history-modal';
import { useExportTransactionHistoryModal } from 'hooks/use-portfolio-modal';
import useFetch from 'hooks/use-fetch';
import { portfolioApi } from 'api/portfolio-api';

const TransactionHistoryPage: NextPage = () => {
  const isMounted = useMounted();
  const { t } = useTranslation();
  const [transactionHistory, setTransactionHistory] = useState<TransactionHistory[]>([]);
  const theme = useTheme();
  const { isExportTransactionHistoryShowing, toggleExportTransactionHistory } = useExportTransactionHistoryModal();

  const { data, loading, error } = useFetch(() => {
    return portfolioApi.getAllTransactionHistory({
      defaultErrorMessage: t('overview.xRateError'),
    });
  }, []);

  useEffect(() => {
    if (isMounted()) {
      const transactionHistoryBuilder = build<TransactionHistory>('TransactionHistory', {
        fields: {
          id: sequence((x) => `${x}`),
          data_type: oneOf('Incoming', 'Outgoing'),
          details: fake((f) => f.name.findName()),
          from_wallet_name: fake((f) => f.name.findName()),
          from_wallet_id: fake((f) => f.datatype.uuid()),
          to_wallet_name: fake((f) => f.name.findName()),
          to_wallet_id: fake((f) => f.datatype.uuid()),
          txn_date: fake((f) => f.date.past()),
          token: 'ETH',
          token_amt: fake((f) => f.finance.amount()),
          fiat: 'USD',
          fiat_amt: fake((f) => f.name.findName()),
          fees_token_amt: fake((f) => f.finance.amount()),
          fees_fiat_amt: fake((f) => f.finance.amount()),
          total_token_amt: fake((f) => f.finance.amount()),
          total_fiat_amt: fake((f) => f.finance.amount()),
          notes: fake((f) => f.lorem.paragraph()),
          created_at: fake((f) => f.name.findName()),
          updated_at: fake((f) => f.name.findName()),
        },
      });
      const data: TransactionHistory[] = [];
      data.push(transactionHistoryBuilder());
      data.push(transactionHistoryBuilder());
      data.push(transactionHistoryBuilder());
      data.push(transactionHistoryBuilder());
      data.push(transactionHistoryBuilder());
      data.push(transactionHistoryBuilder());
      data.push(transactionHistoryBuilder());
      data.push(transactionHistoryBuilder());
      data.push(transactionHistoryBuilder());
      data.push(transactionHistoryBuilder());
      data.push(transactionHistoryBuilder());
      data.push(transactionHistoryBuilder());
      data.push(transactionHistoryBuilder());
      data.push(transactionHistoryBuilder());
      data.push(transactionHistoryBuilder());
      data.push(transactionHistoryBuilder());
      data.push(transactionHistoryBuilder());
      data.push(transactionHistoryBuilder());
      setTransactionHistory(data);
    }
  }, [isMounted]);

  const { currentData, count, onPageChange, onRowsPerPageChange, page, rowsPerPage } =
    useClientPagination(transactionHistory);

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  const [queryValue, setQueryValue] = useState<string>('');

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setQueryValue(event.target.value);
  };

  const handleQueryKeyup = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.code === 'Enter' && queryValue) {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [queryValue, setQueryValue] = useState<string>('');
    }
  };

  return (
    <>
      <ExportTransactionHistoryModal
        isShowing={isExportTransactionHistoryShowing}
        hide={toggleExportTransactionHistory}
      />
      <Head>
        <title>
          {t('portfolio.transHis.head')} | {process.env.NEXT_PUBLIC_PAGE_TITLE_SUFFEX}
        </title>
      </Head>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Box sx={{ mb: 4 }}>
            <Grid container justifyContent="space-between" spacing={3}>
              <Grid item>
                <Typography variant="h4">{t('portfolio.transHis.head')}</Typography>
              </Grid>
              <Grid
                item
                sx={{
                  alignItems: 'center',
                  display: 'flex',
                  flexWrap: 'wrap',
                  m: -1,
                }}
              >
                <Button
                  sx={{
                    px: 3,
                    py: 2,
                    mx: 2,
                  }}
                  color="info"
                  variant="contained"
                  onClick={() => toggleExportTransactionHistory()}
                >
                  {t('portfolio.transHis.exportData')}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
      {/* <Card sx={{ mx: 3, mb: 3 }}>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            p: 1.5,
          }}
        >
          <SearchIcon fontSize="small" />
          <Box
            sx={{
              flexGrow: 1,
              ml: 3,
            }}
          >
            <Input
              disableUnderline
              fullWidth
              onChange={handleQueryChange}
              onKeyUp={handleQueryKeyup}
              placeholder="Enter a keyword"
              value={queryValue}
            />
          </Box>
        </Box>
        <Divider />
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexWrap: 'wrap',
            p: 1,
          }}
        >
          <MultiSelect label="Wallet" onChange={undefined} options={[{ label: 'All wallets', value: 1 }]} value={[1]} />
          <MultiSelect label="Newest" onChange={undefined} options={[{ label: 'Newest', value: 1 }]} value={[1]} />
        </Box>
        <TransactionHistoryTable
          transactionHistory={currentData}
          count={count}
          onPageChange={onPageChange}
          onRowsPerPageChange={onRowsPerPageChange}
          page={page}
          rowsPerPage={rowsPerPage}
        />
      </Card> */}
    </>
  );
};

TransactionHistoryPage.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default TransactionHistoryPage;
