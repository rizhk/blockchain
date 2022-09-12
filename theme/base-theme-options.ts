import { ThemeOptions } from '@mui/material';

import { TypographyOptions } from '@mui/material/styles/createTypography';
import { neutral } from './colors';

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    subtitle3: true;
    caption2: true;
    textLink1: true;
    ctaText1: true;
  }
}

interface ExtendedTypographyOptions extends TypographyOptions {
  subtitle3: React.CSSProperties;
  caption2: React.CSSProperties;
  textLink1: React.CSSProperties;
  ctaText1: React.CSSProperties;
}

const typography: ExtendedTypographyOptions = {
  button: {
    fontWeight: 600,
  },
  fontFamily:
    '"Montserrat", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
  body1: {
    fontSize: '1rem',
    fontWeight: 400,
    lineHeight: 1.5,
  },
  body2: {
    fontSize: '0.875rem',
    fontWeight: 400,
    lineHeight: 1.57,
  },
  subtitle1: {
    fontSize: '1rem',
    fontWeight: 500,
    lineHeight: 1.75,
  },
  subtitle2: {
    fontSize: '0.875rem',
    fontWeight: 500,
    lineHeight: 1.57,
  },
  subtitle3: {
    color: neutral[400],
    fontSize: '0.857rem',
    fontWeight: 500,
    lineHeight: 1.57,
  },
  ctaText1: {
    color: neutral[700],
    fontSize: '1.15rem',
    fontWeight: 500,
    lineHeight: 1.57,
  },
  overline: {
    fontSize: '0.75rem',
    fontWeight: 600,
    letterSpacing: '0.5px',
    lineHeight: 2.5,
    textTransform: 'uppercase',
  },
  caption: {
    fontSize: '0.75rem',
    fontWeight: 400,
    lineHeight: 1.66,
  },
  caption2: {
    color: neutral[400],
    fontSize: '0.75rem',
    fontWeight: 400,
    lineHeight: 1.66,
  },
  textLink1: {
    fontSize: '0.75rem',
    fontWeight: 400,
    lineHeight: 1.66,
    textDecoration: 'underline',
  },
  h1: {
    fontWeight: 700,
    fontSize: '3.5rem',
    lineHeight: 1.375,
  },
  h2: {
    fontWeight: 700,
    fontSize: '3rem',
    lineHeight: 1.375,
  },
  h3: {
    fontWeight: 700,
    fontSize: '2.25rem',
    lineHeight: 1.375,
  },
  h4: {
    fontWeight: 700,
    fontSize: '2rem',
    lineHeight: 1.375,
  },
  h5: {
    fontWeight: 600,
    fontSize: '1.5rem',
    lineHeight: 1.375,
  },
  h6: {
    fontWeight: 600,
    fontSize: '1.125rem',
    lineHeight: 1.375,
  },
};

export const baseThemeOptions: ThemeOptions = {
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 1000,
      lg: 1200,
      xl: 1440,
    },
  },
  components: {
    MuiAvatar: {
      styleOverrides: {
        root: {
          fontSize: 14,
          fontWeight: 600,
          letterSpacing: 0,
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          color: '#fff',
          borderRadius: '4px',
          padding: '7px 7px 9px 16px',
          background: 'rgba(25, 25, 25, 0.9)',
          fontWeight: 400,
          fontSize: '0.625rem',
          marginLeft: '-30px',
          lineHeight: '157%',
        },
        arrow: {
          position: 'relative',
          overflow: 'visible',
          backgroundColor: '#2f2f2f',
          width: '1em',
          height: '1em',
          textAlign: 'left',
          borderTopRightRadius: '20%',
          margin: '0px 0px -12px 33px',
          transform: 'rotate(135deg) !important',
          '&::before': {
            content: '" "',
            width: '1em',
            height: '1em',
            borderTopRightRadius: '20%',
            transform: 'rotate(-135deg) skewX(-45deg) scale(1.414,.707) translate(0,-50%)',
            background: 'inherit',
            position: 'absolute',
            transformOrigin: 'unset !important',
          },
          '&::after': {
            content: '" "',
            width: '1em',
            height: '1em',
            borderTopRightRadius: '20%',
            transform: 'rotate(135deg) skewY(-45deg) scale(.707,1.414) translate(50%)',
            background: 'inherit',
            position: 'absolute',
          },
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          textTransform: 'none',
          '&.tabs:hover': {
            backgroundColor: 'transparent',
          },
        },
        sizeSmall: {
          padding: '6px 16px',
        },
        sizeMedium: {
          padding: '8px 20px',
        },
        sizeLarge: {
          padding: '11px 24px',
        },
        textSizeSmall: {
          padding: '7px 12px',
        },
        textSizeMedium: {
          padding: '9px 16px',
        },
        textSizeLarge: {
          padding: '12px 16px',
        },
      },
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiCardActions: {
      styleOverrides: {
        root: {
          padding: '16px 24px',
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: '12px',
          '&:last-child': {
            paddingBottom: '8px',
          },
        },
      },
    },
    MuiCardHeader: {
      defaultProps: {
        titleTypographyProps: {
          variant: 'h6',
        },
        subheaderTypographyProps: {
          variant: 'body2',
        },
      },
      styleOverrides: {
        root: {
          padding: '32px 24px',
        },
      },
    },
    MuiCheckbox: {
      defaultProps: {
        color: 'primary',
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        '*': {
          boxSizing: 'border-box',
        },
        html: {
          MozOsxFontSmoothing: 'grayscale',
          WebkitFontSmoothing: 'antialiased',
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100%',
          width: '100%',
        },
        body: {
          display: 'flex',
          flex: '1 1 auto',
          flexDirection: 'column',
          minHeight: '100%',
          width: '100%',
        },
        '#__next': {
          display: 'flex',
          flex: '1 1 auto',
          flexDirection: 'column',
          height: '100%',
          width: '100%',
        },
        '#nprogress': {
          pointerEvents: 'none',
        },
        '#nprogress .bar': {
          backgroundColor: '#5048E5',
          height: 3,
          left: 0,
          position: 'fixed',
          top: 0,
          width: '100%',
          zIndex: 2000,
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: 8,
        },
        sizeSmall: {
          padding: 4,
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 3,
          overflow: 'hidden',
        },
      },
    },
    MuiLink: {
      defaultProps: {
        underline: 'hover',
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          marginRight: '16px',
          '&.MuiListItemIcon-root': {
            minWidth: 'unset',
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          fontWeight: 500,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiPopover: {
      defaultProps: {
        elevation: 16,
      },
    },
    MuiRadio: {
      defaultProps: {
        color: 'primary',
      },
    },
    MuiSwitch: {
      defaultProps: {
        color: 'primary',
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          fontSize: 14,
          fontWeight: 500,
          lineHeight: 1.71,
          minWidth: 'auto',
          paddingLeft: 0,
          paddingRight: 0,
          textTransform: 'none',
          '& + &': {
            marginLeft: 24,
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: '15px 16px',
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          borderBottom: 'none',
          '& .MuiTableCell-root': {
            borderBottom: 'none',
            fontSize: '12px',
            fontWeight: 600,
            lineHeight: 1,
            letterSpacing: 0.5,
            textTransform: 'uppercase',
          },
          '& .MuiTableCell-paddingCheckbox': {
            paddingTop: 4,
            paddingBottom: 4,
          },
        },
      },
    },
  },
  direction: 'ltr',
  shape: {
    borderRadius: 8,
  },
  typography: typography,
  zIndex: {
    appBar: 1200,
    drawer: 1100,
  },
};
