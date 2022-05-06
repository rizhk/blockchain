import { useState } from "react";
import type { FC, MutableRefObject } from "react";
import PropTypes from "prop-types";
import { format } from "date-fns";
import numeral from "numeral";
import {
	Box,
	Button,
	Divider,
	Drawer,
	IconButton,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	TextField,
	Theme,
	Typography,
	useMediaQuery,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit";
import { X as XIcon } from "../../../icons/x";
import { PropertyList } from "../../property-list";
import { PropertyListItem } from "../../property-list-item";
import { Transaction } from "../../../types/transaction";
import { Scrollbar } from "../../scrollbar";

interface TransactionDrawerProps {
	containerRef?: MutableRefObject<HTMLDivElement | null>;
	open?: boolean;
	onClose?: () => void;
	transaction?: Transaction;
}

const statusOptions = [
	{
		label: "Canceled",
		value: "canceled",
	},
	{
		label: "Complete",
		value: "complete",
	},
	{
		label: "Pending",
		value: "pending",
	},
	{
		label: "Rejected",
		value: "rejected",
	},
];

interface TransactionPreviewProps {
	lgUp: boolean;
	onApprove?: () => void;
	onEdit?: () => void;
	onReject?: () => void;
	transaction: Transaction;
}

const TransactionPreview: FC<TransactionPreviewProps> = (props) => {
	const { lgUp, onApprove, onEdit, onReject, transaction } = props;
	const align = lgUp ? "horizontal" : "vertical";

	return (
		<>
			<Box
				sx={{
					alignItems: "center",
					backgroundColor: (theme) =>
						theme.palette.mode === "dark"
							? "neutral.800"
							: "neutral.100",
					btransactionRadius: 1,
					display: "flex",
					flexWrap: "wrap",
					justifyContent: "space-between",
					px: 3,
					py: 2.5,
				}}>
				<Typography
					color="textSecondary"
					sx={{ mr: 2 }}
					variant="overline">
					Actions
				</Typography>
				<Box
					sx={{
						alignItems: "center",
						display: "flex",
						flexWrap: "wrap",
						m: -1,
						"& > button": {
							m: 1,
						},
					}}>
					<Button
						onClick={onApprove}
						size="small"
						variant="contained">
						Approve
					</Button>
					<Button onClick={onReject} size="small" variant="outlined">
						Reject
					</Button>
					<Button
						onClick={onEdit}
						size="small"
						startIcon={<EditIcon fontSize="small" />}>
						Edit
					</Button>
				</Box>
			</Box>
			<Typography sx={{ my: 3 }} variant="h6">
				Details
			</Typography>
			<PropertyList>
				<PropertyListItem
					align={align}
					disableGutters
					label="ID"
					value={transaction.id}
				/>
				<PropertyListItem
					align={align}
					disableGutters
					label="Number"
					value={transaction.number}
				/>
				<PropertyListItem align={align} disableGutters label="Customer">
					<Typography color="primary" variant="body2">
						{transaction.customer.name}
					</Typography>
					<Typography color="textSecondary" variant="body2">
						{transaction.customer.address1}
					</Typography>
					<Typography color="textSecondary" variant="body2">
						{transaction.customer.city}
					</Typography>
					<Typography color="textSecondary" variant="body2">
						{transaction.customer.country}
					</Typography>
				</PropertyListItem>
				<PropertyListItem
					align={align}
					disableGutters
					label="Date"
					value={format(transaction.createdAt, "dd/MM/yyyy HH:mm")}
				/>
				<PropertyListItem
					align={align}
					disableGutters
					label="Promotion Code"
					value={transaction.promotionCode}
				/>
				<PropertyListItem
					align={align}
					disableGutters
					label="Total Amount"
					value={`${transaction.currency}${transaction.totalAmount}`}
				/>
				<PropertyListItem
					align={align}
					disableGutters
					label="Status"
					value={transaction.status}
				/>
			</PropertyList>
			<Divider sx={{ my: 3 }} />
			<Typography sx={{ my: 3 }} variant="h6">
				Line items
			</Typography>
			<Scrollbar>
				<Table sx={{ minWidth: 400 }}>
					<TableHead>
						<TableRow>
							<TableCell>Description</TableCell>
							<TableCell>Billing Cycle</TableCell>
							<TableCell>Amount</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{(transaction.items || []).map((item) => (
							<TableRow key={item.id}>
								<TableCell>
									{item.name} x {item.quantity}
								</TableCell>
								<TableCell>{item.billingCycle}</TableCell>
								<TableCell>
									{numeral(item.unitAmount).format(
										`${item.currency}0,0.00`
									)}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</Scrollbar>
		</>
	);
};

interface TransactionFormProps {
	onCancel?: () => void;
	onSave?: () => void;
	transaction: Transaction;
}

const TransactionForm: FC<TransactionFormProps> = (props) => {
	const { onCancel, onSave, transaction } = props;

	return (
		<>
			<Box
				sx={{
					alignItems: "center",
					backgroundColor: (theme) =>
						theme.palette.mode === "dark"
							? "neutral.800"
							: "neutral.100",
					btransactionRadius: 1,
					display: "flex",
					flexWrap: "wrap",
					justifyContent: "space-between",
					px: 3,
					py: 2.5,
				}}>
				<Typography
					variant="overline"
					sx={{ mr: 2 }}
					color="textSecondary">
					Transaction
				</Typography>
				<Box
					sx={{
						alignItems: "center",
						display: "flex",
						m: -1,
						"& > button": {
							m: 1,
						},
					}}>
					<Button
						color="primary"
						onClick={onSave}
						size="small"
						variant="contained">
						Save changes
					</Button>
					<Button onClick={onCancel} size="small" variant="outlined">
						Cancel
					</Button>
				</Box>
			</Box>
			<Typography sx={{ my: 3 }} variant="h6">
				Details
			</Typography>
			<TextField
				disabled
				fullWidth
				label="ID"
				margin="normal"
				name="id"
				value={transaction.id}
			/>
			<TextField
				disabled
				fullWidth
				label="Number"
				margin="normal"
				name="number"
				value={transaction.number}
			/>
			<TextField
				disabled
				fullWidth
				label="Customer name"
				margin="normal"
				name="customer_name"
				value={transaction.customer.name}
			/>
			<TextField
				disabled
				fullWidth
				label="Date"
				margin="normal"
				name="date"
				value={format(transaction.createdAt, "dd/MM/yyyy HH:mm")}
			/>
			<TextField
				fullWidth
				label="Address"
				margin="normal"
				name="address"
				value={transaction.customer.address1}
			/>
			<TextField
				fullWidth
				label="Country"
				margin="normal"
				name="country"
				value={transaction.customer.country}
			/>
			<TextField
				fullWidth
				label="State/Region"
				margin="normal"
				name="state_region"
				value={transaction.customer.city}
			/>
			<TextField
				fullWidth
				label="Total Amount"
				margin="normal"
				name="amount"
				value={transaction.totalAmount}
			/>
			<TextField
				fullWidth
				label="Status"
				margin="normal"
				name="status"
				select
				SelectProps={{ native: true }}
				value={transaction.status}>
				{statusOptions.map((statusOption) => (
					<option key={statusOption.value} value={statusOption.value}>
						{statusOption.label}
					</option>
				))}
			</TextField>
			<Button color="error" sx={{ mt: 3 }}>
				Delete transaction
			</Button>
		</>
	);
};

const TransactionDrawerDesktop = styled(Drawer)({
	width: 500,
	flexShrink: 0,
	"& .MuiDrawer-paper": {
		position: "relative",
		width: 500,
	},
});

const TransactionDrawerMobile = styled(Drawer)({
	flexShrink: 0,
	maxWidth: "100%",
	height: "calc(100% - 64px)",
	width: 500,
	"& .MuiDrawer-paper": {
		height: "calc(100% - 64px)",
		maxWidth: "100%",
		top: 64,
		width: 500,
	},
});

export const TransactionDrawer: FC<TransactionDrawerProps> = (props) => {
	const { containerRef, onClose, open, transaction, ...other } = props;
	const [isEditing, setIsEditing] = useState<boolean>(false);
	const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("lg"));

	const handleEdit = () => {
		setIsEditing(true);
	};

	const handleCancel = () => {
		setIsEditing(false);
	};

	// The reason for doing this, is that the persistent drawer has to be rendered, but not it's
	// content if an transaction is not passed.
	const content = transaction ? (
		<>
			<Box
				sx={{
					alignItems: "center",
					backgroundColor: "primary.main",
					color: "primary.contrastText",
					display: "flex",
					justifyContent: "space-between",
					px: 3,
					py: 2,
				}}>
				<Typography color="inherit" variant="h6">
					{transaction.number}
				</Typography>
				<IconButton color="inherit" onClick={onClose}>
					<XIcon fontSize="small" />
				</IconButton>
			</Box>
			<Box
				sx={{
					px: 3,
					py: 4,
				}}>
				{!isEditing ? (
					<TransactionPreview
						onApprove={onClose}
						onEdit={handleEdit}
						onReject={onClose}
						transaction={transaction}
						lgUp={lgUp}
					/>
				) : (
					<TransactionForm
						onCancel={handleCancel}
						onSave={handleCancel}
						transaction={transaction}
					/>
				)}
			</Box>
		</>
	) : null;

	if (lgUp) {
		return (
			<TransactionDrawerDesktop
				anchor="right"
				open={open}
				SlideProps={{ container: containerRef?.current }}
				variant="persistent"
				{...other}>
				{content}
			</TransactionDrawerDesktop>
		);
	}

	return (
		<TransactionDrawerMobile
			anchor="right"
			ModalProps={{ container: containerRef?.current }}
			onClose={onClose}
			open={open}
			SlideProps={{ container: containerRef?.current }}
			variant="temporary"
			{...other}>
			{content}
		</TransactionDrawerMobile>
	);
};

TransactionDrawer.propTypes = {
	containerRef: PropTypes.any,
	onClose: PropTypes.func,
	open: PropTypes.bool,
	// @ts-ignore
	transaction: PropTypes.object,
};
