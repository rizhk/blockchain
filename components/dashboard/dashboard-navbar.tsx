import { useRef, useState } from 'react';
import type { FC } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  ButtonBase,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import type { AppBarProps } from '@mui/material';
import { Menu as MenuIcon } from '../../icons/menu';
import { Bell as BellIcon } from '../../icons/bell';
import { Search as SearchIcon } from '../../icons/search';
import { UserCircle as UserCircleIcon } from '../../icons/user-circle';
import { Users as UsersIcon } from '../../icons/users';
import { AccountPopover } from './account-popover';
import { ContactsPopover } from './contacts-popover';
import { ContentSearchDialog } from './content-search-dialog';
import { NotificationsPopover } from './notifications-popover';
import { LanguagePopover } from './language-popover';
import { useAuth } from 'hooks/use-auth';
import { nameInitials } from 'utils/profile';
import LogoutIcon from '@mui/icons-material/Logout';

interface DashboardNavbarProps extends AppBarProps {
  onOpenSidebar?: () => void;
}

type Language = 'en' | 'de' | 'es';

const languages: Record<Language, string> = {
  en: '/static/icons/uk_flag.svg',
  de: '/static/icons/de_flag.svg',
  es: '/static/icons/es_flag.svg',
};

const DashboardNavbarRoot = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  ...(theme.palette.mode === 'light'
    ? {
        boxShadow: theme.shadows[3],
      }
    : {
        backgroundColor: theme.palette.background.paper,
        borderBottomColor: theme.palette.divider,
        borderBottomStyle: 'solid',
        borderBottomWidth: 1,
        boxShadow: 'none',
      }),
}));

const LanguageButton = () => {
  const anchorRef = useRef<HTMLButtonElement | null>(null);
  const { i18n } = useTranslation();
  const [openPopover, setOpenPopover] = useState<boolean>(false);

  const handleOpenPopover = (): void => {
    setOpenPopover(true);
  };

  const handleClosePopover = (): void => {
    setOpenPopover(false);
  };

  return (
    <>
      <IconButton onClick={handleOpenPopover} ref={anchorRef} sx={{ ml: 1 }}>
        <Box
          sx={{
            display: 'flex',
            height: 20,
            width: 20,
            '& img': {
              width: '100%',
            },
          }}
        >
          <img alt="" src={languages[i18n.language as Language]} />
        </Box>
      </IconButton>
      <LanguagePopover anchorEl={anchorRef.current} onClose={handleClosePopover} open={openPopover} />
    </>
  );
};

const ContentSearchButton = () => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const handleOpenSearchDialog = (): void => {
    setOpenDialog(true);
  };

  const handleCloseSearchDialog = (): void => {
    setOpenDialog(false);
  };

  return (
    <>
      <Tooltip title="Search">
        <IconButton onClick={handleOpenSearchDialog} sx={{ ml: 1 }}>
          <SearchIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <ContentSearchDialog onClose={handleCloseSearchDialog} open={openDialog} />
    </>
  );
};

const ContactsButton = () => {
  const anchorRef = useRef<HTMLButtonElement | null>(null);
  const [openPopover, setOpenPopover] = useState<boolean>(false);

  const handleOpenPopover = (): void => {
    setOpenPopover(true);
  };

  const handleClosePopover = (): void => {
    setOpenPopover(false);
  };

  return (
    <>
      <Tooltip title="Contacts">
        <IconButton onClick={handleOpenPopover} sx={{ ml: 1 }} ref={anchorRef}>
          <UsersIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <ContactsPopover anchorEl={anchorRef.current} onClose={handleClosePopover} open={openPopover} />
    </>
  );
};

const NotificationsButton = () => {
  const anchorRef = useRef<HTMLButtonElement | null>(null);
  const [unread, setUnread] = useState<number>(0);
  const [openPopover, setOpenPopover] = useState<boolean>(false);
  // Unread notifications should come from a context and be shared with both this component and
  // notifications popover. To simplify the demo, we get it from the popover

  const handleOpenPopover = (): void => {
    setOpenPopover(true);
  };

  const handleClosePopover = (): void => {
    setOpenPopover(false);
  };

  const handleUpdateUnread = (value: number): void => {
    setUnread(value);
  };

  return (
    <>
      <Tooltip title="Notifications">
        <IconButton ref={anchorRef} sx={{ ml: 1 }} onClick={handleOpenPopover}>
          <Badge color="error" badgeContent={unread}>
            <BellIcon fontSize="small" />
          </Badge>
        </IconButton>
      </Tooltip>
      <NotificationsPopover
        anchorEl={anchorRef.current}
        onClose={handleClosePopover}
        onUpdateUnread={handleUpdateUnread}
        open={openPopover}
      />
    </>
  );
};

const AccountButton = () => {
  const anchorRef = useRef<HTMLButtonElement | null>(null);
  const [openPopover, setOpenPopover] = useState<boolean>(false);
  // To get the user from the authContext, you can use
  const { logout, user } = useAuth();
  const router = useRouter();

  // const user = {
  // 	avatar: "",
  // 	// avatar: '/static/mock-images/avatars/avatar-anika_visser.png',
  // 	name: "Anika Visser",
  // };

  const handleLogout = async (): Promise<void> => {
    try {
      await logout();
      router.push('/logout').catch(console.error);
    } catch (err) {
      console.error(err);
      toast.error('Unable to logout.');
    }
  };

  return (
    <>
      <Box
        ref={anchorRef}
        sx={{
          alignItems: 'center',
          display: 'flex',
          ml: 2,
        }}
      >
        <Avatar
          src={user && user?.profile_pic_url}
          sx={{
            height: 40,
            width: 40,
            backgroundColor: '#5048E5',
          }}
        ></Avatar>
        <Box
          sx={{
            ml: 3,
          }}
        >
          <Typography sx={{ color: '#9CA3AF', fontStyle: 'normal', fontWeight: 500, fontSize: '0.75rem' }}>
            {user?.email}
          </Typography>
        </Box>

        <Box
          sx={{
            ml: 3,
          }}
        >
          <ListItemText
            onClick={handleLogout}
            primary={
              <Typography
                sx={{
                  color: '#F34F1D',
                  fontStyle: 'normal',
                  fontWeight: 500,
                  fontSize: '0.75rem',
                  my: '0px',
                  cursor: 'pointer',
                }}
              >
                Logout
              </Typography>
            }
          />
        </Box>
      </Box>

      {/* <AccountPopover anchorEl={anchorRef.current} onClose={handleClosePopover} open={openPopover} /> */}
    </>
  );
};

export const DashboardNavbar: FC<DashboardNavbarProps> = (props) => {
  const { onOpenSidebar, ...other } = props;

  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async (): Promise<void> => {
    try {
      await logout();
      router.push('/logout').catch(console.error);
    } catch (err) {
      console.error(err);
      toast.error('Unable to logout.');
    }
  };

  return (
    <>
      <DashboardNavbarRoot
        sx={{
          left: {
            lg: 240,
          },
          width: {
            lg: 'calc(100% - 240px)',
          },
        }}
        {...other}
      >
        <Toolbar
          disableGutters
          sx={{
            minHeight: 64,
            left: 0,
            px: 2,
          }}
        >
          <IconButton
            onClick={onOpenSidebar}
            sx={{
              display: {
                xs: 'inline-flex',
                lg: 'none',
              },
            }}
          >
            <MenuIcon fontSize="small" />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />

          {/* <LanguageButton /> */}
          {/* <ContentSearchButton /> */}
          {/* <ContactsButton /> */}
          <AccountButton />
          <Box
            sx={{
              display: 'none',
              ml: 1,
            }}
          >
            <NotificationsButton />
          </Box>
        </Toolbar>
      </DashboardNavbarRoot>
    </>
  );
};

DashboardNavbar.propTypes = {
  onOpenSidebar: PropTypes.func,
};
