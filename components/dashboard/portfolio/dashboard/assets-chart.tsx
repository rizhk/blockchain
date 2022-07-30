import { useTheme } from '@mui/material';
import { ApexOptions } from 'apexcharts';
import { Chart } from 'components/chart';
import * as React from 'react';

export interface IAssetsChartProps {}

export const AssetsChart: React.FC<IAssetsChartProps> = ({}) => {
  const theme = useTheme();

  const chartData = {
    series: [
      {
        color: '#688eff',
        data: 38,
      },
      {
        color: '#B9BDDF',
        data: 50,
      },
      {
        color: '#3832A0',
        data: 12,
      },
      {
        color: '#828DF8',
        data: 12,
      },
    ],
  };
  const chartOptions: ApexOptions = {
    chart: {
      background: 'transparent',
      stacked: false,
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: true,
      textAnchor: 'middle',
    },
    legend: {
      show: false,
    },
    plotOptions: {
      pie: {
        customScale: 1,
      },
    },
    colors: chartData.series.map((item) => item.color),
    theme: {
      mode: theme.palette.mode,
    },
  };
  const chartSeries = chartData.series.map((item) => item.data);
  return <Chart height={200} options={chartOptions} series={chartSeries} type="pie" />;
};
