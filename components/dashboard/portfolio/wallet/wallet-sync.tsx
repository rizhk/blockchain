import { Refresh } from '@mui/icons-material';
import { Alert, Grid, Typography } from '@mui/material';
import { portfolioApi } from 'api/portfolio-api';
import { formatDistanceToNow } from 'date-fns';
import useFetch from 'hooks/use-fetch';
import useMutation, { MutateFunction, MutationFunction } from 'hooks/use-mutation';
import { useWalletData } from 'hooks/use-wallet-data';
import * as React from 'react';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { GetWalletSyncStatusResponse, WalletData, WalletSyncStatus } from 'types/portfolio';
import { BaseApiResponse } from 'types/response';
import { primitivesUtils } from 'utils/primitives-utils';

export interface IWalletSyncProps {
  walletsData: WalletData;
  requestWalletSync: MutateFunction<BaseApiResponse, unknown>;
  getWalletSyncStatusData: GetWalletSyncStatusResponse | undefined;
  getWalletSyncStatusIsLoading: boolean;
  requestWalletSyncIsLoading: boolean;
  updatedSince: string | null;
  requestWalletSyncError: string | undefined;
  getWalletSyncStatusError: string | undefined;
  containerProps?: Omit<React.ComponentProps<typeof Grid>, 'component'>;
  walletSyncStatus: WalletSyncStatus;
}

export const WalletSync: React.FC<IWalletSyncProps> = ({
  walletsData,
  requestWalletSync,
  getWalletSyncStatusData,
  getWalletSyncStatusIsLoading,
  requestWalletSyncIsLoading,
  updatedSince,
  requestWalletSyncError,
  getWalletSyncStatusError,
  containerProps,
  walletSyncStatus,
}) => {
  const { t } = useTranslation();

  const handleUpdateData = () => {
    requestWalletSync({});
  };

  const RefreshButton = (
    <Typography
      display="flex"
      {...(walletSyncStatus.isInProgress ? {} : { onClick: handleUpdateData, style: { cursor: 'pointer' } })}
      variant="caption2"
      sx={{ color: 'primary.main', verticalAlign: 'bottom' }}
    >
      <Refresh
        sx={[
          { fontSize: '0.75rem' },
          requestWalletSyncIsLoading && {
            animation: 'spin 0.5s linear infinite',
            '@keyframes spin': {
              '0%': {
                transform: 'rotate(0deg)',
              },
              '100%': {
                transform: 'rotate(360deg)',
              },
            },
          },
        ]}
      />
    </Typography>
  );

  return (
    <>
      {!walletsData?.noWallet && (
        <>
          <Grid container item alignItems="center" {...containerProps}>
            {walletSyncStatus.isInProgress && (
              <>
                <Typography variant="caption2" sx={[{ color: 'primary.main', pr: 0.5 }]}>
                  {t('portfolio.dashboard.fetchingLatestData')}
                </Typography>{' '}
                {RefreshButton}
              </>
            )}
            {walletSyncStatus.isCompleted || walletSyncStatus.isNotTriggered ? (
              <>
                <Typography variant="caption2" sx={{ fontSize: '0.7rem', pr: 2 }}>
                  {updatedSince}
                </Typography>
                {getWalletSyncStatusError && <Alert severity="error">{getWalletSyncStatusError}</Alert>}
                <Typography
                  onClick={handleUpdateData}
                  variant="caption2"
                  sx={[{ textDecoration: 'underline', cursor: 'pointer', color: 'primary.main', pr: 0.5 }]}
                >
                  {t('portfolio.dashboard.updateDataNow')}
                </Typography>{' '}
                {RefreshButton}
                {requestWalletSyncError && <Alert severity="error">{requestWalletSyncError}</Alert>}
              </>
            ) : null}
          </Grid>
        </>
      )}
    </>
  );
};
