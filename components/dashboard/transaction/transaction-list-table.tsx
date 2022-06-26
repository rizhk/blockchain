import { ChangeEvent, Fragment, MouseEvent, useState } from 'react';
import type { FC } from 'react';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import { toast } from 'react-hot-toast';
import {
  Box,
  Button,
  CardContent,
  Divider,
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
import { ChevronDown as ChevronDownIcon } from '../../../icons/chevron-down';
import { ChevronRight as ChevronRightIcon } from '../../../icons/chevron-right';
import { DotsHorizontal as DotsHorizontalIcon } from '../../../icons/dots-horizontal';
import { Image as ImageIcon } from '../../../icons/image';
import type { Transaction } from '../../../types/transaction';
import { Scrollbar } from '../../scrollbar';
import { SeverityPill } from '../../severity-pill';
import { TransactionsListDetails } from './transactions-list-details';
import MoreVertIcon from '@mui/icons-material/MoreVert';

interface TransactionListTableProps {
  onPageChange: (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
  onRowsPerPageChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  page: number;
  transactions: Transaction[];
  transactionsCount: number;
  rowsPerPage: number;
}

export const TransactionListTable: FC<TransactionListTableProps> = (props) => {
  const { onPageChange, onRowsPerPageChange, page, transactions, transactionsCount, rowsPerPage, ...other } = props;
  const [openTransaction, setOpenTransaction] = useState<string | null>(null);

  const handleOpenTransaction = (transactionId: string): void => {
    setOpenTransaction((prevValue) => (prevValue === transactionId ? null : transactionId));
  };

  return (
    <div {...other}>
      <Scrollbar>
        <Table sx={{ maxWidth: 1200 }}>
          <TableHead>
            <TableRow>
              <TableCell />

              <TableCell width="25%" colSpan={2}>
                TYPE
              </TableCell>
              <TableCell width="25%">WALLET USED</TableCell>
              <TableCell>DATE</TableCell>
              <TableCell>AMOUNT</TableCell>
              <TableCell>STATUS</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((transaction) => {
              const open = transaction.id === openTransaction;

              return (
                <Fragment key={transaction.id}>
                  <TableRow hover key={transaction.id}>
                    <TableCell
                      padding="checkbox"
                      sx={{
                        ...(open && {
                          position: 'relative',
                          '&:after': {
                            position: 'absolute',
                            content: '" "',
                            top: 0,
                            left: 0,
                            backgroundColor: 'primary.main',
                            width: 3,
                            height: 'calc(100% + 1px)',
                          },
                        }),
                      }}
                      width="25%"
                    >
                      <IconButton onClick={() => handleOpenTransaction(transaction.id)}>
                        {open ? <ChevronDownIcon fontSize="small" /> : <ChevronRightIcon fontSize="small" />}
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <img src="/static/icons/usdc.png" />

                      {/* <Box
												sx={{
													alignItems: "center",
													display: "flex",
												}}>
												{
													"static/icons/cryptocurrency/svg/color/usdc.svg" ? (
														<Box
															sx={{
																alignItems:
																	"center",
																backgroundColor:
																	"background.default",
																backgroundImage:
																	"static/icons/cryptocurrency/svg/color/usdc.svg"
																,
																backgroundPosition:
																	"center",
																backgroundSize:
																	"cover",
																borderRadius: 1,
																display: "flex",
																height: 32,
																justifyContent:
																	"center",
																overflow: "hidden",
																width: 32,
															}}
														/>
													) : (
														<Box
															sx={{
																alignItems:
																	"center",
																backgroundColor:
																	"background.default",
																borderRadius: 1,
																display: "flex",
																height: 80,
																justifyContent:
																	"center",
																width: 80,
															}}>
															<ImageIcon fontSize="small" />
														</Box>
													)}
												<Box
													sx={{
														cursor: "pointer",
														ml: 2,
													}}>
													<Typography
														variant="subtitle2"
														sx={{
															textTransform:
																"capitalize",
														}}>
														{transaction.txn_type}{" "}
														{transaction.token}
													</Typography>
													<Typography
														color="textSecondary"
														variant="body2"></Typography>
												</Box>
											</Box> */}
                    </TableCell>
                    <TableCell>
                      {' '}
                      <Typography
                        display="inline"
                        variant="subtitle2"
                        sx={{
                          textTransform: 'capitalize',
                        }}
                      >
                        {transaction.txn_type} {transaction.token}
                      </Typography>
                    </TableCell>
                    <TableCell width="25%">
                      <Typography className="truncate" color="textPrimary" variant="body2">
                        {transaction.wallet_id}
                      </Typography>
                    </TableCell>
                    <TableCell>{new Date(transaction.created_at).toLocaleDateString()}</TableCell>
                    <TableCell width="25%">
                      {numeral(transaction.token_amt).format(`0,0.00`)} {transaction.token}
                      <br />
                      <Typography color="textSecondary" variant="body2">
                        {' '}
                        {numeral(transaction.fiat_amt).format(`0,0.00`)} {transaction.fiat}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <SeverityPill color={transaction.status === 'complete' ? 'success' : 'info'}>
                        {transaction.status}
                      </SeverityPill>
                    </TableCell>
                    <TableCell align="right">
                      <IconButton>
                        <MoreVertIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                  {open && (
                    <TableRow>
                      <TableCell colSpan={12}>
                        {' '}
                        <TransactionsListDetails TransactionId={transaction.id} />
                      </TableCell>
                    </TableRow>
                  )}
                </Fragment>
              );
            })}
          </TableBody>
        </Table>
      </Scrollbar>
      <TablePagination
        component="div"
        count={transactionsCount}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </div>
  );
};

TransactionListTable.propTypes = {
  transactions: PropTypes.array.isRequired,
  transactionsCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};
