import { useState } from 'react';
import type { FC } from 'react';
import PropTypes from 'prop-types';
import { Badge, Box, Button, Dialog, DialogContent, Typography, Fade } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { DotPagination } from 'components/dot-pagination';
import { authApi } from 'api/auth-api';

interface ContentSearchProps {
  onClose: (value?: number) => void;
  open?: boolean;
}

const CircleIconGreen: FC = (props) => (
  <Box sx={{ marginLeft: 0.25, marginTop: 0.5 }}>
    <CircleIcon color="success" fontSize="small" />
  </Box>
);
const CircleIconGrey: FC = (props) => (
  <Box sx={{ marginLeft: 0.25, marginTop: 0.5 }}>
    <CircleIcon color="disabled" fontSize="small" />
  </Box>
);

export const TutorialDialog: FC<ContentSearchProps> = (props) => {
  const { onClose, open, ...other } = props;
  const [step, setStep] = useState(1);

  const onClickFinish = async (props: any) => {
    await authApi.skipTutorial(true);
    onClose(step);
  };
  
  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      onClose={() => onClose()}
      open={!!open}
      sx={{
        boxShadow: '0px 3px 38px rgba(0, 0, 0, 0.102)',
        borderRadius: '10px',
      }}
      {...other}
    >
      <DialogContent sx={{ padding: 0 }}>
        {step == 1 && (
          <Fade in={step == 1} timeout={1000}>
            <Box
              padding={5}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                background: 'rgba(247, 247, 255, 1)',
                textAlign: 'center',
                height: '550px',
              }}
            >
              <Box
                sx={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <img src="/static/home/welcome_1.gif" />
              </Box>
              <Typography variant="h6">Welcome to Picante, let’s get started.</Typography>
              <Typography pt={2}>
                With Picante, your business now has a complete suite of tools to work directly with crypto. Start in the
                dashbaord to buy or sell your crypto.
              </Typography>
              <DotPagination sx={{ marginTop: 3 }} step={1} />
              <Button sx={{ marginTop: 3 }} variant="contained" color="info" onClick={() => setStep(2)}>
                Continue
              </Button>
            </Box>
          </Fade>
        )}
        {step == 2 && (
          <Fade in={step == 2} timeout={1000}>
            <Box
              padding={5}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                background: 'rgba(247, 247, 255, 1)',
                textAlign: 'center',
                height: '550px',
              }}
            >
              <Box
                sx={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <img src="/static/home/welcome_2.gif" />
              </Box>
              <Typography variant="h6">Active matching of buyer and seller</Typography>
              <Typography pt={2}>
                Once you order to buy or sell crypto is placed, Picante immediatley matches you with a counterparty from
                its liquidity pool to fill the order
              </Typography>
              <DotPagination sx={{ marginTop: 3 }} step={2} />
              <Box>
                <Button
                  sx={{ marginTop: 3, marginRight: 1 }}
                  variant="outlined"
                  color="info"
                  onClick={() => setStep(1)}
                >
                  Go Back
                </Button>
                <Button
                  sx={{ marginTop: 3, marginLeft: 1 }}
                  variant="contained"
                  color="info"
                  onClick={() => setStep(3)}
                >
                  Continue
                </Button>
              </Box>
            </Box>
          </Fade>
        )}
        {step == 3 && (
          <Fade in={step == 3} timeout={1000}>
            <Box
              padding={5}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                background: 'rgba(255, 247, 255, 1)',
                textAlign: 'center',
                height: '550px',
              }}
            >
              <Box
                sx={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Stepper orientation="vertical" sx={{ marginBottom: '10px' }}>
                  <Step>
                    <StepLabel StepIconComponent={CircleIconGrey}>
                      <Typography variant="body2">Complete</Typography>
                    </StepLabel>
                  </Step>
                  <Step>
                    <StepLabel StepIconComponent={() => <img src="/static/home/welcome_3.gif" />}>
                      <Typography variant="body2">Seller found</Typography>
                    </StepLabel>
                  </Step>
                  <Step>
                    <StepLabel StepIconComponent={CircleIconGreen}>
                      <Typography variant="body2">Buy request subitted</Typography>
                    </StepLabel>
                  </Step>
                </Stepper>
              </Box>
              <Typography variant="h6">Easily track your transactions</Typography>
              <Typography pt={2}>
                Once an order is placed and executed, you can track the progress of each transaction on the dashboard.
                We will also email you once orders have been filled.
              </Typography>
              <DotPagination sx={{ marginTop: 3 }} step={3} />
              <Box>
                <Button
                  sx={{ marginTop: 3, marginRight: 1 }}
                  variant="outlined"
                  color="info"
                  onClick={() => setStep(2)}
                >
                  Go Back
                </Button>
                <Button
                  sx={{ marginTop: 3, marginLeft: 1 }}
                  variant="contained"
                  color="info"
                  onClick={() => setStep(4)}
                >
                  Continue
                </Button>
              </Box>
            </Box>
          </Fade>
        )}
        {step == 4 && (
          <Fade in={step == 4} timeout={1000}>
            <Box
              padding={5}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                background: 'linear-gradient(180deg, rgba(13, 0, 255, 0.062) 0%, rgba(0, 0, 0, 0) 100%), #FFFFFF;',
                textAlign: 'center',
                height: '550px',
              }}
            >
              <Box
                sx={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <img src="/static/home/welcome_4.png" />
              </Box>
              <Typography variant="h6">Manage payees and connect bank accounts</Typography>
              <Typography pt={2}>
                Easily manage payee wallets and connected bank accounts to quickly buy and sell your crypto.
              </Typography>
              <DotPagination sx={{ marginTop: 3 }} step={4} />
              <Box>
                <Button
                  sx={{ marginTop: 3, marginRight: 1 }}
                  variant="outlined"
                  color="info"
                  onClick={() => setStep(3)}
                >
                  Go Back
                </Button>
                <Button sx={{ marginTop: 3, marginLeft: 1 }} variant="contained" color="info" onClick={onClickFinish}>
                  Finish
                </Button>
              </Box>
            </Box>
          </Fade>
        )}
      </DialogContent>
    </Dialog>
  );
};

TutorialDialog.propTypes = {
  onClose: PropTypes.any,
  open: PropTypes.bool,
};
