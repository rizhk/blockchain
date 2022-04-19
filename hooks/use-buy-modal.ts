import { useState } from "react";

export const useModal = () => {
	const [isShowing, setIsShowing] = useState(false);

	function toggle() {
		setIsShowing(!isShowing);
	}

	return {
		isShowing,
		toggle,
	};
};

export const useLoadingModal = () => {
	const [isLoadingShowing, setIsLoadingShowing] = useState(false);

	function toggleLoading() {
		setIsLoadingShowing(!isLoadingShowing);
	}

	return {
		isLoadingShowing,
		toggleLoading,
	};
};
