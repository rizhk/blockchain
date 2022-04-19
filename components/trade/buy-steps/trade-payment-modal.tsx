import {
	Avatar,
	Box,
	Button,
	Container,
	Paper,
	Typography,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { Check as CheckIcon } from "../../../icons/check";
import React, { useState, forwardRef, useImperativeHandle } from "react";
import ReactDOM from "react-dom";
import {
	usePlaidLink,
	PlaidLinkOptions,
	PlaidLinkOnSuccess,
} from "react-plaid-link";

var PicanteAPI = process.env.NEXT_PUBLIC_PICANTE_API_END_POINT;

const TradePaymentModal = (
	props: { isShowing: any },
	ref: React.Ref<unknown> | undefined
) => {
	const [linkToken, setLinkToken] = useState("");

	useImperativeHandle(
		ref,
		() => ({
			callCreatePaymentToken(msg: any) {
				console.log(msg);
				createPaymentToken();
			},
		}),
		[]
	);

	const createPaymentToken = async () => {
		console.log("linkToken: " + linkToken);
		console.log("Initial payment with plaid");

		try {
			const path = PicanteAPI + "/v1/plaid/payment/link/token/create";
			const response = await fetch(path, {
				method: "POST",
			});
			if (!response.ok) {
				return;
			}
			const data = await response.json();
			console.log("linkToken: " + linkToken);
			console.log(data.link_token);
			if (data.link_token) {
				console.log("setToken: " + data.link_token);
				setLinkToken(data.link_token);

				console.log("linkToken: " + linkToken);
				if (ready) {
					console.log("Ready");
				}
			} else {
				console.log("Link Token cannot be created");
			}
		} catch (err) {
			console.error(err);
		}
	};

	const { open, ready } = usePlaidLink({
		token: linkToken,
		onSuccess: (public_token, metadata) => {
			// send public_token to server
		},
		onLoad: () => {
			console.log(
				"WhenPlaid Link loading, the linkToken is: " + linkToken
			);
		},
		env: "sandbox",
	});

	return props.isShowing
		? ReactDOM.createPortal(
				<React.Fragment>
					<Box
						sx={{
							backgroundColor: "background.default",
							minHeight: "100%",
							p: 3,
						}}
						className="modal-overlay">
						<Container maxWidth="xl" className="modal-wrapper">
							<Paper
								elevation={12}
								sx={{
									p: 3,
									display: "flex",
									flexDirection: "column",
									alignItems: "center",
								}}
								className="modal">
								<Avatar
									sx={{
										backgroundColor: (theme) =>
											alpha(
												theme.palette.success.main,
												0.08
											),
										color: "success.main",
										mb: 2,
									}}>
									<CheckIcon fontSize="small" />
								</Avatar>
								<Typography
									variant="h5"
									className="modal-header">
									We had found you an offer
								</Typography>
								<Typography
									align="center"
									color="textSecondary"
									sx={{ mt: 1 }}
									variant="body2">
									Seller Name: ABC Limited
									<br />
									Please make your payment to seller's bank
									account. <br />
									You will be received $10 USDC after payment
									is made. Trade
									<br />
									Time Left: 30 miuntes (?)
								</Typography>

								<Button
									fullWidth
									size="large"
									sx={{ mt: 4 }}
									variant="contained"
									onClick={() => open()}
									disabled={!ready}>
									Pay via Plaid
								</Button>
							</Paper>
						</Container>
					</Box>
				</React.Fragment>,
				document.body
		  )
		: null;
};

export default forwardRef(TradePaymentModal);
