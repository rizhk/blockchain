import Grid from "@mui/material/Grid";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import CircleIcon from "@mui/icons-material/Circle";
import Box from "@mui/material/Box";

const CircleIconGreen = () => <CircleIcon color="success" fontSize="small" />;
const CircleIconRed = () => <img src="/static/home/welcome_3.gif" />;
const CircleIconGray = () => <CircleIcon color="disabled" fontSize="small" />;

const progressStateIcon = {
	complete: CircleIconGreen,
	pending: CircleIconGray,
	active: CircleIconRed,
};

export const ProgressSteps: FC = (props: {
	progressTitle: any;
	progressStages: any;
	activeStep: any;
}) => {
	const { progressTitle, progressStages, activeStep } = props;
	return (
		<>
			<Box sx={{ ml: "100px", mb: "25px", mt: "25px" }}>
				<Box
					width={450}
					sx={{
						borderBottom: "thin solid #ccc",
						paddingRight: "10px",
						ml: "10px",
						mb: "20px",
					}}>
					<Typography
						display="inline-block"
						variant="body2"
						sx={{ fontWeight: "bold" }}>
						{progressTitle}
					</Typography>
				</Box>
				<Stepper
					orientation="vertical"
					sx={{ marginBottom: "10px" }}
					activeStep={activeStep}>
					{progressStages.map(
						(step: {
							label: {} | null | undefined;
							icon_status: string | number;
						}) => (
							<Step key={step.label}>
								<StepLabel
									StepIconComponent={
										progressStateIcon[step.status]
									}>
									<Grid container>
										<Grid item md={8} xs={10}>
											<Typography variant="body2">
												{step.label}
											</Typography>
										</Grid>
									</Grid>
								</StepLabel>
							</Step>
						)
					)}
				</Stepper>
			</Box>
		</>
	);
};
