import { useRef, useState } from 'react';
import type { ChangeEvent, FC } from 'react';
import PropTypes from 'prop-types';
import { Button, Checkbox, Divider, FormControlLabel, Menu, MenuItem } from '@mui/material';
import { ChevronDown as ChevronDownIcon } from '../icons/chevron-down';
import { useTranslation } from 'react-i18next';

interface MultiSelectProps {
  label: string;
  onChange?: (value: any[]) => void; // Same as type as the value received above
  options: { label: string; value: unknown }[];
  value: any[]; // This should accept string[], number[] or boolean[]
}

export const MultiSelect: FC<MultiSelectProps> = (props) => {
  const { label, onChange, options, value = [], ...other } = props;
  const anchorRef = useRef<HTMLButtonElement | null>(null);
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [newVal, setNewVal] = useState<any[]>(value);

  const handleOpenMenu = (): void => {
    setOpenMenu(true);
  };

  const handleCloseMenu = (): void => {
    setOpenMenu(false);
    //workaround to unlock scroll fixed
    document.body.removeAttribute('style');
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    let newValue = [...value];

    if (event.target.checked) {
      for (const v of event.target.value.split(',')) {
        if (!newValue.find((n) => n == v)) {
          newValue.push(v);
        }
      }
    } else {
      newValue = newValue.filter((item) => !event.target.value.split(',').find((v) => v == item));
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
        {label}
      </Button>
      <Menu
        anchorEl={anchorRef.current}
        onClose={handleCloseMenu}
        open={openMenu}
        PaperProps={{ style: { width: 250 } }}
      >
        <MenuItem>
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
            }}
          />
        </MenuItem>
        <Divider />
        {options.map((option) => (
          <MenuItem key={option.label}>
            <FormControlLabel
              control={
                <Checkbox checked={newVal.includes(option.value)} onChange={handleChange} value={option.value} />
              }
              label={option.label}
              sx={{
                flexGrow: 1,
                mr: 0,
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
