import { ThemeOptions } from '@mui/material';
import { neutral } from './colors';

// Colors
const background = {
  default: '#F8F8F8',
  paper: '#FFFFFF',
};

const divider = '#E6E8F0';

const primary = {
  main: '#5048E5',
  light: '#FF5A04',
  dark: '#3832A0',
  contrastText: '#FFFFFF',
};

const secondary = {
  main: '#F34F1D',
  light: '#3FC79A',
  dark: '#0B815A',
  contrastText: '#FFFFFF',
};

const success = {
  main: '#14B8A6',
  light: '#43C6B7',
  dark: '#0E8074',
  contrastText: '#FFFFFF',
};

const info = {
  main: '#5048E5',
  light: '#828DF8',
  dark: '#3832A0',
  contrastText: '#FFFFFF',
};

const warning = {
  main: '#FFB020',
  light: '#FFBF4C',
  dark: '#B27B16',
  contrastText: '#FFFFFF',
};

const error = {
  main: '#D14343',
  light: '#DA6868',
  dark: '#922E2E',
  contrastText: '#FFFFFF',
};

const text = {
  primary: '#111827',
  secondary: '#6B7280',
  disabled: '#111827',
};

const gradient = {
  primary: 'linear-gradient(90deg, #BC043D 0%, #FF5A04 100%)',
  paper: 'linear-gradient(180deg, rgba(13, 0, 255, 0.062) 0%, rgba(0, 0, 0, 0) 100%)',
};

export const lightThemeOptions: ThemeOptions = {
  components: {
    MuiAlert: {
      styleOverrides: {
        standardSuccess: {
          backgroundColor: 'rgba(33, 150, 83, 0.1)',
          color: '#219653',
          fontWeight: 'bold',
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          backgroundColor: neutral[500],
          color: '#FFFFFF',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          '&.MuiButton-containedPrimary': {
            background: gradient.primary,
          },
          '&.MuiButton-containedInfo': {
            '&:hover': {
              background: info.dark,
            },
          },
          '&.MuiButton-containedSecondary': {
            '&:hover': {
              background: secondary.dark,
            },
          },
          '.MuiLoadingButton-loadingIndicator': {
            color: 'white',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          '&.MuiChip-filledDefault': {
            backgroundColor: neutral[200],
            '& .MuiChip-deleteIcon': {
              color: neutral[400],
            },
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& label': {
            color: text.primary,
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          '& label': {
            color: text.primary,
          },
          '&::placeholder': {
            opacity: 1,
            color: text.secondary,
          },
          '&.Mui-disabled': {
            borderColor: neutral[400],
            color: neutral[400],
            '-webkit-text-fill-color': neutral[400],
          },
        },
        root: {
          '&.Mui-disabled': {
            borderColor: neutral[400],
            color: neutral[400],
          },
          color: text.primary,
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: text.primary,
          '&.Mui-disabled': {
            borderColor: neutral[400],
            color: neutral[400],
            '-webkit-text-fill-color': neutral[400],
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: divider,
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          borderColor: divider,
          borderStyle: 'solid',
          borderWidth: 1,
        },
      },
    },
    MuiPopover: {
      styleOverrides: {
        paper: {
          borderColor: divider,
          borderStyle: 'solid',
          borderWidth: 1,
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        switchBase: {
          color: neutral[500],
        },
        track: {
          backgroundColor: neutral[400],
          opacity: 1,
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: `1px solid ${divider}`,
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: neutral[100],
          '.MuiTableCell-root': {
            color: neutral[700],
          },
        },
      },
    },
  },
  palette: {
    action: {
      active: neutral[500],
      focus: 'rgba(55, 65, 81, 0.12)',
      hover: 'rgba(55, 65, 81, 0.04)',
      selected: 'rgba(55, 65, 81, 0.08)',
      disabledBackground: 'rgba(55, 65, 81, 0.12)',
      disabled: 'rgba(55, 65, 81, 0.26)',
    },
    background,
    divider,
    error,
    info,
    mode: 'light',
    neutral,
    primary,
    secondary,
    success,
    text,
    warning,
  },
  shadows: [
    'none',
    '0px 1px 1px rgba(100, 116, 139, 0.06), 0px 1px 2px rgba(100, 116, 139, 0.1)',
    '0px 1px 2px rgba(100, 116, 139, 0.12)',
    '0px 1px 4px rgba(100, 116, 139, 0.12)',
    '0px 1px 5px rgba(100, 116, 139, 0.12)',
    '0px 1px 6px rgba(100, 116, 139, 0.12)',
    '0px 2px 6px rgba(100, 116, 139, 0.12)',
    '0px 3px 6px rgba(100, 116, 139, 0.12)',
    '0px 2px 4px rgba(31, 41, 55, 0.06), 0px 4px 6px rgba(100, 116, 139, 0.12)',
    '0px 5px 12px rgba(100, 116, 139, 0.12)',
    '0px 5px 14px rgba(100, 116, 139, 0.12)',
    '0px 5px 15px rgba(100, 116, 139, 0.12)',
    '0px 6px 15px rgba(100, 116, 139, 0.12)',
    '0px 7px 15px rgba(100, 116, 139, 0.12)',
    '0px 8px 15px rgba(100, 116, 139, 0.12)',
    '0px 9px 15px rgba(100, 116, 139, 0.12)',
    '0px 10px 15px rgba(100, 116, 139, 0.12)',
    '0px 12px 22px -8px rgba(100, 116, 139, 0.25)',
    '0px 13px 22px -8px rgba(100, 116, 139, 0.25)',
    '0px 14px 24px -8px rgba(100, 116, 139, 0.25)',
    '0px 10px 10px rgba(31, 41, 55, 0.04), 0px 20px 25px rgba(31, 41, 55, 0.1)',
    '0px 25px 50px rgba(100, 116, 139, 0.25)',
    '0px 25px 50px rgba(100, 116, 139, 0.25)',
    '0px 25px 50px rgba(100, 116, 139, 0.25)',
    '0px 25px 50px rgba(100, 116, 139, 0.25)',
  ],
};
