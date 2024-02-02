import { alpha, lighten } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { AppCarOrientations, GameVehicle } from 'Types/gameTypes';


const baseVehicleWidth = 64;
const baseVehicleHeight = 64;

const itemPadding = 8

interface CssProps {
	vehicle: GameVehicle;
	isSelectedVehicle: boolean;
}

const getVehicleWidth = (vehicle: GameVehicle) => {

	if(vehicle.orientation === AppCarOrientations.Horizontal) {

		return (vehicle.size * baseVehicleWidth) + (vehicle.size - 1) * itemPadding;
	}

	return baseVehicleWidth;
}

const getVehicleHeight = (vehicle: GameVehicle) => {

	if(vehicle.orientation === AppCarOrientations.Vertical) {

		return (vehicle.size * baseVehicleHeight) + (vehicle.size - 1) * itemPadding;
	}

	return baseVehicleHeight;
}


const getBackgroundGradient = (vehicle: GameVehicle) => {

	// if (vehicle.type === GameObjectTypes.Player) {

	// 	return `url("🚗")`;
	// }

	return `linear-gradient(146deg, ${vehicle.color} 0%, ${lighten(vehicle.color as string, .4)} 100%)`;
}

const useStyles = makeStyles(() => ({
	vehicleContainer: {
		height: 64,
		width: 64,
		display: 'flex',
		cursor: 'pointer',
		transition: '250ms all',
		'&:hover': {
			filter: 'brightness(125%)'
		},
		userSelect: 'none',
	},
	vehicleBox: ({ vehicle, isSelectedVehicle }: CssProps) => ({
		background: getBackgroundGradient(vehicle),
		fontSize: 32,
		borderRadius: 8,
		boxShadow: isSelectedVehicle ? `0 0 0 4px ${alpha(vehicle.color as string, .5)}` : 'none',
		height: getVehicleHeight(vehicle),
		width: getVehicleWidth(vehicle),
		position: 'absolute',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		transition: '125ms ease-in-out all',
		overflow: 'hidden',
	}),
	vehicle: {
		marginTop: -8,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	selectedVehicleIndicator: {
		background: 'purple',
	}
}));

export default useStyles;
