import { Clear } from '@mui/icons-material';
import { DesktopDatePicker, LocalizationProvider } from '@mui/lab';
import { Box, TextField, Typography } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ChevronDown } from 'icons/chevron-down';
import * as React from 'react';

export interface IDatePickerProps {
  handleDateChange: (date: any, keyboardInputValue?: string | undefined) => void;
  value: Date | undefined;
  handleClear: () => void;
  label: string;
}

export const DatePicker: React.FC<IDatePickerProps> = ({ label, handleDateChange, value, handleClear }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box
        sx={{
          px: 1,
          '.MuiInputBase-root:not(.Mui-disabled):before, .MuiInputBase-root:not(.Mui-disabled):after, .MuiInputBase-root:hover:not(.Mui-disabled):before, .MuiInputBase-root:hover:not(.Mui-disabled):after':
            {
              border: 'none',
            },
        }}
      >
        <Typography display="block" variant="body2" sx={{ position: 'absolute', top: '1rem', fontSize: '0.75rem' }}>
          {label}
        </Typography>
        <DesktopDatePicker
          open={open}
          onOpen={() => {
            setOpen(true);
          }}
          onAccept={() => {
            setOpen(false);
          }}
          inputFormat="MM/dd/yyyy"
          value={value || null}
          onChange={handleDateChange}
          renderInput={({ InputProps, ...params }) => (
            <TextField
              {...params}
              sx={{
                '.MuiInputBase-input': {
                  width: '82px',
                  height: '20px',
                  fontWeight: ' 600',
                  fontSize: '14px',
                  lineHeight: '18px',
                  color: 'text.primary',
                },
              }}
              variant="standard"
              InputProps={{
                ...InputProps,
                endAdornment: (
                  <Box sx={{ cursor: 'pointer' }}>
                    <Clear sx={{ visibility: value ? 'visible' : 'hidden' }} onClick={handleClear} />
                    <ChevronDown onClick={() => setOpen(true)} />
                  </Box>
                ),
              }}
            />
          )}
        />
      </Box>
    </LocalizationProvider>
  );
};
