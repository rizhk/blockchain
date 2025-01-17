import { useRef, useState } from 'react';
import type { ChangeEvent, FC } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  InputLabel,
  Menu,
  MenuItem,
  Radio,
  Select,
  SxProps,
  Theme,
  Typography,
} from '@mui/material';
import { ChevronDown as ChevronDownIcon } from '../icons/chevron-down';
import { useTranslation } from 'react-i18next';

interface SortByProps<T> {
  isFormInput?: boolean;
  labelValue?: T | undefined;
  label: string;
  defaultSelectedLabel: string | undefined;
  onChange: (value: T | undefined) => void;
  options: { label: string; value: T }[];
  value: T | undefined;
  shouldShowClearButton?: boolean;
  labelProps?: React.ComponentProps<typeof Typography>;
  small?: boolean;
  additionalComponent?: React.ReactElement;
  hideAll?: boolean;
}

export const SortBy: <T>(props: SortByProps<T>) => React.ReactElement = (props) => {
  const {
    isFormInput = false,
    labelValue,
    small = false,
    labelProps,
    label,
    defaultSelectedLabel,
    onChange,
    options,
    value,
    shouldShowClearButton = false,
    hideAll = true,
    ...other
  } = props;
  const anchorRef = useRef<HTMLButtonElement | null>(null);
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [selectedLabel, setSelectedLabel] = useState(defaultSelectedLabel ?? label);
  const [selected, setSelected] = useState(value);

  const handleOpenMenu = (): void => {
    setOpenMenu(true);
  };

  const handleCloseMenu = (): void => {
    setOpenMenu(false);
    //workaround to unlock scroll fixed
    document.body.removeAttribute('style');
  };

  const handleChange = (label: string, val: typeof value): void => {
    setSelected(val);
    setSelectedLabel(label);
    onChange(val);
    if (!props.additionalComponent) {
      handleCloseMenu();
    }
  };

  const handleClear = (label: string, val: typeof value) => {
    setSelected(val);
    onChange(val);
    setSelectedLabel(label);
    handleCloseMenu();
  };

  const handleChangeSelect = (event: any) => {
    setSelected(event.target.value);
  };

  const { t } = useTranslation();

  const MenuItems = (
    <>
      {options.map((option) => (
        <MenuItem key={JSON.stringify(option.value)} value={option.value as any}>
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                checked={selected == option.value}
                onChange={(_) => handleChange(option.label, option.value)}
                sx={{ display: 'none' }}
              />
            }
            label={<Typography variant="subtitle2">{option.label}</Typography>}
            sx={{
              flexGrow: 1,
              m: 0,
              p: 0,
            }}
          />
        </MenuItem>
      ))}
      <Box>{props.additionalComponent}</Box>
      {/* {shouldShowClearButton && (
          <Box>
            <Divider />
            <MenuItem onClick={handleClear}>
              <Typography variant="body2">Clear selection</Typography>
            </MenuItem>
          </Box>
          
        )} */}
    </>
  );

  if (isFormInput) {
    return (
      <>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select<typeof value>
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selected}
          label={'Age'}
          onChange={handleChangeSelect}
        >
          {MenuItems}
        </Select>
      </>
    );
  }

  return (
    <Box>
      <Button
        color="inherit"
        endIcon={<ChevronDownIcon fontSize="small" />}
        onClick={handleOpenMenu}
        ref={anchorRef}
        sx={[small && { py: 0 }]}
        {...other}
        className="selector"
      >
        {selectedLabel}
      </Button>
      <Menu
        anchorEl={anchorRef.current}
        onClose={handleCloseMenu}
        open={openMenu}
        PaperProps={{
          style: {
            width: 196,
            paddingTop: '8px',
            border: '1px solid rgba(230, 232, 240, 0.7)',
            boxShadow: '0px 9px 15px rgba(100, 116, 139, 0.3)',
            borderRadius: '8px',
          },
        }}
      >
        {MenuItems}
      </Menu>
    </Box>
  );
};
