import { ChangeEvent, useEffect, useState } from 'react';
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
import { AccountCircle } from '@mui/icons-material';
import { ChevronDown as ChevronDownIcon } from 'icons/chevron-down';
import { relative } from 'path';
import ExportTransactionHistoryModal from 'components/dashboard/portfolio/transaction-history/export-transaction-history-modal';
import { DataDisplay } from 'components/common/data-display';

const TransactionHistoryPage: NextPage = () => {
  const isMounted = useMounted();
  const { t } = useTranslation();
  const [transactionHistory, setTransactionHistory] = useState<TransactionHistory[]>([]);
  const theme = useTheme();
  const { isExportTransactionHistoryShowing, toggleExportTransactionHistory } = useExportTransactionHistoryModal();
  const [filter, setFilter] = useState<ITransactionHistoryFilters>({});

  const { data, loading, error, trigger } = useFetch(() => {
    return portfolioApi.getAllTransactionHistory({
      defaultErrorMessage: t('portfolio.transHis.getTransactionsError'),
    });
  }, []);

  const handleChangeWallet = (value: any[]) => {
    setFilter((preFilter) => {
      return { ...preFilter, wallet: value };
    });
  };
  const handleChangeNewest = (value: any[]) => {
    setFilter((preFilter) => {
      return { ...preFilter, newest: value };
    });
  };
  const handleChangeFromDate = (newValue: Date | null) => {
    setFilter((preFilter) => {
      return { ...preFilter, fromDate: newValue };
    });
  };
  const handleChangeToDate = (newValue: Date | null) => {
    setFilter((preFilter) => {
      return { ...preFilter, fromDate: newValue };
    });
  };

  useEffect(() => {
    setTransactionHistory(data?.items || []);
  }, [JSON.stringify(data)]);

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
    // if (event.code === 'Enter' && queryValue) {
    //   const [queryValue, setQueryValue] = useState<string>('');
    // }
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
        {/* TODO: PP-349 FN - adding filter option*/}
        {/* <Box
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
              placeholder="Enter a keyword"
              value={queryValue}
            />
          </Box>
        </Box>
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
          <MultiSelect
            label="All Wallets"
            onChange={handleChangeWallet}
            options={[{ label: 'All wallets', value: 1 }]}
            value={[filter?.wallet]}
          />
          <MultiSelect
            label="Newest"
            onChange={handleChangeNewest}
            options={[{ label: 'Newest', value: 1 }]}
            value={[filter?.newest]}
          />
          <Box
            sx={{
              px: 1,
              '.MuiInputBase-root:not(.Mui-disabled):before, .MuiInputBase-root:not(.Mui-disabled):after, .MuiInputBase-root:hover:not(.Mui-disabled):before, .MuiInputBase-root:hover:not(.Mui-disabled):after':
                {
                  border: 'none',
                },
            }}
          >
            <Typography display="block" variant="body2" sx={{ position: 'absolute', top: '1rem', fontSize: '0.75rem' }}>
              {t('portfolio.transHis.from').toUpperCase()}
            </Typography>
            <DesktopDatePicker
              inputFormat="MM/dd/yyyy"
              value={filter?.fromDate}
              onChange={handleChangeFromDate}
              components={{
                OpenPickerIcon: ChevronDownIcon,
              }}
              renderInput={(params) => (
                <TextField
                  sx={{
                    '.MuiInputBase-input': {
                      width: '82px',
                      height: '20px',
                      fontWeight: ' 600',
                      fontSize: '14px',
                      lineHeight: '18px',
                      color: 'text.primary',
                    },
                  }}
                  variant="standard"
                  {...params}
                />
              )}
            />
          </Box>
          <Box
            sx={{
              px: 1,
              '.MuiInputBase-root:not(.Mui-disabled):before, .MuiInputBase-root:not(.Mui-disabled):after, .MuiInputBase-root:hover:not(.Mui-disabled):before, .MuiInputBase-root:hover:not(.Mui-disabled):after':
                {
                  border: 'none',
                },
            }}
          >
            <Typography display="block" variant="body2" sx={{ position: 'absolute', top: '1rem', fontSize: '0.75rem' }}>
              {t('portfolio.transHis.to').toUpperCase()}
            </Typography>
            <DesktopDatePicker
              inputFormat="MM/dd/yyyy"
              value={filter?.toDate}
              onChange={handleChangeToDate}
              components={{
                OpenPickerIcon: ChevronDownIcon,
              }}
              renderInput={(params) => (
                <TextField
                  sx={{
                    '.MuiInputBase-input': {
                      width: '82px',
                      height: '20px',
                      fontWeight: ' 600',
                      fontSize: '14px',
                      lineHeight: '18px',
                      color: 'text.primary',
                    },
                  }}
                  variant="standard"
                  {...params}
                />
              )}
            />
          </Box>
        </Box> */}
        <DataDisplay isLoading={loading} error={error} defaultLoaderOptions={{ height: '80vh', width: '100%' }}>
          <TransactionHistoryTable
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
