import { ReactNode, useRef, useState } from 'react';
import type { ChangeEvent, FC } from 'react';
import { Box, Divider, FormControlLabel, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface FormSelectProps<T> {
  id?: string | number;
  label: string;
  onChange: (value: T | undefined) => void;
  options: { label: string; value: T }[];
  value: T | undefined;
  small?: boolean;
  additionalComponent?: React.ReactElement;
  multiple?: boolean;
  topMenuItemOption?: { label: string; value: T };
  menuItemValueToKeepMenuOpen?: T[];
}

export const FormSelect: <T>(props: FormSelectProps<T>) => React.ReactElement = (props) => {
  const {
    id,
    small = false,
    label,
    onChange,
    options,
    value,
    multiple = false,
    topMenuItemOption,
    menuItemValueToKeepMenuOpen,
  } = props;
  const [selected, setSelected] = useState(value);

  const handleChange = (val: typeof value) => {
    setSelected(val);
    onChange(val);
  };

  const { t } = useTranslation();

  return (
    <>
      <InputLabel>{label}</InputLabel>
      <Select<typeof value>
        size={small ? 'small' : 'medium'}
        multiple={multiple}
        id={id?.toString()}
        value={selected}
        label={label}
        onChange={(e) => {
          handleChange(e.target.value as typeof value);
        }}
      >
        {topMenuItemOption && (
          <MenuItem sx={{ py: 0 }} key={JSON.stringify(topMenuItemOption.value)} value={topMenuItemOption.value as any}>
            <FormControlLabel
              control={<Box sx={{ py: 3, px: 1 }}></Box>}
              label={topMenuItemOption.label}
              sx={{
                flexGrow: 1,
                mr: 0,
                p: 0,
              }}
            />
          </MenuItem>
        )}
        {topMenuItemOption && <Divider />}
        {options.map((option) => (
          <MenuItem
            onClickCapture={(e) => {
              handleChange(option.value);
              if (menuItemValueToKeepMenuOpen?.includes(option.value)) {
                e.stopPropagation();
              }
            }}
            sx={{ py: 0 }}
            key={JSON.stringify(option.value)}
            value={option.value as typeof value}
          >
            <FormControlLabel
              control={<Box sx={{ py: 3, px: 1 }}></Box>}
              label={option.label}
              sx={{
                flexGrow: 1,
                mr: 0,
                p: 0,
              }}
            />
          </MenuItem>
        ))}
        {props.additionalComponent}
      </Select>
    </>
  );
};
