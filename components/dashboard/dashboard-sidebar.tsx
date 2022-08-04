import { ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import type { FC } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import type { TFunction } from 'react-i18next';
import { Box, Button, Chip, Divider, Drawer, Typography, useMediaQuery } from '@mui/material';
import type { Theme } from '@mui/material';
import { Logo } from '../logo';
import { Scrollbar } from '../scrollbar';
import { DashboardSidebarSection } from './dashboard-sidebar-section';
import { OrganizationPopover } from './organization-popover';
import { LazyLoadImage } from 'react-lazy-load-image-component';

//Icon Imports
import { Home as HomeIcon } from '../../icons/home';
import { HomeFilled as HomeIconFilled } from '../../icons/home-filled';
import { Transaction as TransactionIcon } from '../../icons/transaction';
import { TransactionFilled as TransactionIconFilled } from '../../icons/transaction-filled';
import { Wallet as WalletIcon } from '../../icons/wallet';
import { WalletFilled as WalletIconFilled } from '../../icons/wallet-filled';
import { Bank as BankIcon } from 'icons/bank';
import { BankFilled as BankIconFilled } from 'icons/bank-filled';
import { Settings as SettingsIcon } from '../../icons/settings';
import { SettingsFilled as SettingsIconFilled } from '../../icons/settings-filled';
import { UserCircle as UserCircleIcon } from '../../icons/user-circle';
import { Invite as InviteIcon } from '../../icons/invite';
import { InviteFilled as InviteIconFilled } from '../../icons/invite-filled';
import { Reports as ReportsIcon } from '../../icons/reports';
import { ReportsFilled as ReportsIconFilled } from '../../icons/reports-filled';
import { ForDevelopers as ForDevelopersIcon } from '../../icons/for-developers';
import { ForDevelopersFilled as ForDevelopersIconFilled } from '../../icons/for-developers-filled';
import { Help as HelpIcon } from '../../icons/help';
import { HelpFilled as HelpIconFilled } from '../../icons/help-filled';
import { Knowledgebase as KnowledgebaseIcon } from '../../icons/knowledgebase';
import { KnowledgebaseFilled as KnowledgebaseIconFilled } from '../../icons/knowledgebase-filled';
import { News as NewsIcon } from '../../icons/news';
import { NewsFilled as NewsIconFilled } from '../../icons/news-filled';
import { useAuth } from 'hooks/use-auth';
import { Briefcase } from 'icons/briefcase';
import { PortfolioFilled } from 'icons/portfolio-filled';
import { Portfolio as PortfolioIcon } from 'icons/portfolio';
interface DashboardSidebarProps {
  onClose?: () => void;
  open?: boolean;
}

interface Item {
  title: string;
  children?: Item[];
  chip?: ReactNode;
  icon?: ReactNode;
  iconFilled?: ReactNode;
  path?: string;
}

interface Section {
  title: string;
  items: Item[];
}

const getSections = (t: TFunction): Section[] => [
  {
    title: t('menu.portfolio'),
    items: [
      // {
      //   title: t('menu.overview'),
      //   path: '/dashboard',
      //   icon: <HomeIcon fontSize="small" />,
      //   iconFilled: <HomeIconFilled fontSize="small" />,
      // },
      {
        title: t('menu.overview'),
        icon: <PortfolioIcon fontSize="small" />,
        path: '/dashboard/portfolio',
        iconFilled: <PortfolioFilled fontSize="small" />,
      },
      {
        title: t('menu.transactions'),
        icon: <TransactionIcon fontSize="small" />,
        path: '/dashboard/portfolio/transaction-history',
        iconFilled: <TransactionIconFilled fontSize="small" />,
      },
      // {
      //   title: t('menu.transactions'),
      //   icon: <TransactionIcon fontSize="small" />,
      //   path: '/dashboard/transactions',
      //   iconFilled: <TransactionIconFilled fontSize="small" />,
      // },
      {
        title: t('menu.wallets'),
        icon: <WalletIcon fontSize="small" />,
        path: '/dashboard/portfolio/wallet',
        iconFilled: <WalletIconFilled fontSize="small" />,
      },
      // {
      //   title: t('menu.wallets'),
      //   icon: <WalletIcon fontSize="small" />,
      //   path: '/dashboard/wallets',
      //   iconFilled: <WalletIconFilled fontSize="small" />,
      // },
      // {
      //   title: t('menu.bankAccounts'),
      //   icon: <BankIcon fontSize="small" />,
      //   path: '/dashboard/bank-accounts',
      //   iconFilled: <BankIconFilled fontSize="small" />,
      // },
      // {
      //   title: t('menu.settings'),
      //   path: '/dashboard/logistics',
      //   icon: <SettingsIcon fontSize="small" />,
      //   iconFilled: <SettingsIconFilled fontSize="small" />,
      // },
      // {
      //   title: t('menu.inviteAndEarn'),
      //   path: '/invite',
      //   icon: <InviteIcon fontSize="small" />,
      //   iconFilled: <InviteIconFilled fontSize="small" />,
      // },
      // {
      //   title: t('menu.reports'),
      //   path: '/reports',
      //   icon: <ReportsIcon fontSize="small" />,
      //   iconFilled: <ReportsIconFilled fontSize="small" />,
      // },
      // {
      //   title: t('menu.forDevelopers'),
      //   path: '/for-developers',
      //   icon: <ForDevelopersIcon fontSize="small" />,
      //   iconFilled: <ForDevelopersIconFilled fontSize="small" />,
      // },
      // {
      //   title: t('menu.help'),
      //   path: '/help',
      //   icon: <HelpIcon fontSize="small" />,
      //   iconFilled: <HelpIconFilled fontSize="small" />,
      // },
      // {
      //   title: t('menu.knowledgebase'),
      //   path: '/knowledgebase',
      //   icon: <KnowledgebaseIcon fontSize="small" />,
      //   iconFilled: <KnowledgebaseIconFilled fontSize="small" />,
      // },
      // {
      //   title: t('menu.news'),
      //   path: '/news',
      //   icon: <NewsIcon fontSize="small" />,
      //   iconFilled: <NewsIconFilled fontSize="small" />,
      // },
    ],
  },
];

export const DashboardSidebar: FC<DashboardSidebarProps> = (props) => {
  const { onClose, open } = props;
  const router = useRouter();
  const { t } = useTranslation();
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'), {
    noSsr: true,
  });
  const sections = useMemo(() => getSections(t), [t]);
  const organizationsRef = useRef<HTMLButtonElement | null>(null);
  const [openOrganizationsPopover, setOpenOrganizationsPopover] = useState<boolean>(false);

  const { user } = useAuth();

  const handlePathChange = () => {
    if (!router.isReady) {
      return;
    }

    if (open) {
      onClose?.();
    }
  };

  useEffect(
    handlePathChange,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.isReady, router.asPath],
  );

  const handleOpenOrganizationsPopover = (): void => {
    setOpenOrganizationsPopover(true);
  };

  const handleCloseOrganizationsPopover = (): void => {
    setOpenOrganizationsPopover(false);
  };

  const content = (
    <>
      <Scrollbar
        sx={{
          height: '100%',
          '& .simplebar-content': {
            height: '100%',
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
          }}
        >
          <div>
            <Box
              sx={{
                display: 'flex',
                p: 3,
                direction: 'row',
                alignItems: 'center',
              }}
            >
              <NextLink href="/dashboard" passHref>
                <a
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <LazyLoadImage
                    width="30"
                    height="30"
                    src={process.env.NEXT_PUBLIC_URL + 'picante-logo.svg'} // use normal <img> attributes as props
                  />
                  <Typography
                    sx={{
                      display: 'inline',
                      marginLeft: '10px',
                    }}
                  >
                    {user?.full_name}
                  </Typography>
                </a>
              </NextLink>
            </Box>
            {/* <Box sx={{ px: 2 }}>
              <Box
                onClick={handleOpenOrganizationsPopover}
                ref={organizationsRef}
                sx={{
                  alignItems: 'center',
                  backgroundColor: 'rgba(255, 255, 255, 0.04)',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  px: 3,
                  py: '11px',
                  borderRadius: 1
                }}
              >
                <div>
                  <Typography
                    color="inherit"
                    variant="subtitle1"
                  >
                    Acme Inc
                  </Typography>
                  <Typography
                    color="neutral.400"
                    variant="body2"
                  >
                    {t('Your tier')}
                    {' '}
                    : Premium
                  </Typography>
                </div>
                <SelectorIcon
                  sx={{
                    color: 'neutral.500',
                    width: 14,
                    height: 14
                  }}
                />
              </Box>
            </Box> */}
          </div>
          {/* <Divider
            sx={{
              borderColor: '#2D3748', // dark divider
              my: 3
            }}
          /> */}
          <Box sx={{ flexGrow: 1 }}>
            {sections.map((section) => (
              <DashboardSidebarSection
                key={section.title}
                path={router.asPath}
                sx={{
                  mt: 2,
                  '& + &': {
                    mt: 2,
                  },
                }}
                {...section}
              />
            ))}
          </Box>
          <Divider
            sx={{
              borderColor: '#2D3748', // dark divider
            }}
          />
          {/* <Box sx={{ p: 2 }}>
						<Typography color="neutral.100" variant="subtitle2">
							{t("Need Help?")}
						</Typography>
						<Typography color="neutral.500" variant="body2">
							{t("Check our docs")}
						</Typography>
						<NextLink href="/docs/welcome" passHref>
							<Button
								color="secondary"
								component="a"
								fullWidth
								sx={{ mt: 2 }}
								variant="contained">
								{t("Documentation")}
							</Button>
						</NextLink>
					</Box> */}
        </Box>
      </Scrollbar>
      <OrganizationPopover
        anchorEl={organizationsRef.current}
        onClose={handleCloseOrganizationsPopover}
        open={openOrganizationsPopover}
      />
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: 'neutral.900',
            borderRightColor: 'divider',
            borderRightStyle: 'solid',
            borderRightWidth: (theme) => (theme.palette.mode === 'dark' ? 1 : 0),
            color: '#FFFFFF',
            width: 240,
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: 'neutral.900',
          color: '#FFFFFF',
          width: 240,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

DashboardSidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
