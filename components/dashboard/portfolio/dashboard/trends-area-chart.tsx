import { Grid, Typography, useTheme } from '@mui/material';
import { tooltip } from 'aws-amplify';
import { Divider } from 'components/common/divider';
import { TokenSymbolDisplay } from 'components/common/wallet-name-display';
import { parse } from 'date-fns';
import { format } from 'date-fns-tz';
import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Area,
  AreaChart,
  ComposedChart,
  ResponsiveContainer,
  Rectangle,
} from 'recharts';
import { TooltipDataPoint, Trend, TrendChartData } from 'types/portfolio';
import { primitivesUtils } from 'utils/primitives-utils';

const CustomTooltip = ({ active, payload, label }: { active: boolean; payload: TooltipDataPoint[]; label: string }) => {
  if (active && payload && payload.length) {
    const tooltipDataPoint = payload[0];
    const { payload: data } = tooltipDataPoint;
    return (
      <Grid
        width="fit-content"
        container
        sx={{
          background: '#FFFFFF',
          boxShadow: '0px 1px 5px rgba(100, 116, 139, 0.12)',
          borderRadius: '4px',
          maxWidth: '180px',
        }}
      >
        <Typography sx={{ px: 2, pt: 1, fontSize: '10px', lineHeight: '166%' }} variant="body2">
          Total portfolio value
        </Typography>
        <Divider />
        <Grid container item sx={{ px: 2, pb: 1 }} flexDirection="column">
          {/* <TokenSymbolDisplay
            amt={data.crypto_amount}
            display="inline-block"
            variant="body2"
            name={data.token_symbol}
            sx={{
              fontWeight: 700,
              fontSize: '14px',
              lineHeight: '157%',
            }}
          /> */}
          <Typography
            variant="body2"
            sx={{
              fontWeight: 600,
              fontSize: '10px',
              lineHeight: '100%',
              letterSpacing: '0.5px',
              color: 'text.secondary',
            }}
          >
            {data.fiat_currency} {primitivesUtils.convertFiatAmountDisplay(data.fiat_amount)}
          </Typography>
          <Typography
            variant="subtitle3"
            sx={{ fontSize: '10px', pt: 1.5, lineHeight: '100%', letterSpacing: '0.5px' }}
          >
            {format(new Date(data.date), 'MM-dd-yy')}{' '}
            {format(new Date(data.date), `hh:mm:ss aaaaa'm'`).replace('am', 'AM').replace('pm', 'PM')} +UTC
          </Typography>
        </Grid>
      </Grid>
    );
  }

  return null;
};

export interface ITrendsAreaChartProps {
  trends: TrendChartData[];
}

export const TrendsAreaChart: React.FC<ITrendsAreaChartProps> = ({ trends }) => {
  const theme = useTheme();

  return (
    <ResponsiveContainer width="100%" height="90%">
      <ComposedChart width={690} height={380} data={trends} margin={{ top: 30, right: 30, left: 30, bottom: 5 }}>
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F34F1D" stopOpacity={0.2} />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity={0.5} />
          </linearGradient>
        </defs>
        <XAxis
          xAxisId="0"
          dataKey="day"
          tick={{
            fontFamily: 'Montserrat',
            fontWeight: 300,
            fontSize: '8px',
            color: '#6B7280',
          }}
        />
        <XAxis
          tickLine={false}
          axisLine={false}
          xAxisId="1"
          dataKey="month"
          tick={{
            fontFamily: 'Montserrat',
            fontWeight: 300,
            fontSize: '8px',
            color: '#6B7280',
            spacing: 0,
          }}
          allowDuplicatedCategory={false}
        />
        <XAxis
          tickLine={false}
          axisLine={false}
          xAxisId="2"
          dataKey="year"
          tick={{
            fontFamily: 'Montserrat',
            fontWeight: 300,
            fontSize: '8px',
            color: '#6B7280',
            spacing: 0,
          }}
          allowDuplicatedCategory={false}
        />
        <YAxis
          dataKey="fiat_amount"
          tickFormatter={(value: number) => primitivesUtils.convertFiatAmountDisplay(value)}
          tick={{
            fontFamily: 'Montserrat',
            fontWeight: 300,
            fontSize: '8px',
            color: '#6B7280',
          }}
        />
        <Tooltip
          content={<CustomTooltip />}
          cursor={{ stroke: theme.palette.secondary.main, strokeDasharray: `5 5`, strokeWidth: 1 }}
        />
        {/* <CartesianGrid horizontal={false} stroke="#F0F0F0" /> */}
        <Line
          type="monotone"
          strokeLinecap="round"
          strokeWidth={3}
          style={{ strokeDasharray: `40% 60%` }}
          dataKey="fiat_amount"
          stroke="#006991"
          dot={false}
          legendType="none"
        />
        <Area
          activeDot={{ strokeWidth: 4, stroke: theme.palette.secondary.main }}
          type="monotone"
          dataKey="fiat_amount"
          stroke={theme.palette.secondary.main}
          strokeWidth={3}
          fillOpacity={1}
          fill="url(#colorUv)"
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
};
