import { useState } from "react";

export const usePaymentModal = () => {
	const [isPaymentShowing, setIsPaymentShowing] = useState(false);

	function togglePayment() {
		setIsPaymentShowing(!isPaymentShowing);
	}

	return {
		isPaymentShowing,
		togglePayment,
	};
};

export const useMatchingOfferModal = () => {
	const [isMatchingOfferShowing, setIsMatchingOfferShowing] = useState(false);

	function toggleMatchingOffer() {
		setIsMatchingOfferShowing(!isMatchingOfferShowing);
	}

	return {
		isMatchingOfferShowing,
		toggleMatchingOffer,
	};
};

export const useRequestTransferModal = () => {
	const [isRequestTransferShowing, setIsRequestTransferShowing] =
		useState(false);

	function toggleRequestTransfer() {
		setIsRequestTransferShowing(!isRequestTransferShowing);
	}

	return {
		isRequestTransferShowing,
		toggleRequestTransfer,
	};
};

export const useTokenTransferedModal = () => {
	const [isTokenTransferedShowing, setIsTokenTransferedShowing] =
		useState(false);

	function toggleTokenTransfered() {
		setIsTokenTransferedShowing(!isTokenTransferedShowing);
	}

	return {
		isTokenTransferedShowing,
		toggleTokenTransfered,
	};
};

export const useConfirmPurchaseModal = () => {
	const [isConfirmPurchaseShowing, setIsConfirmPurchaseShowing] =
		useState(false);

	function toggleConfirmPurchase() {
		setIsConfirmPurchaseShowing(!isConfirmPurchaseShowing);
	}

	return {
		isConfirmPurchaseShowing,
		toggleConfirmPurchase,
	};
};
