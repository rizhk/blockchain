import { useState } from "react";

export const useGrantPermissionModal = () => {
	const [isGrantPermissionShowing, setIsGrantPermissionShowing] =
		useState(false);

	function toggleGrantPermission() {
		setIsGrantPermissionShowing(!isGrantPermissionShowing);
	}

	return {
		isGrantPermissionShowing,
		toggleGrantPermission,
	};
};

export const useGrantingPermissionModal = () => {
	const [isGrantingPermissionShowing, setIsGrantingPermissionShowing] =
		useState(false);

	function toggleGrantingPermission() {
		setIsGrantingPermissionShowing(!isGrantingPermissionShowing);
	}

	return {
		isGrantingPermissionShowing,
		toggleGrantingPermission,
	};
};

export const usePermissionGrantedModal = () => {
	const [isPermissionGrantedShowing, setIsPermissionGrantedShowing] =
		useState(false);

	function togglePermissionGranted() {
		setIsPermissionGrantedShowing(!isPermissionGrantedShowing);
	}

	return {
		isPermissionGrantedShowing,
		togglePermissionGranted,
	};
};

export const useSendTokenModal = () => {
	const [isSendTokenShowing, setIsSendTokenShowing] = useState(false);

	function toggleSendToken() {
		setIsSendTokenShowing(!isSendTokenShowing);
	}

	return {
		isSendTokenShowing,
		toggleSendToken,
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
