import { useState } from 'react';
import type { FC, ReactNode } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Box, Button, Collapse, ListItem } from '@mui/material';
import type { ListItemProps } from '@mui/material';
import { ChevronDown as ChevronDownIcon } from '../../icons/chevron-down';
import { ChevronRight as ChevronRightIcon } from '../../icons/chevron-right';

interface DashboardSidebarItemProps extends ListItemProps {
  active?: boolean;
  children?: ReactNode;
  chip?: ReactNode;
  depth: number;
  icon?: ReactNode;
  iconFilled?: ReactNode;
  info?: ReactNode;
  open?: boolean;
  path?: string;
  title: string;
}

export const DashboardSidebarItem: FC<DashboardSidebarItemProps> = (props) => {
  const {
    children,
    chip,
    depth,
    icon,
    iconFilled,
    info,
    open: openProp,
    path,
    title,
    ...other
  } = props;


  const [open, setOpen] = useState<boolean>(!!openProp);
  const router = useRouter();

  const handleToggle = (): void => {
    setOpen((prevOpen) => !prevOpen);
  };

  let paddingLeft = 24;

  if (depth > 0) {
    paddingLeft = 32 + 8 * depth;
  }

  return (
  
    <ListItem
      disableGutters
      sx={{
        display: 'flex',
        mb: 0.5,
        py: 0,
        px: 2
      }}
    >
      <NextLink
        href={path as string}
        passHref
      >
        <Button
          component="a"
          startIcon={router.pathname == path ? iconFilled : icon}
          endIcon={chip}
          disableRipple
          // className={router.pathname == path ? "active" : ""}
          sx={{
            borderRadius: 1,
            color: '#D1D5DB',
            justifyContent: 'flex-start',
            pl: `${paddingLeft}px`,
            pr: 3,
            textAlign: 'left',
            textTransform: 'none',
            width: '100%',
            ...(router.pathname == path && {
              backgroundColor: 'rgba(255,255,255, 0.08)',
              color: 'secondary.main',
              fontWeight: 'fontWeightBold'
            }),
            '& startIcon': {
              color: router.pathname == path ? 'secondary.main' : 'neutral.400',
            },
            '&:hover':  {
              backgroundColor: '#202A44',
              color:'secondary.main'
            },

          }}
        >
          <Box sx={{ flexGrow: 1 }}>
            {title}
          </Box>
          {info}
        </Button>
      </NextLink>
    </ListItem>
  );
};

DashboardSidebarItem.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.node,
  depth: PropTypes.number.isRequired,
  icon: PropTypes.node,
  info: PropTypes.node,
  open: PropTypes.bool,
  path: PropTypes.string,
  title: PropTypes.string.isRequired
};

DashboardSidebarItem.defaultProps = {
  active: false,
  open: false
};
