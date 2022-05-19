import { useCallback, useEffect, useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { AuthGuard } from "../../components/authentication/auth-guard";
import { DashboardLayout } from "../../components/dashboard/dashboard-layout";
import { gtm } from "../../lib/gtm";
import { useMounted } from "hooks/use-mounted";
import { walletApi } from "api/wallet-api";
import { Wallet } from "types/wallet";
import { WalletList } from "components/dashboard/wallets/wallet-list";
import { Box, Button, Container, Grid, Modal, Typography } from "@mui/material";
import { CreateWalletDialogs } from "components/dashboard/wallets/create-wallet-modal";

const Wallets: NextPage = () => {
	const isMounted = useMounted();
	const [wallets, setWallets] = useState<Wallet[]>([]);

	useEffect(() => {
		gtm.push({ event: "page_view" });
		getWallets();
	}, []);

	const getWallets = useCallback(async () => {
		try {
			const data = await walletApi.getWallets();

			if (isMounted()) {
				setWallets(data);
			}
		} catch (err) {
			console.error(err);
		}
	}, [isMounted]);

	return (
		<>
			<Head>
				<title>
					Dashboard: Wallets |{" "}
					{process.env.NEXT_PUBLIC_PAGE_TITLE_SUFFEX}
				</title>
			</Head>
			<Box
				component="main"
				sx={{
					flexGrow: 1,
					py: 8,
				}}>
				<WalletList wallets={wallets} walletsCount={wallets.length} />
				<Container>
					<Grid container>
						<CreateWalletDialogs />
					</Grid>
				</Container>
			</Box>
		</>
	);
};

Wallets.getLayout = (page) => (
	<AuthGuard>
		<DashboardLayout>{page}</DashboardLayout>
	</AuthGuard>
);

export default Wallets;
