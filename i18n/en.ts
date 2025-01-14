export const en = {
  translation: {
    error: {
      ERROR_FORMAT_IS_NOT_ACCEPT_EITHER_JPG_OR_PNG: 'Please upload JPG or PNG only.',
      ERROR_FILE_SIZE_TOO_LARGE: 'Maximum size of 2Mb',
      ERROR_USER_EDIT_NEW_PASSWORD_NOT_MATCH: 'New password and new password confirmation are not matched.',
      ERROR_USER_EDIT_CURRENCT_PASSWORD_INCORRECT: 'Current password is incorrect.',
      ERROR_USER_PASSWORD_AT_LEAST_ONE_LOWER: 'New password should has at least 1 lowercase letter',
      ERROR_USER_PASSWORD_AT_LEAST_ONE_UPPER: 'New password should has at least 1 uppercase letter',
      ERROR_USER_PASSWORD_AT_LEAST_8CHARS: 'New password should has at least 8 characters',
      ERROR_USER_EDIT_NEW_PASSWORD_NEEDS_DIFF: 'New password needs to be different with current password',
      ERROR_USER_IS_ALREADY_EXIST: 'User is already exist',
    },
    components: {
      multiSelect: {
        selectAll: 'Select All',
        confirm: 'Confirm',
      },
    },
    common: {
      notAvailable: 'N/A',
      options: {
        allWallets: 'All Wallets',
        time: 'All Time',
        last30d: 'Last 30 days',
        last90d: 'Last 90 days',
        last6m: 'Last 6 months',
        lastYr: 'Last Year',
        custom: 'Custom Date Range',
        from: 'From',
        to: 'To',
      },
    },
    overview: {
      xRateError: 'Failed to get exchange rate.',
    },
    login: {
      heroTitle1:
        'Synced directly from the blockchain network,\n generate comprehensive data of all your\n transactions for your reporting needs.',
    },
    signup: {
      pageTitle1: 'Sign up and start tracking your crypto assets today.',
      heroTitle1:
        'Stay on top of all your crypto assets,\n transactions, P/L and net worth all in\n one easy to use dashboard.',
    },
    verify: {
      heroTitle1: 'Keep track of all your assets and where\n your funds are being spent.',
    },
    portfolio: {
      head: 'Portfolio',
      title: 'Portfolio',
      add: 'Add a portfolio',
      addSuccess: 'Portfolio created successfully',
      photo: 'Portfolio photo',
      name: 'Portfolio name',
      enterName: 'Enter the name of your portfolio',
      currency: 'Currency',
      preferCurrency: 'Preferred currency of your portfolio',
      assets: {
        token: 'Token',
        marketPrice: 'Market price',
        marketPriceTooltip: 'The current market price of your tokens.',
        getAssetsError: 'Failed to get assets',
        rateNotAvailable: 'Rate not available',
        head: 'Portfolio',
        exportData: 'Export data',
        changeIn24: '24H Change',
        volumeIn24: '24H Volume',
        volumeIn24Tooltip: 'DEX volume. Does not include CEX trades.',
        yourBalance: 'Your balance',
        connectWalletToSeeAssets: 'Connect a wallet to begin tracking your assets.',
        connectedWithNoAssets: `Once your wallets have been connected, you will see the asset allocation across all of your wallets here.`,
      },
      dashboard: {
        portfolioNetWorth: 'Your portfolio net worth: ',
        updateDataNow: 'Update data now',
        dataLastUpdated: 'Data last updated',
        recentTrans: 'Recent transactions',
        vewAllTrans: 'View all transactions',
        incoming: 'Incoming',
        outgoing: 'Outgoing',
        total: 'Total',
        totalAssets: 'Total assets',
        viewAllWallets: 'View all wallets',
        viewAllAssets: 'View all assets',
        addWallet: 'Add wallet',
        myWallets: 'MY WALLETS',
        getWalletActivitiesError: 'Failed to get wallet activities',
        getRecentTransactionError: 'Failed to get recent transactions',
        getMyWalletsError: 'Failed to get my wallets',
        getAssetsError: 'Failed to get assets',
        assets: 'Assets',
        mostRecent: 'Most recent',
        earliest: 'Earliest',
        status: 'Status',
        allWallets: 'All wallets',
        noWalletCtaText: 'Connect a wallet to begin tracking your assets.',
        hasWalletNoTransCtaText: `Your wallet doesn't seem to have any transactions. Please add another wallet.`,
        noWalletTransCtaText: 'Connect a wallet to begin seeing your recent transactions.',
        noWalletActivitiesCtaText: 'Connect a wallet to begin seeing your wallet activities.',
        noAssetCtaText:
          'Once your wallets have been connected, you will see the asset allocation across all of your wallets here.',
        addWalletNow: 'Add a wallet now',
        getWalletSyncStatusError: 'Failed to get wallet sync status',
        requestWalletSyncError: 'Failed to create a new sync request',
        fetchingLatestData: 'Fetching latest data',
        getNetWorthError: 'Failed to get wallet net worth',
        walletActivities: 'Wallet activities',
        trends: 'Trends',
        noTrendsCtaText: 'Once your wallets have been connected, you will see trends of your total holdings over time.',
        blackPink: 'Blankpink',
      },
      breakdown: {
        $: 'Transaction Breakdown',
        viewCompleteBreakdown: 'View complete breakdown',
        account: 'Account',
        expenditures: 'Expenditures',
        totalAccounts: 'Total Accounts',
        totalActivity: 'Total activity',
        fetchError: 'Failed to get transaction breakdown',
        allTypes: 'All Types',
        type: {
          in: 'Incoming',
          out: 'Outgoing',
        },
        hintEmpty: 'Assign accounts to your transactions\n to see your spending breakdown.',
        hintLT5: 'Assign accounts to your transactions\n to see your spending breakdown.',
      },
      transHis: {
        head: 'Transactions',
        title: 'Transactions',
        type: 'Type',
        from: 'From',
        to: 'To',
        date: 'Date',
        amount: 'Amount',
        fees: 'Fees',
        total: 'Total',
        note: 'Note',
        tag: 'Account',
        transDetails: 'Transaction Details',
        orderType: 'Order Type',
        goBack: 'Go back',
        blockchain: 'Blockchain',
        value: 'Value',
        transactionFee: 'Transaction Fee',
        transactionTotal: 'Total',
        gasPrice: 'Gas Price',
        gasUsed: 'Gas Used',
        transactionHash: 'Transaction Hash',
        status: 'Status',
        block: 'Block',
        timestamp: 'Timestamp',
        exportTransHis: 'Export transaction history',
        exportData: 'Export data',
        last30Days: 'Last 30 days',
        dataRange: 'Data range',
        fileType: 'File type',
        csv: 'CSV',
        cancel: 'Cancel',
        poweredBy: 'Powered By',
        outgoing: 'Outgoing',
        incoming: 'Incoming',
        blockConfirmation: 'Block Confirmation',
        ago: 'ago',
        viewOn: 'View on',
        addTag: 'Add account',
        editTag: 'Edit account',
        removeTag: 'Remove account',
        addNote: 'Add note',
        removeNote: 'Remove note',
        editNote: 'Edit note',
        selectTag: 'Select an account',
        addNew: 'Add new',
        enterNote: 'Enter content for the note',
        enterNameForTag: 'Enter a name for the account',
        getUserTagsError: 'Failed to get accounts',
        createUserTagsError: 'Failed to create new account, please try again later.',
        setTagError: 'Failed to change account, please try again later.',
        getTransactionsError: 'Failed to get transactions, please try again later.',
        save: 'Save',
        dataSyncInProgress:
          'The latest data is being fetched from the blockchain. You will be notified when your data has been updated.',
        connectWalletToSeeTxn: 'Connect a wallet to begin seeing your transactions.',
        connectedWithNoTransaction: `Your wallet doesn't seem to have any transactions. Please add another wallet.`,
        noTransactionFound: `There are no results based on your filters, please try to broaden your search by selecting different filters.`,
        connectedLoadingTransaction:
          'You data is being loaded, this may take a few minutes. Please check back again later.',
        search: 'Search by Wallet Address / Token / Note',
        all: 'All Wallets',
        types: 'All Types',
        statuses: 'All Statuses',
        tags: 'All Accounts',
        success: 'Success',
        failed: 'Failed',
        sortBy: 'Sort by',
        newest: 'Newest',
        oldest: 'Oldest',
        time: 'All Time',
        confirm: 'Confirm',
        last30d: 'Last 30 days',
        last90d: 'Last 90 days',
        last6m: 'Last 6 months',
        lastYr: 'Last Year',
        custom: 'Custom Date Range',
        allTagUntag: 'All',
        allTagged: 'Assigned',
        allUntagged: 'Unassigned',
      },
      walletList: {
        myWallets: 'My Wallets',
        connectWalletToStart: 'Connect a wallet to begin tracking your assets.',
        copied: 'Copied to clipboard',
        type: 'TYPE',
        nickname: 'NICKNAME',
        address: 'ADDRESS',
        netWorth: 'Net worth (USD)',
        add: 'Add',
        addWallet: 'Add Wallet Details',
        addSuccess: 'You have successfully added a new wallet.',
        edit: 'Edit',
        editWallet: 'Edit Wallet Details',
        editSuccess: 'You have successfully edit a wallet.',
        deleteSuccess: 'You have successfully removed a wallet.',
        walletType: 'Wallet Type',
        enterNickname: 'Enter a nickname',
        walletAddress: 'Wallet Address',
        failToCreate: 'Fail to Create Wallet',
        failToPatch: 'Fail to Edit Wallet',
        walletNameRequired: 'Wallet Name is required',
        walletAddressRequired: 'Wallet address is required',
        selectWalletType: 'Please select a wallet type to continue',
      },
    },
    transaction: {
      seller: 'Seller new',
      buyer: 'Buyer',
      cancelOrderTitle: 'Cancel order',
      cancellationGasFee: 'Cancellation gas fee (estimated)',
      warningTitle: 'Warning',
      warningMessage: 'This action cannot be undone. Please make sure before continuing.',
      nevermindGoBack: 'Nevermind, go back',
      confirmCancelOrder: 'Confirm. cancel order',
      viewOn: 'View on',
      cancelOrderSubmittedTitle: 'Cancellation has been submitted',
      cancelOrderProgressHint:
        'Your instructions to cancel this order has been submitted. It may take some time for it to complete depending on network conditions.',
      hash: 'Transaction Hash',
      close: 'Close',
      exportTransactionError: 'Failed to export transaction history, please try again later.',
      withdrawalPreviewError: 'Failed to get latest widthdrawal preview amounts.',
      withdrawTransactionError: 'Failed to request for withdrawal, please try again later.',
    },
    menu: {
      overview: 'Overview',
      portfolio: 'Portfolio',
      transactions: 'Transactions',
      wallets: 'Wallets',
      bankAccounts: 'Bank accounts',
      settings: 'Settings',
      inviteAndEarn: 'Invite and earn',
      reports: 'Reports',
      forDevelopers: 'For developers',
      help: 'Help',
      knowledgebase: 'Knowledgebase',
      news: 'News',
      account: 'My Account',
    },
    account: {
      title: 'Manage your account',
      photo: 'Profile Photo',
      displayName: 'display name',
      changeName: 'Change your display name',
      updatePassword: 'Update password',
      currentPassword: 'Enter current password',
      newPassword: 'Enter new password',
      passwordAgain: 'Enter new password again',
      save: 'Save',
      updateSuccess: 'Your account info has been updated successfully.',
      avatarUpdateSuccess: 'You have successfully updated your profile photo.',
      tooLarge: 'The file size of the photo you uploaded is too large, please try another photo.',
      passwordMatch: 'The two password fields must match',
      passwordMinLength: 'Passwords must not have less than 8 characters',
      passwordNumber: 'Passwords must contain at least one number',
      passwordCapital: 'Passwords must contain at least one upper case letter',
      passwordLowercase: 'Passwords must contain at least one lower case letter',
    },
  },
};
