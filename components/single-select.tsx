import { useRef, useState } from 'react';
import type { ChangeEvent, FC } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Checkbox, Divider, FormControlLabel, Menu, MenuItem, Typography } from '@mui/material';
import { ChevronDown as ChevronDownIcon } from '../icons/chevron-down';

interface SingleSelectProps<T> {
  label: string;
  onChange: (value: T | undefined) => void;
  options: { label: string; value: T }[];
  value: T | undefined;
  shouldShowClearButton?: boolean;
}

export const SingleSelect: <T>(props: SingleSelectProps<T>) => React.ReactElement = (props) => {
  const { label, onChange, options, value, shouldShowClearButton = false, ...other } = props;
  const anchorRef = useRef<HTMLButtonElement | null>(null);
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [selectedLabel, setSelectedLabel] = useState(label);

  const handleOpenMenu = (): void => {
    setOpenMenu(true);
  };

  const handleCloseMenu = (): void => {
    setOpenMenu(false);
    //workaround to unlock scroll fixed
    document.body.removeAttribute('style');
  };

  const handleChange = (label: string, val: typeof value): void => {
    onChange(val);
    setSelectedLabel(label);
    handleCloseMenu();
  };

  const handleClear = () => {
    onChange(undefined);
    setSelectedLabel(label);
    handleCloseMenu();
  };

  return (
    <Box>
      <Button
        color="inherit"
        endIcon={<ChevronDownIcon fontSize="small" />}
        onClick={handleOpenMenu}
        ref={anchorRef}
        {...other}
      >
        {selectedLabel}
      </Button>
      <Menu
        anchorEl={anchorRef.current}
        onClose={handleCloseMenu}
        open={openMenu}
        PaperProps={{ style: { width: 250 } }}
      >
        {options.map((option) => (
          <MenuItem key={JSON.stringify(option.value)} onClick={() => handleChange(option.label, option.value)}>
            <Typography variant={option.value === value ? 'h6' : 'body1'}>{option.label}</Typography>
          </MenuItem>
        ))}
        {shouldShowClearButton && (
          <Box>
            <Divider />
            <MenuItem onClick={handleClear}>
              <Typography variant="body2">Clear selection</Typography>
            </MenuItem>
          </Box>
        )}
      </Menu>
    </Box>
  );
};
