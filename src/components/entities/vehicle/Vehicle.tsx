import { Box } from '@mui/system';
import PlayerVehicle from 'Components/atomic/atoms/PlayerVehicle/PlayerVehicle';
import { useAppTiles } from 'Hooks/useAppTiles';
import { GameObjectTypes, GameState, GameVehicle } from 'Types/gameTypes';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import useStyles from './Styles';

interface GameVehicleProperties {
	vehicle: GameVehicle;
}

export const OBJECT_ID_PREFIX = "vehicle_id_";

const Vehicle = ({ vehicle }: GameVehicleProperties) => {

	const selectedObject = useSelector((state: RootStateOrAny) => (state.gameReducer as GameState).selectedObject);

	const isSelectedVehicle = useMemo(() => {

		return (
			Boolean(selectedObject) &&
			selectedObject?.xPosition === vehicle.xPosition &&
			selectedObject?.yPosition === vehicle.yPosition
		);

	}, [selectedObject, vehicle])

	const {
		selectObject,
	} = useAppTiles();

	const classes = useStyles({vehicle, isSelectedVehicle});

	return (
		<Box className={classes.vehicleContainer}>
			<Box
				className={classes.vehicleBox}
				id={`${OBJECT_ID_PREFIX}${vehicle.key}`}
				onClick={() => selectObject(vehicle)}>
				<Box className={classes.vehicle} >
					{vehicle.type === GameObjectTypes.Player && (
						<PlayerVehicle />
					)}
				</Box>
			</Box>
		</Box>
	)
}

export default Vehicle;