import { FC, useCallback, useEffect, useState } from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import SearchIcon from "@mui/icons-material/Search";
import CircleIcon from "@mui/icons-material/Circle";
import { borderColor } from "@mui/system";
import { useMounted } from "hooks/use-mounted";
import { transactionApi } from "api/transaction-api";
import { Transaction, TxnStep } from "types/transaction";

const CircleIconGreen: FC = (props) => (
	<CircleIcon color="success" fontSize="small" />
);

const CircleIconRed: FC = (props) => (
	<CircleIcon color="error" fontSize="small" />
);

const CircleIconGray: FC = (props) => (
	<CircleIcon color="disabled" fontSize="small" />
);

export const TransactionsListDetails: FC = (props) => {
	const isMounted = useMounted();

	const [steps, setSteps] = useState<TxnStep[]>([]);
	const [txn, setTxn] = useState<Transaction>(Object);

	useEffect(
		() => {
			getSteps(props);
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[]
	);

	const getSteps = useCallback(
		async (props) => {
			try {
				const data = await transactionApi.getTransaction(
					props.TransactionId
				);

				if (isMounted()) {
					setTxn(data);
					setSteps(data.details.reverse());
				}
			} catch (err) {
				console.error(err);
			}
		},
		[isMounted]
	);

	return (
		<Box sx={{ ml: "100px", mb: "25px" }}>
			<Grid container sx={{ pt: "30px", mb: 2 }}>
				<Grid
					item
					md={8}
					xs={10}
					sx={{
						borderBottom: "thin solid #ccc",
						paddingBottom: "10px",
					}}>
					<Typography display="inline-block" variant="body2">
						Status
					</Typography>
				</Grid>
				<Grid
					item
					sx={{
						borderBottom: "thin solid #ccc",
						paddingRight: "10px",
						marginLeft: "10px",
					}}>
					<Typography
						className="flex"
						display="inline-block"
						variant="body2">
						Date/Time
					</Typography>
				</Grid>
			</Grid>
			<Stepper orientation="vertical" sx={{ marginBottom: "10px" }}>
				{steps.map((step, index) => (
					<Step key={step.label}>
						<StepLabel
							StepIconComponent={
								step.icon_status === "CircleIconGreen"
									? CircleIconGreen
									: CircleIconGray
							}>
							<Grid container>
								<Grid item md={8} xs={10}>
									<Typography variant="body2">
										{step.label}
									</Typography>
									<Typography variant="subtitle2">
										{" "}
										{step.description}
									</Typography>
								</Grid>
								<Grid item md={3} xs={2}>
									<Typography
										display="inline"
										color="text.primary"
										variant="body2">
										{" "}
										25-07-2022
									</Typography>
									<Typography
										display="inline"
										color="text.secondary"
										variant="body2">
										{" "}
										21:09
									</Typography>
								</Grid>
							</Grid>
						</StepLabel>
					</Step>
				))}
			</Stepper>
			{txn.status == "in_progress" && (
				<Button variant="outlined" color="error">
					Cancel Transaction
				</Button>
			)}
		</Box>
	);
};

// --------   Variation 2     ---------------

// export const OverviewTransactionsDetails: FC = (props) => {
//   return (
//     <List>
//       {steps.map((step, index) => (
//         <>
//           <ListItem>
//             <SearchIcon />
//             <Typography variant="h6">{step.label}</Typography>
//             <br />
//             <Typography variant="h6">{step.description}</Typography>
//             {step.description}
//           </ListItem>

//           <div className="vertical"></div>
//         </>
//       ))}
//     </List>
//   )
// }
