import { useState } from 'react';

export const useExportTransactionHistoryModal = () => {
  const [isExportTransactionHistoryShowing, setIsExportTransactionHistoryShowing] = useState(false);

  function toggleExportTransactionHistory() {
    setIsExportTransactionHistoryShowing(!isExportTransactionHistoryShowing);
  }

  return {
    isExportTransactionHistoryShowing: isExportTransactionHistoryShowing,
    toggleExportTransactionHistory: toggleExportTransactionHistory,
  };
};
