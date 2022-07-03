import { Avatar, Box, Button, Container, Paper, Typography } from '@mui/material';
import React, { useState, forwardRef, useImperativeHandle, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import WalletConnectLottie from 'hooks/lottie/buy-select-wallet/';

const ConfirmPurchaseModal = (
  props: { isConfirmPurchaseShowing: any; hide: any },
  ref: React.Ref<unknown> | undefined,
) => {
  return props.isConfirmPurchaseShowing
    ? ReactDOM.createPortal(
        <React.Fragment>
          <Box
            sx={{
              backgroundColor: 'background.default',
              minHeight: '100%',
              p: 3,
            }}
            className="modal-overlay"
          >
            <Container
              maxWidth="sm"
              sx={{
                mt: 12,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Typography
                  variant="h5"
                  style={{
                    textAlign: 'center',
                  }}
                >
                  Confirm this transaction
                </Typography>
                <Typography align="center" color="textSecondary" sx={{ mt: 2, mb: 2 }} variant="body2">
                  Please confirm this transaction to continue.
                </Typography>
                <WalletConnectLottie />
              </div>
            </Container>
          </Box>
        </React.Fragment>,
        document.body,
      )
    : null;
};

export default forwardRef(ConfirmPurchaseModal);
