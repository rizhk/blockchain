import { MenuItem } from '@mui/material';
import { Box } from '@mui/system';
import { FormSelect } from 'components/form-single-select';
import { SingleSelect } from 'components/single-select';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { isUndefined } from 'util';
import { primitivesUtils } from 'utils/primitives-utils';
import { DatePicker } from './date-picker';

export interface IDatePickerSelectProps {
  isFormInput?: boolean;
  defaultStartDate?: Date;
  defaultEndDate?: Date;
  defaultRange?: string;
  label?: string;
  handleChangeDates: (fromDate: Date | undefined, toDate: Date | undefined) => void;
}

export const DatePickerSelect: React.FC<IDatePickerSelectProps> = ({
  isFormInput = false,
  defaultStartDate,
  defaultEndDate,
  defaultRange,
  handleChangeDates,
  label,
}) => {
  const { t } = useTranslation();
  const [range, setRange] = React.useState<string | undefined>(defaultRange);
  const [dates, setDates] = React.useState<{ startDate: Date | undefined; endDate: Date | undefined }>({
    startDate: defaultStartDate,
    endDate: defaultEndDate,
  });

  const rangeOptions = [
    { label: t('common.options.last30d'), value: '30d' },
    { label: t('common.options.last90d'), value: '90d' },
    { label: t('common.options.last6m'), value: '6m' },
    { label: t('common.options.lastYr'), value: '1y' },
    { label: t('common.options.custom'), value: 'c' },
  ];

  const displayLabel = defaultRange
    ? primitivesUtils.getItemInArrayByKey(rangeOptions, 'value', defaultRange)?.item?.label
    : undefined;

  const handleChangeRange = (value: any | undefined) => {
    setRange(value);
    const { startDate, endDate } = primitivesUtils.getStartEndDateByRange(value);

    setDates({ startDate: startDate, endDate: endDate });
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

  if (isFormInput) {
    return (
      <FormSelect<string>
        onChange={handleChangeRange}
        label={label ?? t('common.options.time')}
        value={range}
        topMenuItemOption={{ label: t('common.options.time'), value: 'null' }}
        options={[
          { label: t('common.options.last30d'), value: '30d' },
          { label: t('common.options.last90d'), value: '90d' },
          { label: t('common.options.last6m'), value: '6m' },
          { label: t('common.options.lastYr'), value: '1y' },
          { label: t('common.options.custom'), value: 'c' },
        ]}
        additionalComponent={
          range == 'c' ? (
            <Box sx={{ px: 1, display: 'flex' }}>
              <DatePicker
                label={t('common.options.from').toUpperCase()}
                value={dates.startDate}
                handleDateChange={handleChangeFromDate}
                handleClear={handleClearStartDate}
              />
              <DatePicker
                label={t('common.options.to').toUpperCase()}
                value={dates.endDate}
                handleDateChange={handleChangeToDate}
                handleClear={handleClearEndDate}
              />
            </Box>
          ) : (
            <Box></Box>
          )
        }
      />
    );
  }

  return (
    <SingleSelect<string>
      isFormInput={isFormInput}
      onChange={handleChangeRange}
      defaultSelectedLabel={displayLabel}
      label={t('common.options.time')}
      labelValue={undefined}
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
                label={t('common.options.to').toUpperCase()}
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
