import { Box, Container, Typography } from '@mui/material';
import React, { forwardRef } from 'react';
import ReactDOM from 'react-dom';
import PermissionGrantedLottie from 'hooks/lottie/permission-granted/';
import { ProgressSteps } from 'components/common/progress-steps';

const progressStages = [
  {
    label: 'Select a wallet',
    status: 'complete',
  },
  {
    label: 'Connect to you wallet',
    status: 'complete',
  },
  {
    label: 'Grant permission',
    status: 'complete',
  },
  {
    label: 'Confirm transaction',
    status: 'active',
  },
  {
    label: 'Send Crypto',
    status: 'pending',
  },
];
const PermissionGrantedModal = (
  props: { isPermissionGrantedShowing: any; hide: any },
  ref: React.Ref<unknown> | undefined,
) => {
  return props.isPermissionGrantedShowing
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
                mt: 9,
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
                  Permission granted, click confirm to send USDC
                </Typography>
                <Typography align="center" color="textSecondary" sx={{ mt: 3, mb: 3 }} variant="body2">
                  Click Confirm to send your USDC to Picante to complete this sell order.
                </Typography>
                <PermissionGrantedLottie />
                <ProgressSteps progressTitle="Progress" progressStages={progressStages} activeStep={3} />
              </div>
            </Container>
          </Box>
        </React.Fragment>,
        document.body,
      )
    : null;
};

export default forwardRef(PermissionGrantedModal);
