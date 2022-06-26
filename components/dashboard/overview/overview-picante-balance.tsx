import type { FC } from 'react';
import type { ApexOptions } from 'apexcharts';
import { Avatar, Box, Button, Card, CardActions, Divider, Typography, CardContent, Grid } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import { ArrowRight as ArrowRightIcon } from '../../../icons/arrow-right';

import { Picante as PicanteIcon } from '../../../icons/picante';

export const OverviewPicanteBalance: FC = (props) => {
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
          picante tokens earned to date
        </Typography>

        <Grid container direction="row" justify="flex-end" spacing={3}>
          <Grid item>
            <PicanteIcon fontSize="large" />
          </Grid>
          <Grid item>
            <Typography textAlign="right" variant="h5">
              123,567,456
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
