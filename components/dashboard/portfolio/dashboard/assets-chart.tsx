import { useTheme } from '@mui/material';
import { ApexOptions } from 'apexcharts';
import { Chart } from 'components/chart';
import * as React from 'react';

export interface IAssetsChartProps {
  data: {
    series: { color: string; data: number; name: string }[];
  };
}

export const AssetsChart: React.FC<IAssetsChartProps> = ({ data }) => {
  const theme = useTheme();
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
    tooltip: {
      enabled: false,
    },
    colors: data?.series?.map((item) => item.color),
    labels: data?.series?.map((item) => item.name),
    theme: {
      mode: theme.palette.mode,
    },
  };
  const chartSeries = data?.series?.map((item) => item.data);
  return <Chart height={200} options={chartOptions} series={chartSeries} type="pie" />;
};
