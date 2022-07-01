import { Box } from '@mui/system';
import React from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import { GameObject, GameObjectTypes, GameState, GameTileCoordinate } from 'Types/gameTypes';
import useStyles from './Styles';

interface WinTileProperties {
	tileProperties: GameTileCoordinate
}

const WinTile = ({
	tileProperties
}: WinTileProperties) => {

	const classes = useStyles();

	const {
		gameObjects,
	}: GameState = useSelector((state: RootStateOrAny) => state.gameReducer);

	const hasReachedFinish = () => {

		const { yPosition, xPosition } = tileProperties;

		const playerObjectCoordinate = Object.keys(gameObjects).find((coordinate) => {

			const gameObject = gameObjects[coordinate];

			return gameObject.type === GameObjectTypes.Player;

		}) as string;

		const playerObject = gameObjects[playerObjectCoordinate] as GameObject;

		if (Boolean(playerObject)) {

			const playerVehicleIsAdjacentToFinish = (
				playerObject.xPosition === (xPosition - Number(playerObject.size)) &&
				playerObject.yPosition === yPosition
			)

			return playerVehicleIsAdjacentToFinish;
		}

		return false;
	}

	const levelIsComplete = hasReachedFinish();

	return (
		<Box position="relative">
			🏁
			{levelIsComplete && <Box className={classes.finishReached}>
				✔️
			</Box>}
		</Box>
	);
};

export default WinTile;