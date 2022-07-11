import { SxProps, Theme } from '@mui/system';
import { appConfig } from 'config';
import { ExternalLink } from 'icons/external-link';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Transaction } from 'types/transaction';
import { TextButton } from './text-button';

export interface INetworkButtonProps {
  txn: Transaction | undefined;
  sx?: SxProps<Theme>;
}

export const NetworkLinkButton: React.FC<INetworkButtonProps> = ({ txn, sx }) => {
  const { i18n, t } = useTranslation();
  const networkName = 'PolygonScan';

  const openInNewTab = (url: string | undefined) => {
    if (!url) return;
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
    if (newWindow) newWindow.opener = null;
  };
  const onClickNetworkButton = () => {
    openInNewTab(networkUrl);
  };

  let networkUrl = React.useMemo(() => {
    if (!txn) return;
    let networkUrl = undefined;
    if (txn?.status.toUpperCase() === 'COMPLETE' && txn?.txn_type.toUpperCase() === 'BUY' && txn?.hash_buy_transfer) {
      return (networkUrl = `${appConfig.networkBaseUrl}/${txn?.hash_buy_transfer}`);
    }
    if (txn?.status.toUpperCase() !== 'CLOSED' && txn?.txn_type.toUpperCase() === 'SELL' && txn?.hash_sell_transfer) {
      return (networkUrl = `${appConfig.networkBaseUrl}/${txn?.hash_sell_transfer}`);
    }
    if (
      txn?.status.toUpperCase() === 'CLOSED' &&
      txn?.txn_type.toUpperCase() === 'SELL' &&
      txn?.hash_withdraw_sell_transfer
    ) {
      return (networkUrl = `${appConfig.networkBaseUrl}/${txn?.hash_withdraw_sell_transfer}`);
    }
  }, [txn?.id]);

  return networkUrl ? (
    <TextButton onClick={onClickNetworkButton} variant="outlined" sx={[{}, ...(Array.isArray(sx) ? sx : [sx])]}>
      {t('transaction.viewOn')} {networkName} <ExternalLink sx={{ ml: 1 }} />
    </TextButton>
  ) : null;
};
