import type { FC } from 'react';
import * as React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { LazyLoadImage } from 'react-lazy-load-image-component';

export const CryptoSelector: FC = (props) => {
  const theme = useTheme();

  const [value, setValue] = React.useState('USDC');

  const handleChange = (_event: any, newValue: React.SetStateAction<string>) => {
    setValue(newValue);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="crypto-select-label">Crypto</InputLabel>
      <Select id="crypto-select" value="USDC" label="Crypto" onChange={handleChange} disabled>
        <MenuItem
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
          value={'USDC'}
        >
          <LazyLoadImage
            className="icon"
            width="24"
            height="24"
            style={{
              verticalAlign: 'middle',
            }}
            src={process.env.NEXT_PUBLIC_URL + 'static/icons/cryptocurrency/svg/color/usdc.svg'} // use normal <img> attributes as props
          />
          <span
            style={{
              padding: '0 10px',
              height: '24px',
              display: 'inline-block',
            }}
          >
            &nbsp;USDC
          </span>
        </MenuItem>
      </Select>
    </FormControl>
  );
};
