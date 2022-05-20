import { ChangeEvent, Fragment, MouseEvent, useState } from "react";
import type { FC } from "react";
import numeral from "numeral";
import PropTypes from "prop-types";
import {
	Box,
	Button,
	CardContent,
	Card,
	CardHeader,
	CardActions,
	Divider,
	Container,
	Grid,
	IconButton,
	InputAdornment,
	LinearProgress,
	MenuItem,
	Switch,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TablePagination,
	TableRow,
	TextField,
	Typography,
} from "@mui/material";
import type { Wallet } from "types/wallet";
import { walletApi } from "api/wallet-api";

interface WalletListProps {
	wallets: Wallet[];
	walletsCount: number;
	parentCallback: Wallet[];
}

export const WalletList: FC<WalletListProps> = (props) => {
	const { wallets, walletsCount } = props;

	const handleDelete = async (address: string) => {
		const success = await walletApi.remove(address);

		if (success) {
			const NewWallets = wallets.filter(
				(item) => item.address !== address
			);
			props.parentCallback(NewWallets);
		}
	};

	return (
		<Container maxWidth="xl">
			<Grid container spacing={4}>
				<Grid item>
					<Typography sx={{ mb: 2 }} variant="h6">
						Wallets list ({walletsCount})
					</Typography>
				</Grid>
			</Grid>
			<Grid container spacing={4}>
				{wallets.map((wallet) => {
					return (
						<Grid item>
							<Card
								sx={{
									p: 4,
									minWidth: "500px",
									maxWidth: "500px",
								}}>
								<Grid md={7} xs={12}></Grid>
								{wallet.name}
								<br />
								{wallet.address}
								<Grid md={5} xs={12}></Grid>
								<Grid
									container
									justifyContent="flex-end"
									alignItems="flex-end">
									<CardActions>
										<Button
											variant="outlined"
											sx={{
												borderColor: "neutral.400",
												color: "neutral.400",
												"&:hover": {
													borderColor: "neutral.400",
													backgroundColor:
														"background.paper",
													color: "neutral.400",
												},
											}}
											onClick={() => {
												handleDelete(wallet.address);
											}}>
											Remove
										</Button>
									</CardActions>
								</Grid>
							</Card>
						</Grid>
					);
				})}
			</Grid>
		</Container>
	);
};
