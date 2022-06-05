import { Fragment, useState } from 'react';
import type { FC, SyntheticEvent } from 'react';
import PropTypes from 'prop-types';
import {
  Badge,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  Divider,
  IconButton,
  InputAdornment,
  Pagination,
  TextField,
  Typography,
  Fade,
} from '@mui/material';
import {
    TransitionGroup,
  } from 'react-transition-group';
import { Search as SearchIcon } from '../../icons/search';
import { wait } from '../../utils/wait';
import { X as XIcon } from '../../icons/x';
import { Tip } from '../tip';

interface ContentSearchProps {
  onClose: (value?: number) => void;
  open?: boolean;
}

export const TutorialDialog: FC<ContentSearchProps> = (props) => {
  const { onClose, open, ...other } = props;
  const [step, setStep] = useState(1);

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      onClose={() => onClose()}
      open={!!open}
      keepMounted
      sx={{
        boxShadow: '0px 3px 38px rgba(0, 0, 0, 0.102)',
        borderRadius: '10px',
      }}
      {...other}
    >
      <DialogContent sx={{ padding: 0 }}>
        {
            step == 1 && (
                <Fade in={step == 1} timeout={1000}>
                    <Box padding={5} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'linear-gradient(180deg, rgba(13, 0, 255, 0.062) 0%, rgba(0, 0, 0, 0) 100%), #FFFFFF;', textAlign: 'center', height: '550px'}}>
                        <Box sx={{ flex: 1 }}></Box>
                        <Typography variant="h6">Welcome to Picante, let’s get started.</Typography>
                        <Typography pt={2}>With Picante, your business now has a complete suite of tools to work directly with crypto. Start in the dashbaord to buy or sell your crypto.</Typography>
                        <Button sx={{ marginTop: 6 }} variant="contained" color="info" onClick={() => setStep(2)}>Continue</Button>
                    </Box>
                </Fade>
            )
        }
        {
            step == 2 && (
                <Fade in={step == 2} timeout={1000}>
                    <Box padding={5} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'linear-gradient(180deg, rgba(13, 0, 255, 0.062) 0%, rgba(0, 0, 0, 0) 100%), #FFFFFF;', textAlign: 'center', height: '550px'}}>
                        <Box sx={{ flex: 1 }}></Box>
                        <Typography variant="h6">Active matching of buyer and seller</Typography>
                        <Typography pt={2}>Once you order to buy or sell crypto is placed, Picante immediatley matches you with a counterparty from its liquidity pool to fill the order</Typography>
                        <Box>
                            <Button sx={{ marginTop: 6, marginRight: 1 }} variant="outlined" color="info" onClick={() => setStep(1)}>Go Back</Button>
                            <Button sx={{ marginTop: 6, marginLeft: 1 }} variant="contained" color="info" onClick={() => setStep(3)}>Continue</Button>
                        </Box>
                    </Box>
                </Fade>
            )
        }
        {
            step == 3 && (
                <Fade in={step == 3} timeout={1000}>
                    <Box padding={5} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'linear-gradient(180deg, rgba(13, 0, 255, 0.062) 0%, rgba(0, 0, 0, 0) 100%), #FFFFFF;', textAlign: 'center', height: '550px'}}>
                        <Box sx={{ flex: 1 }}></Box>
                        <Typography variant="h6">Easily track your transactions</Typography>
                        <Typography pt={2}>Once an order is placed and executed, you can track the progress of each transaction on the dashboard. We will also email you once orders have been filled.</Typography>
                        <Box>
                            <Button sx={{ marginTop: 6, marginRight: 1 }} variant="outlined" color="info" onClick={() => setStep(2)}>Go Back</Button>
                            <Button sx={{ marginTop: 6, marginLeft: 1 }} variant="contained" color="info" onClick={() => setStep(4)}>Continue</Button>
                        </Box>
                    </Box>
                </Fade>
            )
        }
        {
            step == 4 && (
                <Fade in={step == 4} timeout={1000}>
                    <Box padding={5} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'linear-gradient(180deg, rgba(13, 0, 255, 0.062) 0%, rgba(0, 0, 0, 0) 100%), #FFFFFF;', textAlign: 'center', height: '550px'}}>
                        <Box sx={{ flex: 1 }}></Box>
                        <Typography variant="h6">Manage payees and connect bank accounts</Typography>
                        <Typography pt={2}>Easily manage payee wallets and connected bank accounts to quickly buy and sell your crypto.</Typography>
                        <Box>
                            <Button sx={{ marginTop: 6, marginRight: 1 }} variant="outlined" color="info" onClick={() => setStep(3)}>Go Back</Button>
                            <Button sx={{ marginTop: 6, marginLeft: 1 }} variant="contained" color="info" onClick={() => onClose(step)}>Finish</Button>
                        </Box>
                    </Box>
                </Fade>
            )
        }
      </DialogContent>
    </Dialog>
  );
};

TutorialDialog.propTypes = {
  onClose: PropTypes.any,
  open: PropTypes.bool
};
