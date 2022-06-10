import { Box } from "@mui/material";
import { FC } from "react";
import CircleIcon from '@mui/icons-material/Circle'

export const DotPagination: FC = (props: any) => (
    <Box sx={{ display: 'flex', ...props.sx }}>
        <CircleIcon style={{ height: 12, width: 12, marginLeft: 2, marginRight: 2 }} color={props.step == 1 ?"primary" : "disabled"} />
        <CircleIcon style={{ height: 12, width: 12, marginLeft: 2, marginRight: 2 }} color={props.step == 2 ?"primary" : "disabled"} />
        <CircleIcon style={{ height: 12, width: 12, marginLeft: 2, marginRight: 2 }} color={props.step == 3 ?"primary" : "disabled"} />
        <CircleIcon style={{ height: 12, width: 12, marginLeft: 2, marginRight: 2 }} color={props.step == 4 ?"primary" : "disabled"} />
    </Box>
)