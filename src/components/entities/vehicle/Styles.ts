import { alpha } from '@mui/material';
import { makeStyles } from '@mui/styles';

interface VehicleCssProps {
	background: string;
}

const useStyles = makeStyles(() => ({
	vehicleContainer: {
		height: 125,
		width: 125,
		display: 'flex',
		justifyContent: 'center',
		cursor: 'pointer',
		transition: '250ms all',
		'&:hover': {
			filter: 'brightness(125%)'
		}
	},
	vehicleBox: ({ background }: VehicleCssProps) => ({
		background: alpha(background, 1),
		fontSize: 64,
		height: 125,
		width: 125,
		position: 'absolute',
		display: 'flex',
		justifyContent: 'center',
	}),
	vehicle: {
		marginTop: '20%',
	}
}));

export default useStyles;
