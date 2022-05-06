import type { ChangeEvent, FC, MouseEvent } from "react";
import PropTypes from "prop-types";
import { format } from "date-fns";
import numeral from "numeral";
import {
	Box,
	Table,
	TableBody,
	TableCell,
	TablePagination,
	TableRow,
	Typography,
} from "@mui/material";
import type { Transaction } from "../../../types/transaction";
import { SeverityPill } from "../../severity-pill";
import type { SeverityPillColor } from "../../severity-pill";

interface TransactionListTableProps {
	onOpenDrawer?: (transactionId: string) => void;
	onPageChange: (
		event: MouseEvent<HTMLButtonElement> | null,
		newPage: number
	) => void;
	onRowsPerPageChange?: (event: ChangeEvent<HTMLInputElement>) => void;
	transactions: Transaction[];
	transactionsCount: number;
	page: number;
	rowsPerPage: number;
}

const severityMap: { [key: string]: SeverityPillColor } = {
	complete: "success",
	pending: "info",
	canceled: "warning",
	rejected: "error",
};

export const TransactionListTable: FC<TransactionListTableProps> = (props) => {
	const {
		onOpenDrawer,
		onPageChange,
		onRowsPerPageChange,
		transactions,
		transactionsCount,
		page,
		rowsPerPage,
		...other
	} = props;

	return (
		<div {...other}>
			<Table>
				<TableBody>
					{transactions.map((transaction) => (
						<TableRow
							hover
							key={transaction.id}
							onClick={() => onOpenDrawer?.(transaction.id)}
							sx={{ cursor: "pointer" }}>
							<TableCell
								sx={{
									alignItems: "center",
									display: "flex",
								}}>
								<Box
									sx={{
										backgroundColor: (theme) =>
											theme.palette.mode === "dark"
												? "neutral.800"
												: "neutral.200",
										btransactionRadius: 2,
										maxWidth: "fit-content",
										ml: 3,
										p: 1,
									}}>
									<Typography
										align="center"
										variant="subtitle2">
										{format(
											transaction.createdAt,
											"LLL"
										).toUpperCase()}
									</Typography>
									<Typography align="center" variant="h6">
										{format(transaction.createdAt, "d")}
									</Typography>
								</Box>
								<Box sx={{ ml: 2 }}>
									<Typography variant="subtitle2">
										{transaction.number}
									</Typography>
									<Typography
										color="textSecondary"
										variant="body2">
										Total of{" "}
										{numeral(
											transaction.totalAmount
										).format(
											`${transaction.currency}0,0.00`
										)}
									</Typography>
								</Box>
							</TableCell>
							<TableCell align="right">
								<SeverityPill
									color={
										severityMap[transaction.status] ||
										"warning"
									}>
									{transaction.status}
								</SeverityPill>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
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
	onOpenDrawer: PropTypes.func,
	onPageChange: PropTypes.func.isRequired,
	onRowsPerPageChange: PropTypes.func,
	transactions: PropTypes.array.isRequired,
	transactionsCount: PropTypes.number.isRequired,
	page: PropTypes.number.isRequired,
	rowsPerPage: PropTypes.number.isRequired,
};
