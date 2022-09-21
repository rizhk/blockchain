import { Box, colors, Stack, Typography } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Cell, Customized, Label, LabelList, Pie, PieChart, ResponsiveContainer } from 'recharts';

interface BreakdownChartProps {
  items: {
    name: string;
    value: number;
    color: string;
  }[];
  total: string;
}

export const BreakdownChart: FC<BreakdownChartProps> = ({ items, total }) => {
  const { t } = useTranslation();
  return (
    <Box sx={{ position: 'relative' }}>
      <PieChart width={180} height={180}>
        <Pie
          data={items}
          dataKey="value"
          nameKey="name"
          startAngle={90}
          endAngle={-270}
          outerRadius={90}
          innerRadius={60}
        >
          {items.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
          {/* can use variant? */}
          <LabelList dataKey="name" position="inside" fontSize="0.625rem" fontWeight={400} />
        </Pie>
      </PieChart>
      <Stack sx={{ inset: 0 }} position="absolute" justifyContent="center" alignItems="center">
        <Typography variant="overline">{total}</Typography>
        <Typography variant="caption" color="#9CA3AF">
          {t('portfolio.breakdown.totalActivity')}
        </Typography>
      </Stack>
    </Box>
  );
};
