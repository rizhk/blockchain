import type { FC } from 'react';
import type { ApexOptions } from 'apexcharts';
import { Avatar, Box, Button, Card, CardActions, Divider, Typography, CardContent, Grid } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { ArrowRight as ArrowRightIcon } from '../../../icons/arrow-right';
import { ChevronUp as ChevronUpIcon } from '../../../icons/chevron-up';
import { Chart } from '../../chart';
import { Metamask as MetamaskIcon } from '../../../icons/metamask';

const walletIcons = {
  metamask: '/static/icons/metamask.png',
};

export const OverviewCryptoWallet: FC = (props) => {
  const theme = useTheme();

  const chartOptions: ApexOptions = {
    chart: {
      background: 'transparent',
      stacked: false,
      toolbar: {
        show: false,
      },
    },
    colors: [theme.palette.primary.light],
    fill: {
      opacity: 1,
    },
    labels: [],
    plotOptions: {
      radialBar: {
        dataLabels: {
          show: false,
        },
        hollow: {
          size: '40%',
        },
        track: {
          background: theme.palette.primary.dark,
        },
      },
    },
    theme: {
      mode: theme.palette.mode,
    },
  };

  const chartSeries = [76];

  return (
    <Card {...props} elevation={16}>
      <CardContent>
        <Typography color="textSecondary" variant="overline" textTransform="uppercase">
          Total wallet balance
        </Typography>
        <Grid container direction="row" justify="flex-end" spacing={3}>
          <Grid item alignItems="center">
            <img src={walletIcons.metamask} />
          </Grid>
          <Grid item md xs>
            <Typography variant="h6">Metamask Wallet</Typography>
            <Typography variant="body1">1BvBM….NVN2</Typography>
          </Grid>
          <Grid item md xs>
            <Typography textAlign="right" variant="h6">
              USD 343.33
            </Typography>
          </Grid>
        </Grid>
        <Box display="flex" justifyContent="flex-end" alignItems="flex-end">
          <Button color="secondary">Connect to a different wallet</Button>
        </Box>
      </CardContent>
    </Card>
  );
};
