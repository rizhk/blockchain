import { ChangeEvent, createRef, useEffect, useState } from 'react';
import type { KeyboardEvent } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import {
  Box,
  Button,
  Card,
  Container,
  Divider,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
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
import { MultiSelect } from 'components/multi-select';
import { Search as SearchIcon } from 'icons/search';
import { useExportTransactionHistoryModal } from 'hooks/use-portfolio-modal';
import useFetch from 'hooks/use-fetch';
import { portfolioApi } from 'api/portfolio-api';
import { DesktopDatePicker, MobileDatePicker } from '@mui/x-date-pickers';
import { ITransactionHistoryFilters, TransactionHistory } from 'types/portfolio';
import { AccountCircle, Clear } from '@mui/icons-material';
import { ChevronDown as ChevronDownIcon } from 'icons/chevron-down';
import { relative } from 'path';
import ExportTransactionHistoryModal from 'components/dashboard/portfolio/transaction-history/export-transaction-history-modal';
import { DataDisplay } from 'components/common/data-display';
import { SingleSelect } from 'components/single-select';
import { DatePicker } from 'components/common/date-picker';
import { primitivesUtils } from 'utils/primitives-utils';

const TransactionHistoryPage: NextPage = () => {
  const isMounted = useMounted();
  const { t } = useTranslation();
  const [transactionHistory, setTransactionHistory] = useState<{ items: TransactionHistory[]; shouldRefresh: boolean }>(
    { items: [], shouldRefresh: true },
  );
  const theme = useTheme();
  const { isExportTransactionHistoryShowing, toggleExportTransactionHistory } = useExportTransactionHistoryModal();
  const [filter, setFilter] = useState<ITransactionHistoryFilters>({
    sort: 'DESC',
    start_date: undefined,
    end_date: undefined,
    keyword: undefined,
  });

  const { data, loading, error, trigger } = useFetch(() => {
    return portfolioApi.getAllTransactionHistory(
      {
        defaultErrorMessage: t('portfolio.transHis.getTransactionsError'),
      },
      filter,
    );
  }, [JSON.stringify(filter)]);

  const handleChangeWallet = (value: any | undefined) => {
    setFilter((preFilter) => {
      return { ...preFilter, wallet: value };
    });
  };
  const handleChangeNewest = (value: any | undefined) => {
    setFilter((preFilter) => {
      return { ...preFilter, sort: value };
    });
  };
  const handleChangeFromDate = (newValue: Date) => {
    setFilter((preFilter) => {
      return { ...preFilter, start_date: newValue };
    });
  };
  const handleChangeToDate = (newValue: Date) => {
    setFilter((preFilter) => {
      return { ...preFilter, end_date: newValue };
    });
  };
  const [open, setOpen] = useState(false);

  const [wallets, setWallets] = useState([]);

  useEffect(() => {
    setTransactionHistory({ shouldRefresh: true, items: data?.items || [] });

    const getWallets = async () => {
      const walletResult = await portfolioApi.getAllWallets({
        defaultErrorMessage: t('portfolio.transHis.getWalletsError'),
      });

      setWallets(
        walletResult?.items.map((w) => {
          return {
            label: w.name,
            value: w.address,
          };
        }) ?? [],
      );
    };

    getWallets();
  }, [JSON.stringify(data)]);

  const setTransactionHistoryTag = (txnId: string, tag_name: string) => {
    setTransactionHistory((previous) => {
      const { items, shouldRefresh } = previous;
      const { item, index } = primitivesUtils.getItemInArrayByKey(items, 'id', txnId);
      if (item === undefined || index === undefined) return previous;
      const updatedItem = { ...item, tag_name };
      return { shouldRefresh: false, items: primitivesUtils.replaceItemInArrayByIndex(items, index, updatedItem) };
    });
  };

  const setTransactionHistoryNote = (txnId: string, note: string) => {
    setTransactionHistory((previous) => {
      const { items, shouldRefresh } = previous;
      const { item, index } = primitivesUtils.getItemInArrayByKey(items, 'id', txnId);
      if (item === undefined || index === undefined) return previous;
      const updatedItem = { ...item, note };
      return { shouldRefresh: false, items: primitivesUtils.replaceItemInArrayByIndex(items, index, updatedItem) };
    });
  };

  const { currentData, count, onPageChange, onRowsPerPageChange, page, rowsPerPage } = useClientPagination(
    transactionHistory.items,
    transactionHistory.shouldRefresh,
  );

  useEffect(() => {
    gtm.push({ event: 'page_view' });
  }, []);

  const [queryValue, setQueryValue] = useState<string>('');

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setQueryValue(event.target.value);
    if (event.target.value.length >= 3) {
      setFilter((preFilter) => {
        return { ...preFilter, keyword: event.target.value };
      });
    }
  };

  const handleQueryKeyup = (event: KeyboardEvent<HTMLInputElement>): void => {
    setQueryValue(queryValue);
    if (event.code === 'Enter') {
      setFilter((preFilter) => {
        return { ...preFilter, keyword: queryValue };
      });
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
          pt: 8,
          pb: 4,
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
                    py: 1.5,
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
      <Card sx={{ mx: 3, mb: 3 }}>
        {
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
                sx={{ 'input::placeholder': { fontSize: '0.875rem', fontWeight: 400, lineHeight: 1.57 } }}
                disableUnderline
                fullWidth
                onChange={handleQueryChange}
                onKeyUp={handleQueryKeyup}
                placeholder="Search by wallet address or note"
                value={queryValue}
              />
            </Box>
          </Box>
        }
        <Divider />
        <Box
          sx={{
            position: 'relative',
            alignItems: 'center',
            display: 'flex',
            flexWrap: 'wrap',
            py: 3,
            px: 1,
          }}
        >
          {/* <SingleSelect<string>
            shouldShowClearButton
            onChange={handleChangeWallet}
            label="All Wallets"
            value={filter?.wallet}
            options={uniqueWalletOptions}
          /> */}
          <MultiSelect
            label="All Wallets"
            onChange={handleChangeWallet}
            options={wallets}
            value={filter?.wallet ?? []}
          />
          <SingleSelect<string>
            onChange={handleChangeNewest}
            label="Newest"
            value={filter?.sort}
            options={[
              { label: 'Newest', value: 'DESC' },
              { label: 'Oldest', value: 'ASC' },
            ]}
          />
          <DatePicker
            label={t('portfolio.transHis.from').toUpperCase()}
            value={filter?.start_date}
            handleDateChange={handleChangeFromDate}
            handleClear={() => {
              setFilter((preFilter) => {
                return { ...preFilter, start_date: undefined };
              });
            }}
          />
          <DatePicker
            label={t('portfolio.transHis.to').toUpperCase()}
            value={filter?.end_date}
            handleDateChange={handleChangeToDate}
            handleClear={() => {
              setFilter((preFilter) => {
                return { ...preFilter, end_date: undefined };
              });
            }}
          />
        </Box>
        <DataDisplay isLoading={loading} error={error} defaultLoaderOptions={{ height: '80vh', width: '100%' }}>
          <TransactionHistoryTable
            setTransactionHistoryTag={setTransactionHistoryTag}
            setTransactionHistoryNote={setTransactionHistoryNote}
            getTransactionHistory={() => trigger()}
            transactionHistory={currentData}
            count={count}
            onPageChange={onPageChange}
            onRowsPerPageChange={onRowsPerPageChange}
            page={page}
            rowsPerPage={rowsPerPage}
          />
        </DataDisplay>
      </Card>
    </>
  );
};

TransactionHistoryPage.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default TransactionHistoryPage;
