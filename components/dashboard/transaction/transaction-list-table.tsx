import { ChangeEvent, Fragment, MouseEvent, useState } from "react";
import type { FC } from "react";
import numeral from "numeral";
import PropTypes from "prop-types";
import { toast } from "react-hot-toast";
import {
	Box,
	Button,
	CardContent,
	Divider,
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
import { ChevronDown as ChevronDownIcon } from "../../../icons/chevron-down";
import { ChevronRight as ChevronRightIcon } from "../../../icons/chevron-right";
import { DotsHorizontal as DotsHorizontalIcon } from "../../../icons/dots-horizontal";
import { Image as ImageIcon } from "../../../icons/image";
import type { Transaction } from "../../../types/transaction";
import { Scrollbar } from "../../scrollbar";
import { SeverityPill } from "../../severity-pill";

interface TransactionListTableProps {
	onPageChange: (
		event: MouseEvent<HTMLButtonElement> | null,
		newPage: number
	) => void;
	onRowsPerPageChange?: (event: ChangeEvent<HTMLInputElement>) => void;
	page: number;
	transactions: Transaction[];
	transactionsCount: number;
	rowsPerPage: number;
}

export const TransactionListTable: FC<TransactionListTableProps> = (props) => {
	const {
		onPageChange,
		onRowsPerPageChange,
		page,
		transactions,
		transactionsCount,
		rowsPerPage,
		...other
	} = props;
	const [openTransaction, setOpenTransaction] = useState<string | null>(null);

	const handleOpenTransaction = (transactionId: string): void => {
		setOpenTransaction((prevValue) =>
			prevValue === transactionId ? null : transactionId
		);
	};

	return (
		<div {...other}>
			<Scrollbar>
				<Table sx={{ maxWidth: 1200 }}>
					<TableHead>
						<TableRow>
							<TableCell />
							<TableCell width="25%">TYPE</TableCell>
							<TableCell width="25%">WALLET USED</TableCell>
							<TableCell>DATE (DD-MM-YY)</TableCell>
							<TableCell>AMOUNT</TableCell>
							<TableCell>STATUS</TableCell>
							<TableCell align="right"></TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{transactions.map((transaction) => {
							const open = transaction.id === openTransaction;

							return (
								<Fragment key={transaction.id}>
									<TableRow hover key={transaction.id}>
										<TableCell
											padding="checkbox"
											sx={{
												...(open && {
													position: "relative",
													"&:after": {
														position: "absolute",
														content: '" "',
														top: 0,
														left: 0,
														backgroundColor:
															"primary.main",
														width: 3,
														height: "calc(100% + 1px)",
													},
												}),
											}}
											width="25%">
											<IconButton
												onClick={() =>
													handleOpenTransaction(
														transaction.id
													)
												}>
												{open ? (
													<ChevronDownIcon fontSize="small" />
												) : (
													<ChevronRightIcon fontSize="small" />
												)}
											</IconButton>
										</TableCell>
										<TableCell width="25%">
											<Box
												sx={{
													alignItems: "center",
													display: "flex",
												}}>
												{process.env.NEXT_PUBLIC_URL +
												"static/icons/cryptocurrency/svg/color/usdc.svg" ? (
													<Box
														sx={{
															alignItems:
																"center",
															backgroundColor:
																"background.default",
															backgroundImage: `url(${
																process.env
																	.NEXT_PUBLIC_URL +
																"static/icons/cryptocurrency/svg/color/usdc.svg"
															})`,
															backgroundPosition:
																"center",
															backgroundSize:
																"cover",
															borderRadius: 1,
															display: "flex",
															height: 32,
															justifyContent:
																"center",
															overflow: "hidden",
															width: 32,
														}}
													/>
												) : (
													<Box
														sx={{
															alignItems:
																"center",
															backgroundColor:
																"background.default",
															borderRadius: 1,
															display: "flex",
															height: 80,
															justifyContent:
																"center",
															width: 80,
														}}>
														<ImageIcon fontSize="small" />
													</Box>
												)}
												<Box
													sx={{
														cursor: "pointer",
														ml: 2,
													}}>
													<Typography variant="subtitle2">
														{transaction.name}
													</Typography>
													<Typography
														color="textSecondary"
														variant="body2">
														in{" "}
														{
															transaction.transactionType
														}
													</Typography>
												</Box>
											</Box>
										</TableCell>
										<TableCell width="25%">
											<Typography
												color="textSecondary"
												variant="body2">
												Wallet
											</Typography>
										</TableCell>
										<TableCell>01-01-22</TableCell>
										<TableCell>
											{numeral(transaction.price).format(
												`${transaction.currency}0,0.00`
											)}
											<br />
											{numeral(transaction.price).format(
												`${transaction.currency}0,0.00`
											)}
										</TableCell>
										<TableCell>
											<SeverityPill
												color={
													transaction.status ===
													"published"
														? "success"
														: "info"
												}>
												{transaction.status}
											</SeverityPill>
										</TableCell>
										<TableCell align="right">
											<IconButton>
												<DotsHorizontalIcon fontSize="small" />
											</IconButton>
										</TableCell>
									</TableRow>
									{open && (
										<TableRow>
											<TableCell
												colSpan={7}
												sx={{
													pl: 7,
													pr: 7,
													position: "relative",
												}}>
												<CardContent>
													<Grid container spacing={3}>
														<Grid
															item
															md={8}
															xs={12}>
															<Typography variant="h6">
																Status
															</Typography>
															<Divider
																sx={{ my: 2 }}
															/>
														</Grid>
														<Grid
															item
															md={4}
															xs={12}>
															<Typography variant="h6">
																Date/Time
															</Typography>
															<Divider
																sx={{ my: 2 }}
															/>
														</Grid>
													</Grid>
												</CardContent>
												<Divider />
											</TableCell>
										</TableRow>
									)}
								</Fragment>
							);
						})}
					</TableBody>
				</Table>
			</Scrollbar>
			<TablePagination
				component="div"
				count={transactionsCount}
				onPageChange={onPageChange}
				onRowsPerPageChange={onRowsPerPageChange}
				page={page}
				rowsPerPage={rowsPerPage}
				rowsPerPageOptions={[5, 10, 25]}
			/>
		</div>
	);
};

TransactionListTable.propTypes = {
	transactions: PropTypes.array.isRequired,
	transactionsCount: PropTypes.number.isRequired,
	onPageChange: PropTypes.func.isRequired,
	onRowsPerPageChange: PropTypes.func,
	page: PropTypes.number.isRequired,
	rowsPerPage: PropTypes.number.isRequired,
};
