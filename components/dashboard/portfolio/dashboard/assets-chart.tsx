import { useTheme } from '@mui/material';
import { ApexOptions } from 'apexcharts';
import { Chart } from 'components/chart';
import * as React from 'react';
import { primitivesUtils } from 'utils/primitives-utils';

export interface IAssetsChartProps {
  data: {
    series: { color: string; data: number; name: string; symbol: string }[];
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
        dataLabels: {
          offset: -20,
        },
      },
    },
    stroke: {
      width: 0,
      colors: ['#fff'],
    },

    tooltip: {
      enabled: true,
      custom: function ({ series, seriesIndex, dataPointIndex, w }) {
        var item = data?.series?.[seriesIndex];
        return `<div style="padding: 4px">${item.symbol}</div>`;
      },
    },
    colors: data?.series?.map((item) => item.color) || [],
    labels: data?.series?.map((item) => item.name) || [],
    theme: {
      mode: theme.palette.mode,
    },
  };
  const chartSeries = data?.series?.map((item) => item.data) || [];
  return <Chart height={220} options={chartOptions} series={chartSeries} type="pie" />;
};
