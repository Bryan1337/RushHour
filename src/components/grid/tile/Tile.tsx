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

	const {
		gridSize,
		gameObjects,
		selectedObject,
	}: GameState = useSelector((state: RootStateOrAny) => state.gameReducer);

	const {
		getGameObject,
	} = useGameObject();

	const {
		isAccessibleCarTile,
		isBlockedCarTile,
	} = usePlacement();

	const classes = useStyles();

	const gameObject = useMemo(() => {

		return getGameObject(tileProperties);

	}, [ gameObjects ])

	const isBlocked = useMemo(() => {

		return isBlockedCarTile(tileProperties);

	}, [ selectedObject ])

	const isVehicleAccessible = useMemo(() => {

		return isAccessibleCarTile(tileProperties);

	}, [ selectedObject ])

	const isWinTile = useMemo(() => {

		return (
			tileProperties.xPosition === gridSize &&
			tileProperties.yPosition === getExitYPosition(gridSize)
		);

	}, [ tileProperties, gridSize ])

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