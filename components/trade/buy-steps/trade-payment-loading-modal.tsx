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

export const TradePaymentLoadingModal = (props: { isLoadingShowing: any }) => {
	return props.isLoadingShowing
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
								We are matching offer for your order..... Do not
								close your browser.
							</Paper>
						</Container>
					</Box>
				</React.Fragment>,
				document.body
		  )
		: null;
};
