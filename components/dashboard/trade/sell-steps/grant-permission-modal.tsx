import { Box, Container, Typography } from "@mui/material";
import React, { forwardRef } from "react";
import ReactDOM from "react-dom";
import GrantPermissionLottie from "hooks/lottie/grant-permission/";

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
								p: 5,
								mt: 12,
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
								<GrantPermissionLottie />
								<Typography
									align="center"
									color="textSecondary"
									sx={{ mt: 1 }}
									variant="body2">
									To complete this transaction, click confirm
									to give Picante access to your tokens.
								</Typography>
							</div>
						</Container>
					</Box>
				</React.Fragment>,
				document.body
		  )
		: null;
};

export default forwardRef(GrantPermissionModal);
