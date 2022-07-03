import { SxProps, Theme } from '@mui/system';
import { ExternalLink } from 'icons/external-link';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { TextButton } from './text-button';

export interface INetworkButtonProps {
  networkName: string;
  networkUrl: string;
  sx?: SxProps<Theme>;
}

export const NetworkLinkButton: React.FC<INetworkButtonProps> = ({ sx, networkName, networkUrl }) => {
  const { i18n, t } = useTranslation();

  return (
    <TextButton variant="outlined" sx={[{}, ...(Array.isArray(sx) ? sx : [sx])]}>
      {t('transaction.viewOn')} {networkName} <ExternalLink sx={{ ml: 1 }} />
    </TextButton>
  );
};
