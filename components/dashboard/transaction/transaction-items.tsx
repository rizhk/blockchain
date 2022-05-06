import type { FC } from "react";
import PropTypes from "prop-types";
import numeral from "numeral";
import {
	Box,
	Card,
	CardHeader,
	Divider,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TablePagination,
	TableRow,
	Typography,
} from "@mui/material";
import type { TransactionItem } from "../../../types/transaction";
import { Scrollbar } from "../../scrollbar";

interface TransactionItemsProps {
	transactionItems: TransactionItem[];
}

export const TransactionItems: FC<TransactionItemsProps> = (props) => {
	const { transactionItems, ...other } = props;

	return (
		<Card {...other}>
			<CardHeader title="Transaction items" />
			<Divider />
			<Scrollbar>
				<Box sx={{ minWidth: 700 }}>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>Description</TableCell>
								<TableCell>Billing Cycle</TableCell>
								<TableCell>Amount</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{transactionItems.map((item) => (
								<TableRow key={item.id}>
									<TableCell>
										<Typography variant="subtitle2">
											{item.name} x {item.quantity}
										</Typography>
									</TableCell>
									<TableCell>{item.billingCycle}</TableCell>
									<TableCell>
										{numeral(item.unitAmount).format(
											`${item.currency}0,0.00`
										)}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</Box>
			</Scrollbar>
			<TablePagination
				component="div"
				count={transactionItems.length}
				onPageChange={(): void => {}}
				onRowsPerPageChange={(): void => {}}
				page={0}
				rowsPerPage={5}
				rowsPerPageOptions={[5, 10, 25]}
			/>
		</Card>
	);
};

TransactionItems.propTypes = {
	transactionItems: PropTypes.array.isRequired,
};
