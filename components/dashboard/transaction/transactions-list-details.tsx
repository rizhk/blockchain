import { FC, useCallback, useEffect, useState } from 'react';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import SearchIcon from '@mui/icons-material/Search';
import CircleIcon from '@mui/icons-material/Circle';
import { borderColor } from '@mui/system';
import { useMounted } from 'hooks/use-mounted';
import { transactionApi } from 'api/transaction-api';
import { Transaction, TxnStep } from 'types/transaction';
import OrderDetailsModal from './order-details/order-details-modal';
import { useOrderDetailsModal } from 'hooks/use-transaction-modal';
import { TextButton } from 'components/common/text-button';

const CircleIconGreen: FC = (props) => <CircleIcon color="success" fontSize="small" />;

const CircleIconRed: FC = (props) => <CircleIcon color="error" fontSize="small" />;

const CircleIconGray: FC = (props) => <CircleIcon color="disabled" fontSize="small" />;

const progressStateIcon = {
  CircleIconGreen: CircleIconGreen,
  CircleIconGray: CircleIconGray,
  CircleIconRed: CircleIconRed,
};

export const TransactionsListDetails: FC = (props) => {
  const isMounted = useMounted();

  const [steps, setSteps] = useState<TxnStep[]>([]);
  const [txn, setTxn] = useState<Transaction>(Object);

  useEffect(
    () => {
      getSteps(props);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const getSteps = useCallback(
    async (props) => {
      try {
        const data = await transactionApi.getTransaction(props.TransactionId);

        if (isMounted()) {
          setTxn(data);
          setSteps(data.steps.reverse());
        }
      } catch (err) {
        console.error(err);
      }
    },
    [isMounted],
  );

  const { isOrderDetailsShowing, toggleOrderDetails } = useOrderDetailsModal();

  return (
    <>
      <OrderDetailsModal isOrderDetailsShowing={isOrderDetailsShowing} txn={txn} hide={toggleOrderDetails} />
      <Box sx={{ ml: '100px', mb: '25px' }}>
        <Grid container sx={{ pt: '30px', mb: 2 }}>
          <Grid
            item
            md={8}
            xs={10}
            sx={{
              borderBottom: 'thin solid #ccc',
              paddingBottom: '10px',
            }}
          >
            <Typography display="inline-block" variant="body2">
              Status
            </Typography>
          </Grid>
          <Grid
            item
            sx={{
              borderBottom: 'thin solid #ccc',
              paddingRight: '10px',
              marginLeft: '10px',
            }}
          >
            <Typography className="flex" display="inline-block" variant="body2">
              Date/Time
            </Typography>
          </Grid>
        </Grid>
        <Stepper orientation="vertical" sx={{ marginBottom: '10px' }}>
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel StepIconComponent={progressStateIcon[step.icon_status]}>
                <Grid container>
                  <Grid item md={8} xs={10}>
                    <Typography variant="body2">{step.label}</Typography>
                    <Typography variant="subtitle2"> {step.description}</Typography>
                  </Grid>
                  <Grid item md={3} xs={2}>
                    <Typography display="inline" color="text.primary" variant="body2">
                      {' '}
                      {new Date(step.date).toLocaleDateString()}
                    </Typography>
                    <Typography display="inline" color="text.secondary" variant="body2">
                      {' '}
                      {new Date(step.date).toLocaleTimeString()}
                    </Typography>
                  </Grid>
                </Grid>
              </StepLabel>
            </Step>
          ))}
        </Stepper>
        {txn.status == 'in_progress' && (
          <Button variant="outlined" color="error" sx={{ mr: 2 }}>
            Cancel Transaction
          </Button>
        )}
        <TextButton onClick={toggleOrderDetails} variant="outlined">
          View order details
        </TextButton>
      </Box>
    </>
  );
};

// --------   Variation 2     ---------------

// export const OverviewTransactionsDetails: FC = (props) => {
//   return (
//     <List>
//       {steps.map((step, index) => (
//         <>
//           <ListItem>
//             <SearchIcon />
//             <Typography variant="h6">{step.label}</Typography>
//             <br />
//             <Typography variant="h6">{step.description}</Typography>
//             {step.description}
//           </ListItem>

//           <div className="vertical"></div>
//         </>
//       ))}
//     </List>
//   )
// }
