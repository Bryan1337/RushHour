import { Box } from '@mui/system';
import { useAppTiles } from 'Hooks/useAppTiles';
import React from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import { GameState, GameTileCoordinate } from 'Types/gameTypes';
import useStyles from './Styles';
interface AccessibleTileProperties {
	tileProperties: GameTileCoordinate;
}

const AccessibleTile = ({
	tileProperties,
}: AccessibleTileProperties) => {

	const { xPosition, yPosition } = tileProperties;

	const {
		moveVehicle,
	} = useAppTiles();

	const {
		selectedVehicle,
	}: GameState = useSelector((state: RootStateOrAny) => state.gameReducer);

	const classes = useStyles();

	const moveToTile = () => {

		if (Boolean(selectedVehicle)) {

			let newXPosition = xPosition;

			let newYPosition = yPosition;
			// Make sure vehicles cant move out of bounds
			if (newYPosition > selectedVehicle!.yPosition) {

				newYPosition = newYPosition - selectedVehicle!.size + 1;
			}

			if (newXPosition > selectedVehicle!.xPosition) {

				newXPosition = newXPosition - selectedVehicle!.size + 1;
			}

			moveVehicle(selectedVehicle!, newXPosition, newYPosition);
		}
	}

	return (
		<Box
			className={classes.accessibleTile}
			onClick={() => moveToTile()}>
			✔️
		</Box>
	);
};

export default AccessibleTile;