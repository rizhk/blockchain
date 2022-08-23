import { portfolioApi } from 'api/portfolio-api';
import { formatDistanceToNow } from 'date-fns';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { WalletData } from 'types/portfolio';
import useFetch from './use-fetch';
import useMutation from './use-mutation';

export const useWalletData = () => {
  const { t } = useTranslation();
  const [lastUpdatedDt, setLastUpdatedDt] = useState<Date>();

  //#region request for wallet sync
  const {
    mutate: requestWalletSync,
    data: requestWalletSyncData,
    error: requestWalletSyncError,
    isSuccess: requestWalletSyncIsSuccess,
    loading: requestWalletSyncIsLoading,
  } = useMutation(() => {
    return portfolioApi.requestWalletSync({
      defaultErrorMessage: t('portfolio.dashboard.requestWalletSyncError'),
    });
  });
  //#endregion

  //#region get wallets data
  const {
    data: getAllWalletsData,
    loading: getAllWalletsIsLoading,
    error: getAllWalletsError,
  } = useFetch(() => {
    return portfolioApi.getAllWallets({ defaultErrorMessage: t('portfolio.dashboard.getNetWorthError') });
  }, []);

  const walletsData: WalletData = useMemo(() => {
    if (!getAllWalletsData?.items?.length || getAllWalletsData?.items?.length === 0) return { noWallet: true };
    const networth = getAllWalletsData?.items.reduce((sum, wallet) => {
      return parseFloat(wallet?.fiat_value || '0') + sum;
    }, 0);
    return { noWallet: false, networth, wallet: getAllWalletsData?.items };
  }, [JSON.stringify(getAllWalletsData)]);
  //#endregion

  //#region trigger get wallet wallet sync data when new sync requested
  const {
    data: getWalletSyncStatusData,
    loading: getWalletSyncStatusIsLoading,
    error: getWalletSyncStatusError,
  } = useFetch(() => {
    return portfolioApi.getWalletSyncStatus({ defaultErrorMessage: t('portfolio.dashboard.getWalletSyncStatusError') });
  }, [JSON.stringify(requestWalletSyncData)]);

  useEffect(() => {
    if (!getWalletSyncStatusData?.last_updated_at || getWalletSyncStatusData?.status?.toLowerCase() !== 'completed')
      return;
    setLastUpdatedDt(new Date(getWalletSyncStatusData.last_updated_at));
  }, [JSON.stringify(getWalletSyncStatusData)]);

  const updatedSince = useMemo(() => {
    return lastUpdatedDt
      ? `${t('portfolio.dashboard.dataLastUpdated')} ${formatDistanceToNow(lastUpdatedDt)} ago`
      : null;
  }, [JSON.stringify(lastUpdatedDt)]);
  //#endregion

  return {
    requestWalletSyncError,
    getAllWalletsError,
    getWalletSyncStatusError,
    walletsData,
    getWalletSyncStatusData,
    getAllWalletsIsLoading,
    requestWalletSyncIsLoading,
    getWalletSyncStatusIsLoading,
    requestWalletSyncData: requestWalletSyncData,
    requestWalletSync,
    updatedSince,
  };
};
