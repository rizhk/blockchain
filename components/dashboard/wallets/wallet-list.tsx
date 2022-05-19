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

interface WalletListProps {
	wallets: Wallet[];
	walletsCount: number;
}

export const WalletList: FC<WalletListProps> = (props) => {
	const { wallets, walletsCount } = props;
	return (
		<Box
			component="main"
			sx={{
				flexGrow: 1,
				py: 8,
			}}>
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
						<Grid item>{wallet.name}</Grid>;
					})}
				</Grid>
			</Container>
		</Box>
	);
};
