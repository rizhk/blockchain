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

export const useAddTagModal = () => {
  const [isAddTagShowing, setIsAddTagShowing] = useState(false);

  function toggleAddTag() {
    setIsAddTagShowing(!isAddTagShowing);
  }

  return {
    isAddTagShowing: isAddTagShowing,
    toggleAddTag: toggleAddTag,
  };
};

export const useAddNoteModal = () => {
  const [isAddNoteShowing, setIsAddNoteShowing] = useState(false);

  function toggleAddNote() {
    setIsAddNoteShowing(!isAddNoteShowing);
  }

  return {
    isAddNoteShowing: isAddNoteShowing,
    toggleAddNote: toggleAddNote,
  };
};
