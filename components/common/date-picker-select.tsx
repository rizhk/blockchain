import { Box } from '@mui/system';
import { SingleSelect } from 'components/single-select';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { DatePicker } from './date-picker';

export interface IDatePickerSelectProps {
  defaultStartDate?: Date;
  defaultEndDate?: Date;
  label?: string;
  handleChangeDates: (fromDate: Date | undefined, toDate: Date | undefined) => void;
}

export const DatePickerSelect: React.FC<IDatePickerSelectProps> = ({
  defaultStartDate,
  defaultEndDate,
  handleChangeDates,
  label,
}) => {
  const { t } = useTranslation();
  const [range, setRange] = React.useState<string>();
  const [dates, setDates] = React.useState<{ startDate: Date | undefined; endDate: Date | undefined }>({
    startDate: defaultStartDate,
    endDate: defaultEndDate,
  });

  const handleChangeRange = (value: any | undefined) => {
    setRange(value);
    let date = new Date();

    if (value == '30d') {
      date.setDate(date.getDate() - 30);
    }
    if (value == '60d') {
      date.setDate(date.getDate() - 60);
    }
    if (value == '90d') {
      date.setDate(date.getDate() - 90);
    }
    if (value == '6m') {
      date.setMonth(date.getMonth() - 6);
    }
    if (value == '1y') {
      date.setFullYear(date.getFullYear() - 1);
    }

    setDates({ startDate: date, endDate: new Date() });
  };

  const handleClearStartDate = () => {
    setDates((prevDates) => {
      return { ...prevDates, startDate: undefined };
    });
  };
  const handleClearEndDate = () => {
    setDates((prevDates) => {
      return { ...prevDates, endDate: undefined };
    });
  };

  const handleChangeFromDate = (date: Date | undefined) => {
    setDates((prevDates) => {
      return { ...prevDates, startDate: date };
    });
  };
  const handleChangeToDate = (date: Date | undefined) => {
    setDates((prevDates) => {
      return { ...prevDates, endDate: date };
    });
  };

  React.useEffect(() => {
    handleChangeDates(dates.startDate, dates.endDate);
  }, [JSON.stringify(dates)]);

  return (
    <SingleSelect<string>
      onChange={handleChangeRange}
      label={label ?? t('common.options.time')}
      value={range}
      options={[
        { label: t('common.options.last30d'), value: '30d' },
        { label: t('common.options.last90d'), value: '90d' },
        { label: t('common.options.last6m'), value: '6m' },
        { label: t('common.options.lastYr'), value: '1y' },
        { label: t('common.options.custom'), value: 'c' },
      ]}
      additionalComponent={
        range == 'c' ? (
          <Box>
            <Box sx={{ px: 1, display: 'flex' }}>
              <DatePicker
                label={t('common.options.from').toUpperCase()}
                value={dates.startDate}
                handleDateChange={handleChangeFromDate}
                handleClear={handleClearStartDate}
              />
              <DatePicker
                label={t('common.transHis.to').toUpperCase()}
                value={dates.endDate}
                handleDateChange={handleChangeToDate}
                handleClear={handleClearEndDate}
              />
            </Box>
          </Box>
        ) : (
          <Box></Box>
        )
      }
    />
  );
};
