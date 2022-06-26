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
