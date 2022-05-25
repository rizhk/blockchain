import type { FC } from 'react';
import type { ApexOptions } from 'apexcharts';
import { Avatar, Box, Button, Card, CardActions, Divider, Typography, CardContent } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { ArrowRight as ArrowRightIcon } from '../../../icons/arrow-right';
import { ChevronUp as ChevronUpIcon } from '../../../icons/chevron-up';
import { Chart } from '../../chart';

export const OverviewCryptoWallet: FC = (props) => {
  const theme = useTheme();

  const chartOptions: ApexOptions = {
    chart: {
      background: 'transparent',
      stacked: false,
      toolbar: {
        show: false
      }
    },
    colors: [theme.palette.primary.light],
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
          background: theme.palette.primary.dark
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
             Total wallet balance
            </Typography>
            <Typography
              color="textPrimary"
              variant="h5"
            >
              0.299 BTC
            </Typography>

<br/>
         
      <Divider />
      <CardActions>
        <Button endIcon={<ArrowRightIcon fontSize="small" />}>
          See all activity
        </Button>
      </CardActions>
      </CardContent>
    </Card>
  );
};
