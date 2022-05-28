import * as React from 'react'

import Card from '@mui/material/Card'
import InputBase from '@mui/material/InputBase'
import Button from '@mui/material/Button'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import SearchIcon from '@mui/icons-material/Search'
import { format, subDays } from 'date-fns'
import { SeverityPill } from '../../severity-pill'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { OverviewTransactionsDetails } from './overview-transactions-details'
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

function Row(props: { transaction: ReturnType<typeof Transactions> }) {
  const { transaction } = props
  const [open, setOpen] = React.useState(false)

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>

        <TableCell align="left">{transaction.sender}</TableCell>
        <TableCell align="left">{transaction.wallet}</TableCell>
        <TableCell align="left">02-06-20022</TableCell>
        <TableCell align="left">{transaction.amount}</TableCell>
        <TableCell align="left">
          {' '}
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
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <OverviewTransactionsDetails />
            {/* {transaction.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.customerId}</TableCell>
                      <TableCell align="right">{historyRow.amount}</TableCell>
                      <TableCell align="right">
                        {Math.round(historyRow.amount * row.price * 100) / 100}
                      </TableCell>
                    </TableRow>
                  ))} */}
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
}

export const OverviewLatestTransactions: FC = (props) => {
  return (
    <>
      <Typography sx={{ mb: 2 }} variant="h6">
        Latest Transactions{' '}
      </Typography>
      <Card {...props} elevation={13}>
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
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
                <TableCell colSpan={1}>
                  <Button
                    color="inherit"
                    endIcon={<KeyboardArrowDownIcon fontSize="small" />}
                  >
                    Type
                  </Button>
                </TableCell>
                <TableCell colSpan={1}>
                  <Button
                    color="inherit"
                    endIcon={<KeyboardArrowDownIcon fontSize="small" />}
                  >
                    Status
                  </Button>
                </TableCell>
                <TableCell colSpan={1}>
                  <Button
                    color="inherit"
                    endIcon={<KeyboardArrowDownIcon fontSize="small" />}
                  >
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
                // {rows.map((row) => (
                <Row key={transaction.id} transaction={transaction} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </>
  )
}
