import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { Box, FormHelperText, TextField } from "@mui/material";
import * as Yup from "yup";
import { useFormik } from "formik";
import { NetworkSelector } from "../network/network-selector";
import { walletApi } from "api/wallet-api";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
	"& .MuiDialogContent-root": {
		padding: theme.spacing(2),
	},
	"& .MuiDialogActions-root": {
		padding: theme.spacing(1),
	},
}));

export interface DialogTitleProps {
	id: string;
	children?: React.ReactNode;
	onClose: () => void;
}

const BootstrapDialogTitle = (props: DialogTitleProps) => {
	const { children, onClose, ...other } = props;

	return (
		<DialogTitle sx={{ m: 0, p: 2 }} {...other}>
			{children}
			{onClose ? (
				<IconButton
					aria-label="close"
					onClick={onClose}
					sx={{
						position: "absolute",
						right: 8,
						top: 8,
						color: (theme) => theme.palette.grey[500],
					}}>
					<CloseIcon />
				</IconButton>
			) : null}
		</DialogTitle>
	);
};

export const CreateWalletDialogs: FC = (
	props: JSX.IntrinsicAttributes &
		React.ClassAttributes<HTMLFormElement> &
		React.FormHTMLAttributes<HTMLFormElement>
) => {
	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	const changeNetworkId = (event: { target: { value: any } }) => {
		formik.setFieldValue("networkId", event.target.value);
	};

	const handleAddressChange = (event: { target: { value: any } }) => {
		formik.setFieldValue("walletAddress", event.target.value);
	};

	const handleNameChange = (event: { target: { value: any } }) => {
		formik.setFieldValue("name", event.target.value);
	};

	const formik = useFormik({
		initialValues: {
			networkId: "80001",
			walletAddress: "",
			name: "",
		},
		validationSchema: Yup.object({
			networkId: Yup.string().required("Select a blockchain network"),
			walletAddress: Yup.string().required("Wallet address is required"),
			name: Yup.string().required("Wallet name is required"),
		}),
		onSubmit: async (values, helpers): Promise<void> => {
			// setErrorMessage("");

			console.log("submit");
			console.log(values);
			try {
				const success = await walletApi.create(values);

				if (success) {
					handleClose();
				}
			} catch (err) {
				console.error(err);
				console.error(err.data.message);
			}
		},
	});

	return (
		<form noValidate onSubmit={formik.handleSubmit} {...props}>
			<Button
				sx={{
					mt: 3,
					background: "#5048E5",
					borderRadius: 1,
				}}
				variant="contained"
				onClick={handleClickOpen}>
				Add a new wallet
			</Button>
			<BootstrapDialog
				onClose={handleClose}
				aria-labelledby="customized-dialog-title"
				open={open}>
				<BootstrapDialogTitle
					id="customized-dialog-title"
					onClose={handleClose}></BootstrapDialogTitle>
				<DialogContent>
					<Typography
						sx={{
							mb: 2,
						}}>
						Add a wallet
					</Typography>
					<NetworkSelector
						error={Boolean(
							formik.touched.networkId && formik.errors.networkId
						)}
						helperText={
							formik.touched.networkId && formik.errors.networkId
						}
						onNetworkChange={changeNetworkId}
					/>
					<TextField
						sx={{
							mt: 2,
							mb: 2,
						}}
						fullWidth
						id="create-wallet-address"
						label="Wallet Address"
						value={formik.values.walletAddress}
						error={Boolean(
							formik.touched.walletAddress &&
								formik.errors.walletAddress
						)}
						helperText={
							formik.touched.walletAddress &&
							formik.errors.walletAddress
						}
						onChange={handleAddressChange}
					/>
					<TextField
						sx={{
							mt: 2,
							mb: 2,
						}}
						fullWidth
						id="create-wallet-name"
						label="Enter a nickname"
						value={formik.values.name}
						error={Boolean(
							formik.touched.name && formik.errors.name
						)}
						helperText={formik.touched.name && formik.errors.name}
						onChange={handleNameChange}
					/>
				</DialogContent>
				{formik.errors.submit && (
					<Box sx={{ mt: 3 }}>
						<FormHelperText error>
							{formik.errors.submit}
						</FormHelperText>
					</Box>
				)}
				<DialogActions>
					<Button
						sx={{
							mt: 4,
							background: "#5048E5",
							borderRadius: 1,
						}}
						variant="contained"
						type="submit"
						onClick={formik.handleSubmit}>
						Add wallet
					</Button>
				</DialogActions>
			</BootstrapDialog>
		</form>
	);
};
