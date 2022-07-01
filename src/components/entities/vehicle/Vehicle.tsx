import { Box } from '@mui/system';
import { useAppTiles } from 'Hooks/useAppTiles';
import React from 'react';
import { GameObjectTypes, GameVehicle } from 'Types/gameTypes';
import useStyles from './Styles';

interface GameVehicleProperties {
	vehicle: GameVehicle;
}

const Vehicle = ({ vehicle }: GameVehicleProperties) => {

	const {
		selectObject
	} = useAppTiles();

	const classes = useStyles({ background: `${vehicle.color}` });

	return (
		<Box className={classes.vehicleContainer}>
			<Box
				className={classes.vehicleBox}
				onClick={() => selectObject(vehicle)}>
				<Box className={classes.vehicle}>
					{vehicle.type === GameObjectTypes.Player && "🚗"}
					{vehicle.type === GameObjectTypes.Default && "🚓"}

				</Box>
			</Box>
		</Box>
	)
}

export default Vehicle;