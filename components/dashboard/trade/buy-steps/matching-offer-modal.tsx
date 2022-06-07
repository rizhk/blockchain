import {
	Avatar,
	Box,
	Button,
	Container,
	Paper,
	Typography,
} from "@mui/material";
import React from "react";
import ReactDOM from "react-dom";
import MatchingOfferLottie from "hooks/lottie/matching-offer/";
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
	  status: 'pending',
	},
	{
	  label: 'Payment',
	   status: 'pending',
	},
	{
	  label: 'Receive your Crypto',
	   status: 'pending',
	},
  ]
	   


export const TradeMatchingOfferModal = (props: {
	isMatchingOfferShowing: any;
	hide: any;
}) => {
	return props.isMatchingOfferShowing
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
									Matching you with a seller.
								</Typography>
								<Typography
									align="center"
									color="textSecondary"
									sx={{ mt: 2, mb: 2 }}
									variant="body2">
									Picante is now matching you with a seller to
									fill your order
								</Typography>
								<MatchingOfferLottie  width="25px"/>
								<ProgressSteps progressTitle="Progress" progressStages={progressStages} activeStep={2}/>
							</div>
						</Container>
					</Box>
				</React.Fragment>,
				document.body
		  )
		: null;
};
