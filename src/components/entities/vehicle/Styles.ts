import { makeStyles } from '@mui/styles';

interface VehicleCssProps {
	background: string;
}

const useStyles = makeStyles(() => ({
	vehicleContainer: {
		height: 64,
		width: 64,
		display: 'flex',
		justifyContent: 'center',
		cursor: 'pointer',
		transition: '250ms all',
		'&:hover': {
			filter: 'brightness(125%)'
		}
	},
	vehicleBox: ({ background }: VehicleCssProps) => ({
		background,
		fontSize: 32,
		height: 64,
		width: 64,
		position: 'absolute',
		display: 'flex',
		justifyContent: 'center',
	}),
	vehicle: {
		marginTop: '20%',
	}
}));

export default useStyles;
