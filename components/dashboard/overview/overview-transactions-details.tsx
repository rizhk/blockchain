import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import StepContent from '@mui/material/StepContent'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import SearchIcon from '@mui/icons-material/Search'
import CircleIcon from '@mui/icons-material/Circle'
const steps = [
  {
    label: 'Complete',
    description: `Process is complete and funds has been successfully transferred`,
  },
  {
    label: 'Bank transfer',
    description: 'Waiting on funds transfer to your bank account',
  },
  {
    label: 'Buyer found',
    description: `A buyer has been found and transaction is complete`,
  },
  {
    label: 'Seller request submitted',
    description: `We have reached hour request to sell your crypto`,
  },
]

export const OverviewTransactionsDetails: FC = (props) => {
  return (
    <Box sx={{ margin: 1 }}>
      {/* <Typography display="inline-block" variant="h6">
        Status
      </Typography>
      <Typography className="flex" display="inline-block" variant="h6">
        Date/Time (GMT+8)
      </Typography> */}

      <Stepper orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel StepIconComponent={CircleIcon}>
              <Typography variant="h6">{step.label}</Typography>
              {step.description}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
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
