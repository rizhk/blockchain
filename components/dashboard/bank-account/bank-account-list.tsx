import { ChangeEvent, Fragment, MouseEvent, useState } from 'react';
import type { FC } from 'react';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  CardContent,
  Card,
  CardHeader,
  CardActions,
  Divider,
  Container,
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
import type { BankAccount } from 'types/bank-account';
import { bankAccountApi } from 'api/bank-account-api';

interface BankAccountListProps {
  bankAccounts: BankAccount[];
  parentCallback: BankAccount[];
}

export const BankAccountList: FC<BankAccountListProps> = (props) => {
  const { bankAccounts } = props;

  const handleDelete = async (iban: string) => {
    const success = await bankAccountApi.remove(iban);

    if (success) {
      const NewBankAccounts = bankAccounts.filter((item) => item.iban !== iban);
      props.parentCallback(NewBankAccounts);
    }
  };

  return (
    <Container maxWidth="xl">
      <Grid container spacing={4}>
        <Grid item>
          <Typography sx={{ mb: 2 }} variant="h6">
            Bank accounts ({bankAccounts.length})
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={4}>
        {bankAccounts.map((bankAccount) => {
          return (
            // eslint-disable-next-line react/jsx-key
            <Grid item>
              <Card
                sx={{
                  p: 4,
                  minWidth: '500px',
                  maxWidth: '500px',
                }}
              >
                <Grid md={7} xs={12}></Grid>
                {bankAccount.holder}
                <br />
                {bankAccount.acc_num}
                <br />
                {bankAccount.iban}
                <br />
                {bankAccount.sort_code}
                <Grid md={5} xs={12}></Grid>
                <Grid container justifyContent="flex-end" alignItems="flex-end">
                  <CardActions>
                    <Button
                      variant="outlined"
                      sx={{
                        borderColor: 'neutral.400',
                        color: 'neutral.400',
                        '&:hover': {
                          borderColor: 'neutral.400',
                          backgroundColor: 'background.paper',
                          color: 'neutral.400',
                        },
                      }}
                      onClick={() => {
                        handleDelete(bankAccount.iban);
                      }}
                    >
                      Remove
                    </Button>
                  </CardActions>
                </Grid>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};
