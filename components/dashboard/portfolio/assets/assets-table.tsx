import { ChangeEvent, Fragment, MouseEvent, useEffect, useMemo, useState } from 'react';
import type { FC } from 'react';
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { primitivesUtils } from 'utils/primitives-utils';
import { Asset, TransactionHistory } from 'types/portfolio';
import { MoneyReceive } from 'icons/money-receive';
import { MoneySend } from 'icons/money-send';
import { format } from 'date-fns-tz';
import { TokenSymbolDisplay } from 'components/common/wallet-name-display';
import Image from 'next/image';

interface AssetsTableProps {
  onPageChange: (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
  onRowsPerPageChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  page: number;
  count: number;
  assets: Asset[];
  rowsPerPage: number;
  noWallet: boolean;
}

export const AssetsTable: FC<AssetsTableProps> = ({
  onPageChange,
  onRowsPerPageChange,
  page,
  count,
  assets = [],
  rowsPerPage,
  noWallet,
}) => {
  const { t } = useTranslation();

  return (
    <>
      <Table sx={{ maxWidth: 1200 }}>
        <TableHead>
          <TableRow>
            <TableCell>{t('portfolio.assets.token')}</TableCell>
            <TableCell>{t('portfolio.assets.marketPrice')}</TableCell>
            <TableCell>{t('portfolio.assets.balance')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {noWallet && (
            <TableRow>
              <TableCell colSpan={10}>
                <Typography align="center"> {t('portfolio.assets.connectWalletToSeeAssets')}</Typography>
              </TableCell>
            </TableRow>
          )}
          {!noWallet && count === 0 && (
            <TableRow>
              <TableCell colSpan={10}>
                <Typography align="center">{t('portfolio.assets.connectedWithNoAssets')}</Typography>
              </TableCell>
            </TableRow>
          )}
          {assets?.map((asset, index) => {
            return (
              <Fragment key={asset.name}>
                <TableRow hover key={asset.name}>
                  <TableCell sx={{ maxWidth: '140px' }}>
                    <Grid container item flex="1 1 45%" alignItems="center">
                      <Grid
                        item
                        component={() => {
                          return (
                            <Image
                              width="20"
                              height="20"
                              alt={asset.symbol}
                              src={asset.icon === '' ? '/static/crypto/default/erc-20.svg' : asset.icon}
                            />
                          );
                        }}
                      />
                      <Grid item>
                        <Typography sx={{ pl: 1 }} variant="caption">
                          {asset.name}
                        </Typography>
                      </Grid>
                    </Grid>
                  </TableCell>
                  <TableCell>
                    <Typography display="inline" variant="subtitle2">
                      {asset.market_price_currency} {primitivesUtils.convertCurrencyDisplay(asset.market_price_fiat)}
                    </Typography>
                  </TableCell>{' '}
                  <TableCell>
                    <TokenSymbolDisplay amt={asset.balance} name={asset.symbol} display="inline" variant="subtitle2" />
                    <br />
                    <Typography display="inline" variant="body2" sx={{ color: 'text.secondary' }}>
                      {asset.fiat_currency} {primitivesUtils.convertCurrencyDisplay(asset.fiat_value)}
                    </Typography>
                  </TableCell>
                </TableRow>
              </Fragment>
            );
          })}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[10, 25, 50]}
      />
    </>
  );
};
