import { Box } from '@mui/system';
import 'Components/app/App.css';
import { useAppTiles } from 'Hooks/useAppTiles';
import React from 'react';
import { GameVehicle } from 'Types/gameTypes';
import useStyles from './Styles';

interface GameVehicleProperties {
	vehicle: GameVehicle;
}

const GameVehicle = ({ vehicle }: GameVehicleProperties) => {

	const tileActions = useAppTiles();

	const selectVehicle = () => {

		tileActions.selectVehicle(vehicle);
	}

	const classes = useStyles({ background: vehicle.color });

	return (
		<Box
			height="100%"
			width="100%"
			display="flex"
			alignItems="center"
			className={classes.vehicle}
			justifyContent="center">
			<div
				style={{
					fontSize: 64,
					marginTop: -24
				}}
				onClick={() => selectVehicle()}>
				{vehicle.isPlayerCar && "🚗"}
				{!vehicle.isPlayerCar && "🚓"}
			</div>
		</Box>

	)
}

export default GameVehicle;