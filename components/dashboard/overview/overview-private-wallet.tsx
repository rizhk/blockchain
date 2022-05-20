import type { FC } from 'react';
import type { ApexOptions } from 'apexcharts';
import { Avatar, Box, Button, Card, CardActions, Divider, Typography,  CardContent } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { ArrowRight as ArrowRightIcon } from '../../../icons/arrow-right';


export const OverviewPrivateWallet: FC = (props) => {
  const theme = useTheme();

  const chartOptions: ApexOptions = {
    chart: {
      background: 'transparent',
      stacked: false,
      toolbar: {
        show: false
      }
    },
    colors: [theme.palette.secondary.light],
    fill: {
      opacity: 1
    },
    labels: [],
    plotOptions: {
      radialBar: {
        dataLabels: {
          show: false
        },
        hollow: {
          size: '40%'
        },
        track: {
          background: theme.palette.secondary.dark
        }
      }
    },
    theme: {
      mode: theme.palette.mode
    }
  };

  const chartSeries = [76];

  return (
    <Card {...props} elevation={16}>
        <CardContent>
        <Typography
              color="textSecondary"
              variant="overline"
              textTransform="uppercase"
            >
              total bank account balance
            </Typography>

            <Typography
              color="textPrimary"
              variant="h5"
            >
              $21,500.00
            </Typography>

<br/>
      <Divider />
      <CardActions>
        <Button align="right" endIcon={<ArrowRightIcon fontSize="small" />}>
          Withdraw money
        </Button>
     
      </CardActions>
      </CardContent>
    </Card>
  );
};
