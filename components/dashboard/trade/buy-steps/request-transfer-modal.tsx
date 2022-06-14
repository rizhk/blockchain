import { Box, Container, Typography } from "@mui/material";
import React, { forwardRef } from "react";
import ReactDOM from "react-dom";
import SendTokenLottie from "hooks/lottie/send-token-to-buyer";
import { ProgressSteps } from "components/common/progress-steps";

// steps for the progress bar
const progressStages = [
	{
	  label: 'Select a wallet',
	  status: 'complete',
	},
	{
	  label: 'Connect to you wallet',
	   status: 'complete',
	},
	{
	  label: 'Match with seller',
	  status: 'complete',
	},
	{
	  label: 'Payment',
	   status: 'complete',
	},
	{
	  label: 'Receive your Crypto',
	   status: 'active',
	},
  ]

const RequestTransferModal = (
	props: { isRequestTransferShowing: any; hide: any },
	ref: React.Ref<unknown> | undefined
) => {
	return props.isRequestTransferShowing
		? ReactDOM.createPortal(
				<React.Fragment>
					<Box
						sx={{
							backgroundColor: "background.default",
							minHeight: "100%",
							p: 3,
						}}
						className="modal-overlay">
						<Container
							maxWidth="sm"
							sx={{
								mt: 8,
							}}>
							<div
								style={{
									display: "flex",
									flexDirection: "column",
									alignItems: "center",
								}}>
								<Typography
									variant="h5"
									style={{
										textAlign: "center",
									}}>
									Your USDC is being sent to your wallet
								</Typography>
								<Typography
									align="center"
									color="textSecondary"
									sx={{ mt: 1 }}
									variant="body2">
									We are now transfering your crypto to your
									wallet. Depending on network speeds, this
									may take anywhere from a few seconds to a
									few minutes.
								</Typography>
								<SendTokenLottie />
								<ProgressSteps progressTitle="Progress" progressStages={progressStages} activeStep={5}/>
					
							</div>
						</Container>
					</Box>
				</React.Fragment>,
				document.body
		  )
		: null;
};

export default forwardRef(RequestTransferModal);
