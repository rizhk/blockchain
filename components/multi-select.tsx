import { useEffect, useRef, useState } from 'react';
import type { ChangeEvent, FC } from 'react';
import PropTypes from 'prop-types';
import { Button, Checkbox, Divider, FormControlLabel, Menu, MenuItem } from '@mui/material';
import { ChevronDown as ChevronDownIcon } from '../icons/chevron-down';
import { useTranslation } from 'react-i18next';

interface MultiSelectProps {
  label: string;
  onChange?: (value: any[]) => void; // Same as type as the value received above
  options: { label: string; value: unknown }[];
  value: any[] | undefined; // This should accept string[], number[] or boolean[]
  upperOptions?: { label: string; value: unknown }[];
  onUpperChange?: (value: any) => void;
  upperValue?: any | undefined;
}

export const MultiSelect: FC<MultiSelectProps> = (props) => {
  const { label, onChange, options, value = [], upperOptions, onUpperChange, upperValue, ...other } = props;
  const anchorRef = useRef<HTMLButtonElement | null>(null);
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [newVal, setNewVal] = useState<any[]>(value);
  const [selectedLabel, setSelectedLabel] = useState(label);

  useEffect(() => {
    if (value && value.length != newVal.length) {
      setNewVal(value);
    }
  }, [value, value?.length]);

  const handleOpenMenu = (): void => {
    setOpenMenu(true);
  };

  const handleCloseMenu = (): void => {
    setOpenMenu(false);
    //workaround to unlock scroll fixed
    document.body.removeAttribute('style');
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    let newValue = [...newVal];

    if (event.target.checked) {
      if (event.target.value.includes(',')) {
        newValue = event.target.value.split(',');
      } else {
        newValue.push(event.target.value);
      }
    } else {
      if (event.target.value.includes(',')) {
        newValue = [];
      } else {
        newValue = newValue.filter((item) => event.target.value != item);
      }
    }

    setNewVal(newValue);
  };

  const { t } = useTranslation();

  return (
    <>
      <Button
        color="inherit"
        endIcon={<ChevronDownIcon fontSize="small" />}
        onClick={handleOpenMenu}
        ref={anchorRef}
        {...other}
      >
        {selectedLabel.length > 20 ? selectedLabel.substring(0, 20) + '...' : selectedLabel}
      </Button>
      <Menu
        anchorEl={anchorRef.current}
        onClose={handleCloseMenu}
        open={openMenu}
        PaperProps={{ style: { width: 250 } }}
      >
        {!upperOptions && (
          <MenuItem sx={{ py: 0 }}>
            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  checked={newVal.length == options.length}
                  onChange={handleChange}
                  value={options.map((o) => o.value)}
                  indeterminate={newVal.length > 0 && newVal.length < options.length}
                />
              }
              label={label}
              sx={{
                flexGrow: 1,
                mr: 0,
                p: 0,
              }}
            />
          </MenuItem>
        )}
        {upperOptions &&
          upperOptions.map((option) => (
            <MenuItem sx={{ py: 0 }} key={option.label}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={upperValue == option.value}
                    onChange={(_) => {
                      if (onUpperChange) {
                        onUpperChange(option.value);
                        setSelectedLabel(option.label);
                        handleCloseMenu();
                      }
                    }}
                    value={option.value}
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
        <Divider />
        {options.map((option) => (
          <MenuItem sx={{ py: 0 }} key={option.label}>
            <FormControlLabel
              control={
                <Checkbox checked={newVal?.includes(option.value)} onChange={handleChange} value={option.value} />
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
        <Divider />
        <MenuItem sx={{ display: 'flex', justifyContent: 'end' }}>
          <Button
            variant="contained"
            color="info"
            onClick={() => {
              onChange?.(newVal);
              if (newVal.length == options.length) {
                setSelectedLabel(label);
              } else {
                setSelectedLabel(
                  options
                    .filter((o) => newVal?.find((n) => n == o.value))
                    .map((o) => o.label)
                    .join(', '),
                );
              }
              handleCloseMenu();
            }}
          >
            {t('components.multiSelect.confirm')}
          </Button>
        </MenuItem>
      </Menu>
    </>
  );
};

MultiSelect.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  options: PropTypes.array.isRequired,
  value: PropTypes.array.isRequired,
};
