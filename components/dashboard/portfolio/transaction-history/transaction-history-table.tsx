import { ChangeEvent, Fragment, MouseEvent, useEffect, useMemo, useState } from 'react';
import type { FC } from 'react';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import { toast } from 'react-hot-toast';
import {
  Box,
  Button,
  CardContent,
  Chip,
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
import { build, sequence, fake } from '@jackfranklin/test-data-bot';
import { useTranslation } from 'react-i18next';
import { primitivesUtils } from 'utils/primitives-utils';
import { Divider } from 'components/common/divider';
import { ArrowRight } from '@mui/icons-material';
import { ArrowNarrowRight } from 'icons/arrow-narrow-right';
import { ChevronRight } from 'icons/chevron-right';
import { TransactionHistoryDetails } from './transcation-history-details';
import { TransactionHistory } from 'types/portfolio';
import { MoneyReceive } from 'icons/money-receive';
import { MoneySend } from 'icons/money-send';
import { format } from 'date-fns-tz';
import { useAddNoteModal, useAddTagModal } from 'hooks/use-portfolio-modal';
import AddTagModal from './add-tag-modal';
import AddNoteModal from './add-note-modal';
import { TokenSymbolDisplay } from 'components/common/wallet-name-display';

interface TransactionHistoryTableProps {
  onPageChange: (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
  onRowsPerPageChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  page: number;
  count: number;
  transactionHistory: TransactionHistory[];
  rowsPerPage: number;
  getTransactionHistory: () => void;
  setTransactionHistoryTag: (txnId: string, tag_name: string) => void;
  setTransactionHistoryNote: (txnId: string, note: string) => void;
  noWallet: boolean;
}

export const TransactionHistoryTable: FC<TransactionHistoryTableProps> = ({
  onPageChange,
  onRowsPerPageChange,
  page,
  count,
  transactionHistory = [],
  rowsPerPage,
  getTransactionHistory,
  setTransactionHistoryTag,
  setTransactionHistoryNote,
  noWallet,
}) => {
  const { t } = useTranslation();
  const [openDrawer, setOpenDrawer] = useState(false);
  const { isAddTagShowing, toggleAddTag } = useAddTagModal();
  const { isAddNoteShowing, toggleAddNote } = useAddNoteModal();

  const [currentTransactionId, setCurrentTransactionId] = useState<string>();

  const currentTransaction = useMemo(() => {
    const txn = transactionHistory?.filter(({ id }) => {
      return id === currentTransactionId;
    });
    return txn?.length > 0 ? txn[0] : undefined;
  }, [JSON.stringify(transactionHistory), currentTransactionId]);

  const handleViewDetail = (transaction: TransactionHistory) => {
    setCurrentTransactionId(transaction.id);
    setOpenDrawer(true);
  };

  const handleClickTag = (transaction: TransactionHistory) => {
    setCurrentTransactionId(transaction.id);
    toggleAddTag();
  };

  const handleClickNote = (transaction: TransactionHistory) => {
    setCurrentTransactionId(transaction.id);
    toggleAddNote();
  };

  return (
    <>
      <AddTagModal
        setTransactionHistoryTag={setTransactionHistoryTag}
        tag={currentTransaction?.tag_name}
        txnId={currentTransaction?.id}
        isShowing={isAddTagShowing}
        hide={toggleAddTag}
      />
      <AddNoteModal
        setTransactionHistoryNote={setTransactionHistoryNote}
        note={currentTransaction?.note}
        txnId={currentTransaction?.id}
        isShowing={isAddNoteShowing}
        hide={toggleAddNote}
      />
      <Table sx={{ maxWidth: 1200 }}>
        <TableHead>
          <TableRow>
            <TableCell>{t('portfolio.transHis.type')}</TableCell>
            <TableCell>
              {t('portfolio.transHis.date')}{' '}
              <Typography
                display="inline"
                variant="body2"
                sx={{ fontWeight: 700, fontSize: '0.75em', color: 'text.secondary' }}
              >
                (DD-MM-YY)
              </Typography>
            </TableCell>
            <TableCell>{t('portfolio.transHis.from')}</TableCell>
            <TableCell>{t('portfolio.transHis.to')}</TableCell>
            <TableCell>{t('portfolio.transHis.amount')}</TableCell>
            {/* <TableCell>{t('portfolio.transHis.fees')}</TableCell> */}
            <TableCell>{t('portfolio.transHis.total')}</TableCell>
            <TableCell>{t('portfolio.transHis.tag')}</TableCell>
            <TableCell>{t('portfolio.transHis.note')}</TableCell>
            <TableCell>{t('portfolio.transHis.status')}</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {noWallet && (
            <TableRow>
              <TableCell colSpan={10}>
                <Typography align="center"> {t('portfolio.transHis.connectWalletToSeeTxn')}</Typography>
              </TableCell>
            </TableRow>
          )}
          {!noWallet && count === 0 && (
            <TableRow>
              <TableCell colSpan={10}>
                <Typography align="center">{t('portfolio.transHis.connectedWithNoTransaction')}</Typography>
              </TableCell>
            </TableRow>
          )}
          {transactionHistory?.map((transaction, index) => {
            const typeIcon = transaction.type.toLowerCase() === 'in' ? <MoneyReceive /> : <MoneySend />;
            return (
              <Fragment key={transaction.id}>
                <TableRow hover key={transaction.id}>
                  <TableCell>{typeIcon}</TableCell>
                  <TableCell sx={{ maxWidth: '140px' }}>
                    <Typography display="inline" variant="subtitle2">
                      {format(new Date(transaction.transaction_date), 'dd-MM-yy')}
                    </Typography>
                    <br />
                    <Typography display="inline" variant="body2" sx={{ color: 'text.secondary' }}>
                      {format(new Date(transaction.transaction_date), `hh:mm:ss aaaaa'm'`)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography display="inline" variant="subtitle2">
                      {transaction.from_name}
                    </Typography>
                    <br />
                    <Typography display="inline" variant="body2" sx={{ color: 'text.secondary' }}>
                      {primitivesUtils.getShortTxnId(transaction.from)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography display="inline" variant="subtitle2">
                      {transaction.to_name}
                    </Typography>
                    <br />
                    <Typography display="inline" variant="body2" sx={{ color: 'text.secondary' }}>
                      {primitivesUtils.getShortTxnId(transaction.to)}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ maxWidth: '150px' }}>
                    <Typography display="block" variant="subtitle2">
                      {primitivesUtils.convertCurrencyDisplay(transaction.crypto_amount)}{' '}
                      <TokenSymbolDisplay display="inline-block" variant="subtitle2" name={transaction.token_symbol} />
                    </Typography>
                    {parseFloat(transaction.crypto_amount_fiat) > 0 && (
                      <Typography display="inline" variant="body2" sx={{ color: 'text.secondary' }}>
                        {'USD '}
                        {primitivesUtils.convertCurrencyDisplay(transaction.crypto_amount_fiat)}
                      </Typography>
                    )}
                  </TableCell>
                  {/* <TableCell> */}
                  {/* <Typography display="inline" variant="subtitle2"> */}
                  {/* {primitivesUtils.convertCurrencyDisplay(transaction.gas_used)} {'ETH'} */}
                  {/* //TODO: hardcore for now, transaction should provide a native token symbol */}
                  {/* </Typography> */}
                  {/* <br /> */}
                  {/* <Typography display="inline" variant="body2" sx={{ color: 'text.secondary' }}> */}
                  {/* {'USD '} */}
                  {/* {primitivesUtils.convertCurrencyDisplay(transaction.gas_fiat)} */}
                  {/* </Typography> */}
                  {/* </TableCell> */}
                  <TableCell sx={{ maxWidth: '150px' }}>
                    <Typography display="inline" variant="body2" sx={{ color: 'text.secondary' }}>
                      {'USD '}
                      {primitivesUtils.convertCurrencyDisplay(
                        parseFloat(transaction.crypto_amount_fiat) + parseFloat(transaction.gas_fiat),
                        true,
                      )}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ maxWidth: '150px' }}>
                    <Typography display="inline" variant="caption" sx={{ color: 'text.secondary' }}>
                      {transaction.tag_name ? (
                        <Chip
                          onClick={() => {
                            handleClickTag(transaction);
                          }}
                          label={transaction.tag_name}
                          variant="outlined"
                          size="small"
                        />
                      ) : (
                        <Typography
                          onClick={() => {
                            handleClickTag(transaction);
                          }}
                          display="inline"
                          variant="body2"
                          sx={{ cursor: 'pointer', color: 'primary.main', textDecoration: 'underline' }}
                        >
                          {t('portfolio.transHis.addTag')}
                        </Typography>
                      )}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ maxWidth: '150px' }}>
                    {transaction.note ? (
                      <Typography
                        onClick={() => {
                          handleClickNote(transaction);
                        }}
                        display="inline"
                        variant="caption"
                        sx={{
                          cursor: 'pointer',
                          WebkitBoxOrient: 'vertical',
                          WebkitLineClamp: 2,
                          display: '-webkit-box',
                          color: 'text.secondary',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          maxHeight: '3rem',
                          lineHeight: '1.5rem',
                        }}
                      >
                        {transaction.note}
                      </Typography>
                    ) : (
                      <Typography
                        onClick={() => {
                          handleClickNote(transaction);
                        }}
                        display="inline"
                        variant="body2"
                        sx={{ cursor: 'pointer', color: 'primary.main', textDecoration: 'underline' }}
                      >
                        {t('portfolio.transHis.addNote')}
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell sx={{ maxWidth: '150px' }}>
                    {transaction.status == '1' ? (
                      <Typography
                        display="inline"
                        variant="body2"
                        sx={{
                          cursor: 'pointer',
                          WebkitBoxOrient: 'vertical',
                          WebkitLineClamp: 2,
                          display: '-webkit-box',
                          color: '#00C9A7',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          maxHeight: '3rem',
                          lineHeight: '140%',
                        }}
                      >
                        {t('portfolio.transHis.success')}
                      </Typography>
                    ) : (
                      <Typography
                        display="inline"
                        variant="body2"
                        sx={{
                          cursor: 'pointer',
                          WebkitBoxOrient: 'vertical',
                          WebkitLineClamp: 2,
                          display: '-webkit-box',
                          color: '#EB5757',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          maxHeight: '3rem',
                          lineHeight: '140%',
                        }}
                      >
                        {t('portfolio.transHis.failed')}
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell align="right">
                    <Typography
                      sx={{ cursor: 'pointer' }}
                      onClick={() => handleViewDetail(transaction)}
                      display="inline"
                      variant="subtitle2"
                      color="primary"
                    >
                      <ChevronRight />
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
      <TransactionHistoryDetails
        setTransactionHistoryTag={setTransactionHistoryTag}
        setTransactionHistoryNote={setTransactionHistoryNote}
        openDrawer={openDrawer}
        setOpenDrawer={setOpenDrawer}
        transactionHistory={currentTransaction}
        getTransactionHistory={getTransactionHistory}
      />
    </>
  );
};
