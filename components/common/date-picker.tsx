import { Clear } from '@mui/icons-material';
import { DesktopDatePicker, LocalizationProvider } from '@mui/lab';
import { Box, TextField, Typography } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Calendar } from 'icons/calendar';
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
        <Typography display="block" variant="body2" sx={{ fontSize: '0.75rem' }}>
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
          inputFormat="dd/MM/yyyy"
          value={value || null}
          onChange={handleDateChange}
          renderInput={({ inputProps, InputProps, ...params }) => (
            <TextField
              {...params}
              variant="outlined"
              size="small"
              inputProps={{
                ...inputProps,
                sx: { px: 1 },
              }}
              InputProps={{
                ...InputProps,
                sx: { pr: 1, fontSize: '0.75rem' },
                endAdornment: (
                  <Box sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                    {/* <Clear sx={{ visibility: value ? 'visible' : 'hidden' }} onClick={handleClear} /> */}
                    <Calendar fontSize="small" onClick={() => setOpen(true)} />
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
