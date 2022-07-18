import { ChangeEvent, Fragment, MouseEvent, useEffect, useState } from 'react';
import type { FC } from 'react';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import { toast } from 'react-hot-toast';
import {
  Box,
  Button,
  CardContent,
  Drawer,
  Grid,
  IconButton,
  InputAdornment,
  LinearProgress,
  MenuItem,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Scrollbar } from 'components/scrollbar';
import { useMounted } from 'hooks/use-mounted';
import { TransactionHistory } from 'types/transaction-history';
import { build, sequence, fake } from '@jackfranklin/test-data-bot';
import { useTranslation } from 'react-i18next';
import { primitivesUtils } from 'utils/primitives-utils';
import { Divider } from 'components/common/divider';
import { ArrowRight } from '@mui/icons-material';
import { ArrowNarrowRight } from 'icons/arrow-narrow-right';
import { ChevronRight } from 'icons/chevron-right';
import { TransactionHistoryDetails } from './transcation-history-details';

interface TransactionHistoryTableProps {
  onPageChange: (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
  onRowsPerPageChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  page: number;
  count: number;
  transactionHistory: TransactionHistory[];
  rowsPerPage: number;
}

export const TransactionHistoryTable: FC<TransactionHistoryTableProps> = ({
  onPageChange,
  onRowsPerPageChange,
  page,
  count,
  transactionHistory = [],
  rowsPerPage,
}) => {
  const { t } = useTranslation();
  const isMounted = useMounted();
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <>
      <Scrollbar>
        <Table sx={{ maxWidth: 1200 }}>
          <TableHead>
            <TableRow>
              <TableCell>{t('portfolio.transHis.type')}</TableCell>
              <TableCell>{t('portfolio.transHis.date')}</TableCell>
              <TableCell>{t('portfolio.transHis.from')}</TableCell>
              <TableCell>{t('portfolio.transHis.to')}</TableCell>
              <TableCell>{t('portfolio.transHis.amount')}</TableCell>
              <TableCell>{t('portfolio.transHis.fees')}</TableCell>
              <TableCell>{t('portfolio.transHis.total')}</TableCell>
              <TableCell>{t('portfolio.transHis.notes')}</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactionHistory.map((transaction) => {
              // const open = transaction.id === openTransaction;

              return (
                <Fragment key={transaction.id}>
                  <TableRow hover key={transaction.id}>
                    <TableCell>{transaction?.data_type}</TableCell>
                    <TableCell>
                      <Typography display="inline" variant="subtitle2">
                        {new Date(transaction.txn_date).toLocaleDateString()}
                      </Typography>
                      <br />
                      <Typography display="inline" variant="body2" sx={{ color: 'text.secondary' }}>
                        {new Date(transaction.txn_date).toLocaleTimeString()}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography display="inline" variant="subtitle2">
                        {transaction.from_wallet_name}
                      </Typography>
                      <br />
                      <Typography display="inline" variant="body2" sx={{ color: 'text.secondary' }}>
                        {primitivesUtils.getShortTxnId(transaction.from_wallet_id)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography display="inline" variant="subtitle2">
                        {transaction.to_wallet_name}
                      </Typography>
                      <br />
                      <Typography display="inline" variant="body2" sx={{ color: 'text.secondary' }}>
                        {primitivesUtils.getShortTxnId(transaction.to_wallet_id)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography display="inline" variant="subtitle2">
                        {transaction.token_amt} {transaction.token}
                      </Typography>
                      <br />
                      <Typography display="inline" variant="body2" sx={{ color: 'text.secondary' }}>
                        {transaction.fiat_amt} {transaction.fiat}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography display="inline" variant="subtitle2">
                        {transaction.fees_token_amt} {transaction.token}
                      </Typography>
                      <br />
                      <Typography display="inline" variant="body2" sx={{ color: 'text.secondary' }}>
                        {transaction.fees_fiat_amt} {transaction.fiat}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography display="inline" variant="subtitle2">
                        {transaction.total_token_amt} {transaction.token}
                      </Typography>
                      <br />
                      <Typography display="inline" variant="body2" sx={{ color: 'text.secondary' }}>
                        {transaction.total_fiat_amt} {transaction.fiat}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography display="inline" variant="caption" sx={{ color: 'text.secondary' }}>
                        {transaction.notes}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography
                        onClick={() => setOpenDrawer(true)}
                        display="inline"
                        variant="subtitle2"
                        color="primary"
                      >
                        {t('portfolio.transHis.viewDetails')} <ChevronRight />
                      </Typography>
                    </TableCell>
                  </TableRow>
                </Fragment>
              );
            })}
          </TableBody>
        </Table>
      </Scrollbar>
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[10, 25, 50]}
      />
      <TransactionHistoryDetails
        openDrawer={openDrawer}
        setOpenDrawer={setOpenDrawer}
        transactionHistory={transactionHistory[0]}
      />
    </>
  );
};
