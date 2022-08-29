import { useRef, useState } from 'react';
import type { ChangeEvent, FC } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Menu,
  MenuItem,
  Radio,
  SxProps,
  Theme,
  Typography,
} from '@mui/material';
import { ChevronDown as ChevronDownIcon } from '../icons/chevron-down';
import { useTranslation } from 'react-i18next';

interface SingleSelectProps<T> {
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

export const SingleSelect: <T>(props: SingleSelectProps<T>) => React.ReactElement = (props) => {
  const {
    small = false,
    labelProps,
    label,
    defaultSelectedLabel,
    onChange,
    options,
    value,
    shouldShowClearButton = false,
    hideAll = false,
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

  const handleClear = () => {
    setSelected(undefined);
    onChange(undefined);
    setSelectedLabel(label);
    handleCloseMenu();
  };

  const { t } = useTranslation();

  return (
    <Box>
      <Button
        color="inherit"
        endIcon={<ChevronDownIcon fontSize="small" />}
        onClick={handleOpenMenu}
        ref={anchorRef}
        sx={[small && { py: 0 }]}
        {...other}
      >
        {selectedLabel}
      </Button>
      <Menu
        anchorEl={anchorRef.current}
        onClose={handleCloseMenu}
        open={openMenu}
        PaperProps={{ style: { width: 280 } }}
      >
        <MenuItem sx={{ py: 0 }}>
          <FormControlLabel
            control={
              !hideAll ? (
                <Checkbox color="primary" checked={!value} onChange={handleClear} />
              ) : (
                <Box sx={{ px: 1 }}></Box>
              )
            }
            label={label}
            sx={{
              flexGrow: 1,
              mr: 0,
              p: 0,
            }}
          />
        </MenuItem>
        <Divider />
        {options.map((option) => (
          <MenuItem sx={{ py: 0 }} key={JSON.stringify(option.value)}>
            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  checked={selected == option.value}
                  onChange={(_) => handleChange(option.label, option.value)}
                />
              }
              label={option.label}
              sx={{
                flexGrow: 1,
                mr: 0,
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
      </Menu>
    </Box>
  );
};
