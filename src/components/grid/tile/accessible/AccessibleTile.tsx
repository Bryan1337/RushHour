import { Box } from '@mui/system';
import { useAppTiles } from 'Hooks/useAppTiles';
import React from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import { GameObject, GameState, GameTileCoordinate, MoveTurn } from 'Types/gameTypes';
import useStyles from './Styles';
interface AccessibleTileProperties {
	tileProperties: GameTileCoordinate;
}

const AccessibleTile = ({
	tileProperties,
}: AccessibleTileProperties) => {

	const { xPosition, yPosition } = tileProperties;

	const {
		moveObject,
	} = useAppTiles();

	const {
		selectedObject,
	}: GameState = useSelector((state: RootStateOrAny) => state.gameReducer);

	const classes = useStyles();

	const moveToTile = () => {

		if (Boolean(selectedObject)) {

			let newXPosition = xPosition;

			let newYPosition = yPosition;
			// Make sure object cant move out of bounds
			if (newYPosition > selectedObject!.yPosition) {

				newYPosition = newYPosition - selectedObject!.size + 1;
			}

			if (newXPosition > selectedObject!.xPosition) {

				newXPosition = newXPosition - selectedObject!.size + 1;
			}

			const gameObject = selectedObject as GameObject;

			const moveTurn: MoveTurn = {
				gameObject,
				fromX: gameObject.xPosition,
				fromY: gameObject.yPosition,
				toX: newXPosition,
				toY: newYPosition,
			}

			moveObject(moveTurn);
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