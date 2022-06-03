import { Box, Container, Typography } from "@mui/material";
import React, { forwardRef } from "react";
import ReactDOM from "react-dom";
import GrantPermissionLottie from "hooks/lottie/grant-permission/";
import { ProgressSteps } from "components/common/progress-steps";


// steps for the progress bar
const progressStages = [
	{
	  label: 'Grant Permission',
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
	  
const GrantPermissionModal = (
	props: { isGrantPermissionShowing: any; hide: any },
	ref: React.Ref<unknown> | undefined
) => {
	return props.isGrantPermissionShowing
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
								mt: 9,
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
									Give Picante Permission
								</Typography>
								<Typography
									align="center"
									color="textSecondary"
									sx={{ mt: 3, mb: 3 }}
									variant="body2">
									To complete this transaction, click confirm
									to give Picante access to your tokens.
								</Typography>
								<GrantPermissionLottie />
								<ProgressSteps progressTitle="Progress" progressStages={progressStages}/>

							</div>
						</Container>
					</Box>
				</React.Fragment>,
				document.body
		  )
		: null;
};

export default forwardRef(GrantPermissionModal);
