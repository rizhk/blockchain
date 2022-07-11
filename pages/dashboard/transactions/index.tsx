import { useState, useEffect, useCallback, MouseEvent, ChangeEvent } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import NextLink from 'next/link';
import { Box, Button, Card, Container, Grid, Typography } from '@mui/material';
import { transactionApi } from '../../../api/transaction-api';
import { AuthGuard } from '../../../components/authentication/auth-guard';
import { DashboardLayout } from '../../../components/dashboard/dashboard-layout';
import { ProjectListFilters } from '../../../components/dashboard/transaction/transaction-list-filters';
import type { Filters } from '../../../components/dashboard/transaction/transaction-list-filters';
import { TransactionListTable } from '../../../components/dashboard/transaction/transaction-list-table';
import { useMounted } from '../../../hooks/use-mounted';
import { Download as DownloadIcon } from '../../../icons/download';
import { Upload as UploadIcon } from '../../../icons/upload';
import { Plus as PlusIcon } from '../../../icons/plus';
import { gtm } from '../../../lib/gtm';
import type { Transaction } from '../../../types/transaction';

const applyFilters = (transactions: Transaction[], filters: Filters): Transaction[] =>
  transactions.filter((transaction) => {
    if (filters.name) {
      const nameMatched = transaction.wallet_id.toLowerCase().includes(filters.name.toLowerCase());

      if (!nameMatched) {
        return false;
      }
    }

    // It is possible to select multiple transactionType options
    if (filters.txn_type?.length > 0) {
      const transactionTypeMatched = filters.txn_type.includes(transaction.txn_type);

      if (!transactionTypeMatched) {
        return false;
      }
    }

    // It is possible to select multiple status options
    if (filters.status?.length > 0) {
      const statusMatched = filters.status.includes(transaction.status);

      if (!statusMatched) {
        return false;
      }
    }

    return true;
  });

const applyPagination = (transactions: Transaction[], page: number, rowsPerPage: number): Transaction[] =>
  transactions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

const TransactionList: NextPage = () => {
  const isMounted = useMounted();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [filters, setFilters] = useState<Filters>({
    name: undefined,
    txn_type: [],
    status: [],
  });

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  const getTransactions = useCallback(async () => {
    try {
      const data = await transactionApi.getTransactions();

      if (isMounted()) {
        setTransactions(data);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted]);

  useEffect(
    () => {
      getTransactions();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const handleFiltersChange = (filters: Filters): void => {
    setFilters(filters);
  };

  const handlePageChange = (event: MouseEvent<HTMLButtonElement> | null, newPage: number): void => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  // Usually query is done on backend with indexing solutions
  const filteredTransactions = applyFilters(transactions, filters);
  const paginatedTransactions = applyPagination(filteredTransactions, page, rowsPerPage);

  return (
    <>
      <Head>
        <title>Dashboard: Transaction List | {process.env.NEXT_PUBLIC_PAGE_TITLE_SUFFEX}</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          {/* <Box sx={{ mb: 4 }}>
						<Grid
							container
							justifyContent="space-between"
							spacing={3}>
							<Grid item>
								<Typography variant="h4">
									Transactions
								</Typography>
							</Grid>
							<Grid item>
								<NextLink
									href="/dashboard/transactions/new"
									passHref>
									<Button
										component="a"
										startIcon={
											<PlusIcon fontSize="small" />
										}
										variant="contained">
										Add
									</Button>
								</NextLink>
							</Grid>
						</Grid>
						<Box
							sx={{
								m: -1,
								mt: 3,
							}}>
							<Button
								startIcon={<UploadIcon fontSize="small" />}
								sx={{ m: 1 }}>
								Import
							</Button>
							<Button
								startIcon={<DownloadIcon fontSize="small" />}
								sx={{ m: 1 }}>
								Export
							</Button>
						</Box>
					</Box> */}
          <Card>
            <ProjectListFilters onChange={handleFiltersChange} />
            <TransactionListTable
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              page={page}
              setTransactions={setTransactions}
              transactions={paginatedTransactions}
              transactionsCount={filteredTransactions.length}
              rowsPerPage={rowsPerPage}
            />
          </Card>
        </Container>
      </Box>
    </>
  );
};

TransactionList.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default TransactionList;
