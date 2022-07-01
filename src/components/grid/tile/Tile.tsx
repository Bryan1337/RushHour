import { Box } from '@mui/material';
import { useGameObject } from 'Hooks/useGameObject';
import { usePlacement } from 'Hooks/usePlacement';
import React, { useMemo } from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import { getExitYPosition } from 'Scripts/coordinateHelper';
import { GameState, GameTileCoordinate } from 'Types/gameTypes';
import AccessibleTile from './accessible/AccessibleTile';
import BlockedTile from './blocked/BlockedTile';
import GameObjectTile from './object/GameObjectTile';
import useStyles from './Styles';
import WinTile from './win/WinTile';

interface TileProperties {
	tileProperties: GameTileCoordinate
}

const Tile = ({ tileProperties }: TileProperties) => {

	// Move this hook out of here, it's heavy
	const {
		gridSize,
	}: GameState = useSelector((state: RootStateOrAny) => state.gameReducer);

	const {
		getGameObject,
	} = useGameObject();

	const {
		isAccessibleCarTile,
		isBlockedCarTile,
	} = usePlacement();

	const gameObject = getGameObject(tileProperties);

	const isVehicleAccessible = isAccessibleCarTile(tileProperties);

	const isBlocked = isBlockedCarTile(tileProperties);

	const classes = useStyles();

	const isWinTile = useMemo(() => {

		return (
			tileProperties.xPosition === gridSize &&
			tileProperties.yPosition === getExitYPosition(gridSize)
		);

	}, [ tileProperties ])

	return (
		<Box
			className={classes.tile}>
			{gameObject && <GameObjectTile object={gameObject} />}
			{!gameObject && <>
				{isWinTile && <WinTile tileProperties={tileProperties} />}
				{!isWinTile && isVehicleAccessible && <>
					{isBlocked && <BlockedTile />}
					{!isBlocked && <AccessibleTile tileProperties={tileProperties} />}
				</>}
			</>}
		</Box>
	);
}


export default Tile;