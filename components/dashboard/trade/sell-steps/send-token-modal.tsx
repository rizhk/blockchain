import { Box, Container, Typography } from "@mui/material";
import React, { forwardRef } from "react";
import ReactDOM from "react-dom";
import SendTokenLottie from "hooks/lottie/send-token/";

const SendTokenModal = (
	props: { isSendTokenShowing: any; hide: any },
	ref: React.Ref<unknown> | undefined
) => {
	return props.isSendTokenShowing
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
									Your USDC is being sent to Picante
								</Typography>
								<Typography
									align="center"
									color="textSecondary"
									sx={{ mt: 3, mb: 3 }}
									variant="body2">
									You are now transfering your crypto from
									your wallet to Picante in order to sell them
									for USD. Depending on network speeds, this
									may take anywhere from a few seconds to a
									few minutes.
								</Typography>
								<SendTokenLottie />
							</div>
						</Container>
					</Box>
				</React.Fragment>,
				document.body
		  )
		: null;
};

export default forwardRef(SendTokenModal);
