import type { FC } from 'react';
import * as React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import ReactCountryFlag from 'react-country-flag';
import { useTranslation } from 'react-i18next';

export const CurrencySelector: FC = (props) => {
  const theme = useTheme();

  const { t } = useTranslation();

  const [value, setValue] = React.useState('USD');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="curreny-select-label">{t('portfolio.preferCurrency')}</InputLabel>
      <Select id="currency-select" value="USD" label="Currency" onChange={handleChange} disabled>
        <MenuItem value={'USD'}>
          <span
            style={{
              padding: '0 10px',
              height: '24px',
              display: 'inline-block',
            }}
          >
            USD ($)
          </span>
        </MenuItem>
      </Select>
    </FormControl>
  );
};
