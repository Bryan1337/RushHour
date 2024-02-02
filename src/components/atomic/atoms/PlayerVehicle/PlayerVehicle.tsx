import { Box } from '@mui/system';
import React from 'react';
import AppTooltip from '../Tooltip/AppTooltip';

const PlayerVehicle = () => {
	return (
		<AppTooltip title="This is your vehicle. The goal is to move it to the finish tile!">
			<Box>
				🚗
			</Box>
		</AppTooltip>
	);
};

export default PlayerVehicle;