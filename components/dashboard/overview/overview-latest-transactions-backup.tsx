import type { FC } from 'react'
import { format, subDays } from 'date-fns'
import numeral from 'numeral'
import {
  Box,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
  Typography,
  InputBase,
  IconButton,
  Button,
} from '@mui/material'
import { ArrowDown as ArrowDownIcon } from '../../../icons/arrow-down'
import { ArrowRight as ArrowRightIcon } from '../../../icons/arrow-right'
import SearchIcon from '@mui/icons-material/Search'
import { Scrollbar } from '../../scrollbar'
import { SeverityPill } from '../../severity-pill'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { neutral } from 'theme/dark-theme-options'

interface Transaction {
  id: string
  amount: number
  currency: string
  date: Date
  sender: string
  type: string
  status: string
  wallet: string
}

const transactions: Transaction[] = [
  {
    id: 'd46800328cd510a668253b45',
    amount: 25000,
    currency: 'usd',
    date: new Date(),
    sender: 'Buy USDC',
    type: 'buy',
    status: 'on hold',
    wallet: 'Trust Wallet',
  },
  {
    id: 'b4b19b21656e44b487441c50',
    amount: 6843,
    currency: 'usd',
    date: subDays(new Date(), 1),
    sender: 'Sell USDC',
    type: 'send',
    status: 'confirmed',
    wallet: 'Metamask',
  },
  {
    id: '56c09ad91f6d44cb313397db',
    amount: 91823,
    currency: 'usd',
    date: subDays(new Date(), 1),
    sender: 'Transfer Out',
    type: 'send',
    status: 'failed',
    wallet: 'Trust Wallet',
  },
  {
    id: 'aaeb96c5a131a55d9623f44d',
    amount: 49550,
    currency: 'usd',
    date: subDays(new Date(), 3),
    sender: 'Transfer In',
    type: 'receive',
    status: 'confirmed',
    wallet: 'Metamask',
  },
]

export const OverviewLatestTransactions: FC = (props) => {
  return (
    <>
      <Typography sx={{ mb: 2 }} variant="h6">
        Latest Transactions{' '}
      </Typography>
      <Card {...props} elevation={13}>
        <Scrollbar>
          <Table sx={{ minWidth: 600 }}>
            <TableHead sx={{ backgroundColor: 'none' }}>
              <TableRow>
                <TableCell colSpan={12}>
                  <IconButton
                    type="submit"
                    sx={{ p: '10px' }}
                    aria-label="search"
                  >
                    <SearchIcon />
                  </IconButton>
                  <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Enter a keyword"
                    inputProps={{ 'aria-label': 'search google maps' }}
                  />
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell colSpan={2}>
                  <Button
                    color="secondary"
                    endIcon={<ArrowDownIcon fontSize="small" />}
                  >
                    xx Tyoe
                  </Button>
                </TableCell>
                <TableCell colSpan={2}>
                  <Button endIcon={<ArrowDownIcon fontSize="small" />}>
                    Status
                  </Button>
                </TableCell>
                <TableCell colSpan={2}>
                  <Button endIcon={<ArrowDownIcon fontSize="small" />}>
                    Most recent
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={1}></TableCell>
                <TableCell colSpan={1}> Type</TableCell>
                <TableCell colSpan={1}>Wallet used</TableCell>
                <TableCell colSpan={1}>Date (dd-mm-yy)</TableCell>
                <TableCell colSpan={1}>amount</TableCell>
                <TableCell colSpan={1}>status</TableCell>
                <TableCell colSpan={1}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow
                  key={transaction.id}
                  sx={{
                    '&:last-child td': {
                      border: 0,
                    },
                  }}
                >
                  <TableCell width={100}>
                    <Button
                      endIcon={<ArrowRightIcon fontSize="small" />}
                    ></Button>
                  </TableCell>
                  <TableCell>
                    <div>
                      <Typography variant="subtitle2">
                        {transaction.sender}
                      </Typography>
                      <Typography color="textSecondary" variant="body2">
                        {transaction.type === 'receive'
                          ? 'Payment received'
                          : 'Payment sent'}
                      </Typography>
                    </div>
                  </TableCell>
                  <TableCell>{transaction.wallet}</TableCell>
                  <TableCell>22-04-2022</TableCell>

                  <TableCell width={180}>
                    <Typography
                      color={
                        transaction.type === 'receive'
                          ? 'success.main'
                          : 'error.main'
                      }
                      variant="subtitle2"
                    >
                      {transaction.type === 'receive' ? '+' : '-'}{' '}
                      {numeral(transaction.amount).format('$0,0.00')}
                    </Typography>
                    <Typography color="textSecondary" variant="body2">
                      {transaction.currency.toUpperCase()}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <SeverityPill
                      color={
                        (transaction.status === 'confirmed' && 'success') ||
                        (transaction.status === 'failed' && 'error') ||
                        'warning'
                      }
                    >
                      {transaction.status}
                    </SeverityPill>
                  </TableCell>
                  <TableCell>
                    <MoreVertIcon />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Scrollbar>
      </Card>
    </>
  )
}
