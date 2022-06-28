import type { FC } from 'react';
import type { ApexOptions } from 'apexcharts';
import { Avatar, Box, Button, Card, CardActions, Divider, Typography, CardContent, Grid } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { ArrowRight as ArrowRightIcon } from '../../../icons/arrow-right';

const bankIcons = {
  citi: '/static/icons/citi.png',
  hsbc: '/static/icons/hsbc.png',
};

export const OverviewPrivateWallet: FC = (props) => {
  const theme = useTheme();

  const chartOptions: ApexOptions = {
    chart: {
      background: 'transparent',
      stacked: false,
      toolbar: {
        show: false,
      },
    },
    colors: [theme.palette.secondary.light],
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
          background: theme.palette.secondary.dark,
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
          total bank account balance
        </Typography>

        <Typography color="textPrimary" variant="h5">
          total bank account balance
        </Typography>
        <Divider sx={{ margin: '10px 0 10px' }} />
        <Typography color="textSecondary" variant="overline" textTransform="uppercase">
          bank accounts
        </Typography>

        <Grid container direction="row" spacing={3}>
          <Grid item>
            <img src={bankIcons.hsbc} />
          </Grid>
          <Grid item md xs>
            <Typography variant="h6">HSBC</Typography>
            <Typography variant="body1">xxx xxxx xxxx 2839</Typography>
          </Grid>
          <Grid item md xs>
            <Typography textAlign="right" variant="h6">
              USD 343.33
            </Typography>
            <Typography textAlign="right" color="success.main" variant="body2">
              Primary
            </Typography>
          </Grid>
        </Grid>

        <Grid container direction="row" justify="flex-end" spacing={3}>
          <Grid item>
            <img src={bankIcons.citi} />
          </Grid>
          <Grid item md xs>
            <Typography variant="h6">Citi</Typography>
            <Typography variant="body1">xxx xxxx xxxx 9228</Typography>
          </Grid>
          <Grid item md xs>
            <Typography textAlign="right" variant="h6">
              USD 343.33
            </Typography>
          </Grid>
        </Grid>

        <Box display="flex" justifyContent="flex-end" alignItems="flex-end">
          <Button color="secondary" align="right">
            Manage Accounts
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};
