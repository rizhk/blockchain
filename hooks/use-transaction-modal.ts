import { useState } from 'react';

export const useOrderDetailsModal = () => {
  const [isOrderDetailsShowing, setIsOrderDetailsShowing] = useState(false);

  function toggleOrderDetails() {
    setIsOrderDetailsShowing(!isOrderDetailsShowing);
  }

  return {
    isOrderDetailsShowing,
    toggleOrderDetails,
  };
};
export const useCancelOrderModal = () => {
  const [isCancelOrderShowing, setIsCancelOrderShowing] = useState(false);

  function toggleCancelOrder() {
    setIsCancelOrderShowing(!isCancelOrderShowing);
  }

  return {
    isCancelOrderShowing,
    toggleCancelOrder,
  };
};

export const useCancelSubmittedModal = () => {
  const [isCancelSubmittedShowing, setIsCancelSubmittedShowing] = useState(false);

  function toggleCancelSubmitted() {
    setIsCancelSubmittedShowing(!isCancelSubmittedShowing);
  }

  return {
    isCancelSubmittedShowing: isCancelSubmittedShowing,
    toggleCancelSubmitted: toggleCancelSubmitted,
  };
};
