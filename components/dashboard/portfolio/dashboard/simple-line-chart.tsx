import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const data = [
  {
    fiat_value: 100,
    fiat_currency: 'USB',
    token_symbol: 'ETH',
    crypto_amount: 10,
    date: '2022/09/01',
  },
  {
    fiat_value: 100,
    fiat_currency: 'USB',
    token_symbol: 'ETH',
    crypto_amount: 20,
    date: '2022/10/01',
  },
  {
    fiat_value: 100,
    fiat_currency: 'USB',
    token_symbol: 'ETH',
    crypto_amount: 10,
    date: '2022/11/01',
  },
];

const SimpleLineChart = () => {
  const [tooltip, setTooltip] = useState(null);
  const [point, setPoints] = useState(null);

  const CustomTooltip = ({ payload }) => {
    if (payload) {
      return (
        <div className="flex justify-center items-center bg-secondary-800 text-white w-40 h-32">
          <p>{payload[0]?.value}</p>
        </div>
      );
    }
    return null;
  };

  const updateTooltip = (e) => {
    let x = Math.round(e.cx);
    let y = Math.round(e.cy);

    tooltip.style.opacity = '1';
    tooltip.style.transform = `translate(${x}px, ${y}px)`;
    tooltip.childNodes[0].innerHTML = e.value;
  };

  const onChartMouseMove = (chart) => {
    if (chart.isTooltipActive) {
      if (point) {
        setPoints(point);
        updateTooltip(chart);
      }
    }
  };

  const onChartMouseLeave = (e) => {
    setPoints(null);
    updateTooltip(e);
  };

  return (
    <div className="flex caption2 flex-col ui-chart">
      <div className="ml-24 flex justify-center flex-col w-48 items-center mt-32 mb-10">
        <p className="caption2">Caption1</p>
        <p className="subheading2">Heading1</p>
      </div>
      <LineChart width={650} height={300} data={data}>
        <CartesianGrid verticalPoints={[65, 645]} opacity="0.6" />
        <XAxis tick={{ fill: 'black' }} axisLine={false} tickLine={false} dataKey="date" />
        <YAxis
          tickCount={7}
          axisLine={false}
          tickLine={false}
          tick={{ fill: 'black' }}
          type="number"
          domain={[0, 100]}
        />
        <Tooltip
          content={<CustomTooltip />}
          viewBox={{ x: 0, y: 0, width: 20, height: 20 }}
          cursor={false}
          position="top"
          wrapperStyle={{ display: 'hidden' }}
        />
        <Line
          strokeWidth={3}
          fill="#40C0C0"
          stroke="#40C0C0"
          dot={true}
          type="monotone"
          dataKey="crypto_amount"
          activeDot={(e) => {
            onChartMouseMove(e);
            onChartMouseLeave(e);
          }}
        />
      </LineChart>
      <div className="ui-chart-tooltip text-white flex items-center justify-center" ref={(ref) => setTooltip(ref)}>
        <div className="ui-chart-tooltip-content"></div>
      </div>
    </div>
  );
};

export default SimpleLineChart;
