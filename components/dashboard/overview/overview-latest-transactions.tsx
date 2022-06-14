import * as React from "react";

import Card from "@mui/material/Card";
import InputBase from "@mui/material/InputBase";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import SearchIcon from "@mui/icons-material/Search";
import { format, subDays } from "date-fns";
import { SeverityPill } from "../../severity-pill";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { TransactionsListDetails } from "../transaction/transactions-list-details";
import {
	Filters,
	ProjectListFilters,
} from "../../../components/dashboard/transaction/transaction-list-filters";
import { TransactionListTable } from "../transaction/transaction-list-table";
import { transactionApi } from "api/transaction-api";
import { Transaction } from "ethers";
import { useMounted } from "hooks/use-mounted";
import { gtm } from "lib/gtm";

const applyFilters = (
	transactions: Transaction[],
	filters: Filters
): Transaction[] =>
	transactions.filter((transaction) => {
		if (filters.name) {
			const nameMatched = transaction.wallet_id
				.toLowerCase()
				.includes(filters.name.toLowerCase());

			if (!nameMatched) {
				return false;
			}
		}

		// It is possible to select multiple transactionType options
		if (filters.txn_type?.length > 0) {
			const transactionTypeMatched = filters.txn_type.includes(
				transaction.txn_type
			);

			if (!transactionTypeMatched) {
				return false;
			}
		}

		// It is possible to select multiple status options
		if (filters.status?.length > 0) {
			const statusMatched = filters.status.includes(transaction.status);

			if (!statusMatched) {
				return false;
			}
		}

		return true;
	});

const applyPagination = (
	transactions: Transaction[],
	page: number,
	rowsPerPage: number
): Transaction[] =>
	transactions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

export const OverviewLatestTransactions: React.FC = (props) => {
	const isMounted = useMounted();
	const [transactions, setTransactions] = React.useState<Transaction[]>([]);
	const [page, setPage] = React.useState<number>(0);
	const [rowsPerPage, setRowsPerPage] = React.useState<number>(5);
	const [filters, setFilters] = React.useState<Filters>({
		name: undefined,
		txn_type: [],
		status: [],
	});

	React.useEffect(() => {
		gtm.push({ event: "page_view" });
	}, []);

	const getTransactions = React.useCallback(async () => {
		try {
			const data = await transactionApi.getTransactions();

			if (isMounted()) {
				setTransactions(data);
			}
		} catch (err) {
			console.error(err);
		}
	}, [isMounted]);

	React.useEffect(
		() => {
			getTransactions();
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[]
	);

	const handleFiltersChange = (filters: Filters): void => {
		setFilters(filters);
	};

	const handlePageChange = (
		event: MouseEvent<HTMLButtonElement> | null,
		newPage: number
	): void => {
		setPage(newPage);
	};

	const handleRowsPerPageChange = (
		event: React.ChangeEvent<HTMLInputElement>
	): void => {
		setRowsPerPage(parseInt(event.target.value, 10));
	};

	// Usually query is done on backend with indexing solutions
	const filteredTransactions = applyFilters(transactions, filters);
	const paginatedTransactions = applyPagination(
		filteredTransactions,
		page,
		rowsPerPage
	);

	return (
		<>
			<Typography sx={{ mb: 2 }} variant="h6">
				Latest Transactions{" "}
			</Typography>
			<Card>
				<ProjectListFilters onChange={handleFiltersChange} />
				<TransactionListTable
					onPageChange={handlePageChange}
					onRowsPerPageChange={handleRowsPerPageChange}
					page={page}
					transactions={paginatedTransactions}
					transactionsCount={filteredTransactions.length}
					rowsPerPage={rowsPerPage}
				/>
			</Card>
		</>
	);
};
