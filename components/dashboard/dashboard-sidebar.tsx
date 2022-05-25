import { ReactNode, useEffect, useMemo, useRef, useState } from "react";
import type { FC } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import type { TFunction } from "react-i18next";
import {
	Box,
	Button,
	Chip,
	Divider,
	Drawer,
	Typography,
	useMediaQuery,
} from "@mui/material";
import type { Theme } from "@mui/material";
import { Logo } from "../logo";
import { Scrollbar } from "../scrollbar";
import { DashboardSidebarSection } from "./dashboard-sidebar-section";
import { OrganizationPopover } from "./organization-popover";
import { LazyLoadImage } from "react-lazy-load-image-component";

//Icon Imports
import { Home as HomeIcon } from "../../icons/home";
import { Transaction as TransactionIcon } from "../../icons/transaction";
import { Wallet as WalletIcon } from "../../icons/wallet";
import { Bank as BankIcon } from "icons/bank";
import { Settings as SettingsIcon } from "../../icons/settings";
import { UserCircle as UserCircleIcon } from "../../icons/user-circle";
import { Invite as InviteIcon } from "../../icons/invite";
import { Reports as ReportsIcon } from "../../icons/reports";
import { ForDevelopers as ForDevelopersIcon } from "../../icons/for-developers";
import { Help as HelpIcon } from "../../icons/help";
import { Knowledgebase as KnowledgebaseIcon } from "../../icons/knowledgebase";
import { News as NewsIcon } from "../../icons/news";
interface DashboardSidebarProps {
	onClose?: () => void;
	open?: boolean;
}

interface Item {
	title: string;
	children?: Item[];
	chip?: ReactNode;
	icon?: ReactNode;
	path?: string;
}

interface Section {
	title: string;
	items: Item[];
}

const getSections = (t: TFunction): Section[] => [
	{
		title: t(""),
		items: [
			{
				title: t("Overview"),
				path: "/dashboard",
				icon: <HomeIcon fontSize="small" />,
			},
			{
				title: t("Transactions"),
				icon: <TransactionIcon fontSize="small" />,
				path: "/dashboard/transactions",
			},
			{
				title: t("Wallets"),
				icon: <WalletIcon fontSize="small" />,
				path: "/dashboard/wallets",
			},
			{
				title: t("Bank accounts"),
				icon: <BankIcon fontSize="small" />,
				path: "/dashboard/bank-accounts",
			},
			{
			  title: t('Settings'),
			  path: '/dashboard/logistics',
			  icon: <SettingsIcon fontSize="small" />,

			},
			{
				title: t("Invite and earn"),
				path: "/",
				icon: <InviteIcon fontSize="small" />,
			},
			{
				title: t("Reports"),
				path: "/t",
				icon: <ReportsIcon fontSize="small" />,
			},
			{
				title: t("For developers"),
				path: "/dashboard/account",
				icon: <ForDevelopersIcon fontSize="small" />,
			},
			{
				title: t("Help"),
				path: "/dashboard/account",
				icon: <HelpIcon fontSize="small" />,
			},
			{
				title: t("Knowledgbase"),
				path: "/dashboard/account",
				icon: <KnowledgebaseIcon fontSize="small" />,
			},
			{
				title: t("News"),
				path: "/dashboard/account",
				icon: <NewsIcon fontSize="small" />,
			},
		],
	},
	
];

export const DashboardSidebar: FC<DashboardSidebarProps> = (props) => {
	const { onClose, open } = props;
	const router = useRouter();
	const { t } = useTranslation();
	const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("lg"), {
		noSsr: true,
	});
	const sections = useMemo(() => getSections(t), [t]);
	const organizationsRef = useRef<HTMLButtonElement | null>(null);
	const [openOrganizationsPopover, setOpenOrganizationsPopover] =
		useState<boolean>(false);

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
		[router.isReady, router.asPath]
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
					height: "100%",
					"& .simplebar-content": {
						height: "100%",
					},
				}}>
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						height: "100%",
						
					}}>
					<div>
		<Box sx={{ display:'flex', p: 3, direction:"row", alignItems:"center" }}>
							<NextLink href="/dashboard" passHref>
								<a>
									<LazyLoadImage
										width="30"
										height="30"
										src={
											process.env.NEXT_PUBLIC_URL +
											"picante-logo.svg"
										} // use normal <img> attributes as props
									/>
									<Typography sx={{display:"inline", marginLeft:'10px'}} >Jennie Kim</Typography>
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
									"& + &": {
										mt: 2,
									},
								}}
								{...section}
							/>
						))}
					</Box>
					<Divider
						sx={{
							borderColor: "#2D3748", // dark divider
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
						backgroundColor: "neutral.900",
						borderRightColor: "divider",
						borderRightStyle: "solid",
						borderRightWidth: (theme) =>
							theme.palette.mode === "dark" ? 1 : 0,
						color: "#FFFFFF",
						width: 240,
					},
				}}
				variant="permanent">
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
					backgroundColor: "neutral.900",
					color: "#FFFFFF",
					width: 240,
				},
			}}
			sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
			variant="temporary">
			{content}
		</Drawer>
	);
};

DashboardSidebar.propTypes = {
	onClose: PropTypes.func,
	open: PropTypes.bool,
};
