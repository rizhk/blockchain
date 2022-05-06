import { useCallback, useEffect, useState } from "react";
import type { NextPage } from "next";
import NextLink from "next/link";
import Head from "next/head";
import { format } from "date-fns";
import { Box, Button, Container, Grid, Link, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { transactionApi } from "../../../__fake-api__/transaction-api";
import { AuthGuard } from "../../../components/authentication/auth-guard";
import { DashboardLayout } from "../../../components/dashboard/dashboard-layout";
import { TransactionItems } from "../../../components/dashboard/transaction/transaction-items";
import { TransactionLogs } from "../../../components/dashboard/transaction/transaction-logs";
import { TransactionSummary } from "../../../components/dashboard/transaction/transaction-summary";
import { useMounted } from "../../../hooks/use-mounted";
import { Calendar as CalendarIcon } from "../../../icons/calendar";
import { ChevronDown as ChevronDownIcon } from "../../../icons/chevron-down";
import { PencilAlt as PencilAltIcon } from "../../../icons/pencil-alt";
import { gtm } from "../../../lib/gtm";
import type { Transaction } from "../../../types/transaction";

const TransactionDetails: NextPage = () => {
	const isMounted = useMounted();
	const [transaction, setTransaction] = useState<Transaction | null>(null);

	useEffect(() => {
		gtm.push({ event: "page_view" });
	}, []);

	const getTransaction = useCallback(async () => {
		try {
			const data = await transactionApi.getTransaction();

			if (isMounted()) {
				setTransaction(data);
			}
		} catch (err) {
			console.error(err);
		}
	}, [isMounted]);

	useEffect(
		() => {
			getTransaction();
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[]
	);

	if (!transaction) {
		return null;
	}

	return (
		<>
			<Head>
				<title>
					Dashboard: Transaction Details |{" "}
					{process.env.NEXT_PUBLIC_PAGE_TITLE_SUFFEX}
				</title>
			</Head>
			<Box
				component="main"
				sx={{
					flexGrow: 1,
					py: 8,
				}}>
				<Container maxWidth="md">
					<Box sx={{ mb: 4 }}>
						<NextLink href="/dashboard/transactions" passHref>
							<Link
								color="textPrimary"
								component="a"
								sx={{
									alignItems: "center",
									display: "flex",
								}}>
								<ArrowBackIcon
									fontSize="small"
									sx={{ mr: 1 }}
								/>
								<Typography variant="subtitle2">
									Transactions
								</Typography>
							</Link>
						</NextLink>
					</Box>
					<Box sx={{ mb: 4 }}>
						<Grid
							container
							justifyContent="space-between"
							spacing={3}>
							<Grid item>
								<Typography variant="h4">
									{transaction.number}
								</Typography>
								<Box
									sx={{
										alignItems: "center",
										display: "flex",
										ml: -1,
										mt: 1,
									}}>
									<Typography
										color="textSecondary"
										variant="body2"
										sx={{ ml: 1 }}>
										Placed on
									</Typography>
									<CalendarIcon
										color="action"
										fontSize="small"
										sx={{ ml: 1 }}
									/>
									<Typography variant="body2" sx={{ ml: 1 }}>
										{format(
											transaction.createdAt,
											"dd/MM/yyyy HH:mm"
										)}
									</Typography>
								</Box>
							</Grid>
							<Grid item sx={{ ml: -2 }}>
								<Button
									endIcon={<PencilAltIcon fontSize="small" />}
									variant="outlined"
									sx={{ ml: 2 }}>
									Edit
								</Button>
								<Button
									endIcon={
										<ChevronDownIcon fontSize="small" />
									}
									variant="contained"
									sx={{ ml: 2 }}>
									Action
								</Button>
							</Grid>
						</Grid>
					</Box>
					<TransactionSummary transaction={transaction} />
					<Box sx={{ mt: 4 }}>
						<TransactionItems
							transactionItems={transaction.items || []}
						/>
					</Box>
					<Box sx={{ mt: 4 }}>
						<TransactionLogs transaction={transaction} />
					</Box>
				</Container>
			</Box>
		</>
	);
};

TransactionDetails.getLayout = (page) => (
	<AuthGuard>
		<DashboardLayout>{page}</DashboardLayout>
	</AuthGuard>
);

export default TransactionDetails;
