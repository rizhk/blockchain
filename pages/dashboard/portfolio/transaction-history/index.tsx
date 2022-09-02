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
import { WalletSync } from 'components/dashboard/portfolio/wallet/wallet-sync';
import { useWalletData } from 'hooks/use-wallet-data';

const TransactionHistoryPage: NextPage = () => {
  const isMounted = useMounted();
  const { t } = useTranslation();

  const {
    walletsData,
    getAllWalletsIsLoading,
    requestWalletSyncIsLoading,
    getWalletSyncStatusIsLoading,
    getWalletSyncStatusData,
    requestWalletSync,
    updatedSince,
    requestWalletSyncError,
    getAllWalletsError,
    getWalletSyncStatusError,
    walletSyncStatus,
  } = useWalletData();

  const [transactionHistory, setTransactionHistory] = useState<{ items: TransactionHistory[]; shouldRefresh: boolean }>(
    { items: [], shouldRefresh: true },
  );
  const [wallets, setWallets] = useState<{ label: string; value: string }[]>([]);

  const [tags, setTags] = useState<{ label: string; value: string }[]>([]);

  const theme = useTheme();
  const { isExportTransactionHistoryShowing, toggleExportTransactionHistory } = useExportTransactionHistoryModal();
  const [filter, setFilter] = useState<ITransactionHistoryFilters>({
    sort: 'DESC',
    start_date: undefined,
    end_date: undefined,
    keyword: undefined,
    tag: [],
    wallet: [],
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
  const handleChangeFromDate = (newValue?: Date) => {
    setFilter((preFilter) => {
      return { ...preFilter, start_date: newValue };
    });
  };
  const handleChangeToDate = (newValue?: Date) => {
    setFilter((preFilter) => {
      return { ...preFilter, end_date: newValue };
    });
  };
  const handleChangeTag = (value: any | undefined) => {
    setFilter((preFilter) => {
      return { ...preFilter, tag: value };
    });
  };
  const handleChangeType = (value: any | undefined) => {
    setFilter((preFilter) => {
      return { ...preFilter, type: value };
    });
  };
  const handleChangeStatus = (value: any | undefined) => {
    setFilter((preFilter) => {
      return { ...preFilter, status: value };
    });
  };

  const getWallets = async () => {
    const walletResult = await portfolioApi.getAllWallets({
      defaultErrorMessage: t('portfolio.transHis.getWalletsError'),
    });

    setWallets(
      walletResult?.items?.map((w) => {
        return {
          label: w.name,
          value: w.address,
        };
      }) ?? [],
    );
  };

  const getTags = async () => {
    const result = await portfolioApi.getUserTags({ defaultErrorMessage: t('portfolio.transHis.getUserTagsError') });

    setTags(
      result?.items.map((r) => {
        return {
          label: r.name,
          value: r.id,
        };
      }) ?? [],
    );
  };

  useEffect(() => {
    setTransactionHistory({ shouldRefresh: true, items: data?.items || [] });
    getWallets();
    getTags();
  }, [JSON.stringify(data)]);

  const setTransactionHistoryTag = (txnId: string, tag_name: string) => {
    getTags();
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

  const [range, setRange] = useState<string>();

  const handleChangeRange = (value: any | undefined) => {
    setRange(value);
    let date = new Date();

    if (!value) {
      handleChangeFromDate(undefined);
      handleChangeToDate(undefined);

      return;
    }

    if (value == '30d') {
      date.setDate(date.getDate() - 30);
      handleChangeFromDate(date);
    }
    if (value == '60d') {
      date.setDate(date.getDate() - 60);
      handleChangeFromDate(date);
    }
    if (value == '90d') {
      date.setDate(date.getDate() - 90);
      handleChangeFromDate(date);
    }
    if (value == '6m') {
      date.setMonth(date.getMonth() - 6);
      handleChangeFromDate(date);
    }
    if (value == '1y') {
      date.setFullYear(date.getFullYear() - 1);
      handleChangeFromDate(date);
    }

    handleChangeToDate(new Date());
  };

  const [tagOption, setTagOption] = useState<string>('all');

  const handleChangeTagOption = (value: string) => {
    setTagOption(value);

    if (value == 'all') {
      handleChangeTag(null);
    }
    if (value == 'tagged') {
      handleChangeTag(tags.map((t) => t.value));
    }
    if (value == 'untagged') {
      handleChangeTag([]);
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
          pt: 4,
          pb: 4,
        }}
      >
        {!walletsData?.noWallet && count > 0 && walletSyncStatus.isInProgress && (
          <Grid sx={{ px: 3, py: 2, mb: 4, color: 'primary.main', backgroundColor: 'rgba(80, 72, 229, 0.1)' }}>
            <Typography variant="body1">{t('portfolio.transHis.dataSyncInProgress')}</Typography>
          </Grid>
        )}
        <Container maxWidth="xl">
          <Box sx={{ mb: 4 }}>
            <Grid container justifyContent="space-between" spacing={3} flexWrap="nowrap">
              <Grid item component={Typography} minWidth="fit-content" variant="h4">
                {t('portfolio.transHis.head')}
              </Grid>
              <Grid flex="0 0 fit-content" container item flexWrap="nowrap" alignItems="center">
                <Grid
                  container
                  item
                  justifyContent="flex-end"
                  component={WalletSync}
                  walletSyncStatus={walletSyncStatus}
                  walletsData={walletsData}
                  requestWalletSync={requestWalletSync}
                  getWalletSyncStatusData={getWalletSyncStatusData}
                  getWalletSyncStatusIsLoading={getWalletSyncStatusIsLoading}
                  requestWalletSyncIsLoading={requestWalletSyncIsLoading}
                  updatedSince={updatedSince}
                  requestWalletSyncError={requestWalletSyncError}
                  getWalletSyncStatusError={getWalletSyncStatusError}
                />
                <Grid item minWidth="fit-content">
                  <Button
                    sx={{ ml: 2 }}
                    color="info"
                    variant="contained"
                    onClick={() => toggleExportTransactionHistory()}
                  >
                    {t('portfolio.transHis.exportData')}
                  </Button>
                </Grid>
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
                placeholder={t('portfolio.transHis.search')}
                value={queryValue}
              />
            </Box>
          </Box>
        }
        <Divider />
        <Box
          sx={{
            alignItems: 'center',
            justifyContent: 'space-between',
            display: 'flex',
            pr: 4,
          }}
        >
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
              label={t('portfolio.transHis.all')}
              onChange={handleChangeWallet}
              options={wallets}
              value={filter?.wallet}
            />
            <SingleSelect<string>
              onChange={handleChangeType}
              label={t('portfolio.transHis.types')}
              value={filter?.type}
              options={[
                { label: t('portfolio.transHis.incoming'), value: 'in' },
                { label: t('portfolio.transHis.outgoing'), value: 'out' },
              ]}
            />
            <SingleSelect<string>
              onChange={handleChangeStatus}
              label={t('portfolio.transHis.statuses')}
              value={filter?.status}
              options={[
                { label: t('portfolio.transHis.success'), value: '1' },
                { label: t('portfolio.transHis.failed'), value: '0' },
              ]}
            />
            <MultiSelect
              label={t('portfolio.transHis.tags')}
              onChange={handleChangeTag}
              options={tags}
              value={filter?.tag}
              upperOptions={[
                { label: t('portfolio.transHis.allTagUntag'), value: 'all' },
                { label: t('portfolio.transHis.allTagged'), value: 'tagged' },
                { label: t('portfolio.transHis.allUntagged'), value: 'untagged' },
              ]}
              onUpperChange={handleChangeTagOption}
              upperValue={tagOption}
            />
            <SingleSelect<string>
              onChange={handleChangeRange}
              label={t('portfolio.transHis.time')}
              value={range}
              options={[
                { label: t('portfolio.transHis.last30d'), value: '30d' },
                { label: t('portfolio.transHis.last90d'), value: '90d' },
                { label: t('portfolio.transHis.last6m'), value: '6m' },
                { label: t('portfolio.transHis.lastYr'), value: '1y' },
                { label: t('portfolio.transHis.custom'), value: 'c' },
              ]}
              additionalComponent={
                range == 'c' ? (
                  <Box>
                    <Box sx={{ px: 1, display: 'flex' }}>
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
                  </Box>
                ) : (
                  <Box></Box>
                )
              }
            />
          </Box>
          <SingleSelect<string>
            onChange={handleChangeNewest}
            label={t('portfolio.transHis.sortBy')}
            value={filter?.sort ?? 'DESC'}
            hideAll
            options={[
              { label: t('portfolio.transHis.newest'), value: 'DESC' },
              { label: t('portfolio.transHis.oldest'), value: 'ASC' },
            ]}
          />
        </Box>
        <DataDisplay
          isLoading={loading || getAllWalletsIsLoading}
          error={error}
          defaultLoaderOptions={{ height: '80vh', width: '100%' }}
        >
          <TransactionHistoryTable
            walletSyncStatus={walletSyncStatus}
            noWallet={walletsData?.noWallet}
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
