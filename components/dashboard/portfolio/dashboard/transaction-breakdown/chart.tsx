import { Box, colors, Stack, Typography } from '@mui/material';
import { useMemo } from 'react';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Cell, Customized, Label, LabelList, Pie, PieChart, ResponsiveContainer } from 'recharts';
import type { TransactionBreakdownItem } from 'types/portfolio';
import { primitivesUtils } from 'utils/primitives-utils';
interface BreakdownChartProps {
  items: (TransactionBreakdownItem & {
    color: string;
  })[];
  total: string;
}

export const BreakdownChart: FC<BreakdownChartProps> = ({ items, total }) => {
  const { t } = useTranslation();
  const itemsWithFormattedPercentage = useMemo(
    () => items.map((item) => ({ ...item, formattedPercentage: item.percentage.toFixed(0) + '%' })),
    [items],
  );
  return (
    <Box sx={{ position: 'relative' }}>
      <PieChart width={180} height={180}>
        <Pie
          data={itemsWithFormattedPercentage}
          dataKey="percentage"
          startAngle={90}
          endAngle={-270}
          outerRadius={90}
          innerRadius={60}
        >
          {items.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
          ))}
          {/* 
            stroke width affects label list
            also svg text seems to respect strokeWidth than fontWeight
           */}
          <LabelList dataKey="formattedPercentage" position="inside" fontSize="0.625rem" strokeWidth={0.5} />
        </Pie>
      </PieChart>
      <Stack sx={{ inset: '30px' }} position="absolute" justifyContent="center" alignItems="center">
        <Typography variant="overline" lineHeight={1.125}>
          {total}
        </Typography>
        <Typography variant="caption" color="#9CA3AF">
          {t('portfolio.breakdown.totalActivity')}
        </Typography>
      </Stack>
    </Box>
  );
};
