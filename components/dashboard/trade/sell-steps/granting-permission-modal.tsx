import { Box, Container, Typography } from '@mui/material';
import React, { forwardRef } from 'react';
import ReactDOM from 'react-dom';
import GrantPermissionLottie from 'hooks/lottie/grant-permission/';
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
    status: 'active',
  },
  {
    label: 'Confirm transaction',
    status: 'pending',
  },
  {
    label: 'Send Crypto',
    status: 'pending',
  },
];

const GrantingPermissionModal = (
  props: { isGrantingPermissionShowing: any; hide: any },
  ref: React.Ref<unknown> | undefined,
) => {
  return props.isGrantingPermissionShowing
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
                mt: 8,
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
                  Granting permission, please wait...
                </Typography>
                <Typography align="center" color="textSecondary" sx={{ mt: 3, mb: 3 }} variant="body2">
                  You are giving permission to Picante.
                </Typography>
                <GrantPermissionLottie />
                <ProgressSteps progressTitle="Progress" progressStages={progressStages} activeStep={2} />
              </div>
            </Container>
          </Box>
        </React.Fragment>,
        document.body,
      )
    : null;
};

export default forwardRef(GrantingPermissionModal);
