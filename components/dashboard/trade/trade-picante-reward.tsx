import type { FC } from 'react';
import * as React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { LazyLoadImage } from 'react-lazy-load-image-component';

export const PicanteReward: FC = (props) => {
  const theme = useTheme();

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="rewards-select-label">Crypto</InputLabel>
      <Select id="rewards-select" value="PIC" label="Crypto" onChange={handleChange} disabled>
        <MenuItem value={'PIC'}>
          <LazyLoadImage
            className="icon"
            width="24"
            height="24"
            style={{
              verticalAlign: 'middle',
            }}
            src={process.env.NEXT_PUBLIC_URL + 'static/icons/cryptocurrency/svg/color/pica.svg'} // use normal <img> attributes as props
          />
          <span
            style={{
              padding: '0 10px',
              height: '24px',
              display: 'inline-block',
            }}
          >
            PIC
          </span>
        </MenuItem>
      </Select>
    </FormControl>
  );
};
