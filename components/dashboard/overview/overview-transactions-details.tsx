import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import StepContent from '@mui/material/StepContent'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import SearchIcon from '@mui/icons-material/Search'
import CircleIcon from '@mui/icons-material/Circle'
import { borderColor } from '@mui/system'

const steps = [
  {
    label: 'Complete',
    description: `Process is complete and funds has been successfully transferred`,
    status: 'CircleIconGreen',
  },
  {
    label: 'Bank transfer',
    description: 'Waiting on funds transfer to your bank account',
    status: 'CircleIconRed',
  },
  {
    label: 'Buyer found',
    description: `A buyer has been found and transaction is complete`,
    status: 'CircleIconGreen',
  },
  {
    label: 'Seller request submitted',
    description: `We have reached hour request to sell your crypto`,
    status: 'CircleIconGreen',
  },
]

const CircleIconGreen: FC = (props) => (
  <CircleIcon color="success" fontSize="small" />
)
const CircleIconRed: FC = (props) => (
  <CircleIcon color="error" fontSize="small" />
)

export const OverviewTransactionsDetails: FC = (props) => {
  return (
    <Box sx={{ marginLeft: '100px', marginBottom: '25px' }}>
      <Grid container sx={{ paddingTop: '30px', mb: 2 }}>
        <Grid
          item
          md={8}
          xs={10}
          sx={{ borderBottom: 'thin solid #ccc', paddingBottom: '10px' }}
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
            Date/Time (GMT+8)
          </Typography>
        </Grid>
      </Grid>
      <Stepper orientation="vertical" sx={{ marginBottom: '10px' }}>
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel StepIconComponent={CircleIconGreen}>
              <Grid container>
                <Grid item md={8} xs={10}>
                  <Typography variant="body2">{step.label}</Typography>
                  <Typography variant="body3"> {step.description}</Typography>
                </Grid>
                <Grid>25-07-2022</Grid>
              </Grid>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      <Button variant="outlined" color="error">
        Cancel Transaction
      </Button>
    </Box>
  )
}

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
