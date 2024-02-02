import { Box, Grow } from '@mui/material';
import { useGameObject } from 'Hooks/useGameObject';
import { usePlacement } from 'Hooks/usePlacement';
import { getExitYPosition } from 'Scripts/coordinateHelper';
import { AppCarOrientations, GameObject, GameState, GameTileCoordinate } from 'Types/gameTypes';
import React, { useMemo } from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import useStyles from './Styles';
import AccessibleTile from './accessible/AccessibleTile';
import GameObjectTile from './object/GameObjectTile';
import WinTile from './win/WinTile';

interface TileProperties {
	tileProperties: GameTileCoordinate
}

const Tile = ({ tileProperties }: TileProperties) => {

	const gridSize = useSelector((state: RootStateOrAny) => (state.gameReducer as GameState).gridSize);

	const gameObjects = useSelector((state: RootStateOrAny) => (state.gameReducer as GameState).gameObjects);

	const selectedObject = useSelector((state: RootStateOrAny) => (state.gameReducer as GameState).selectedObject);

	const {
		getGameObject,
	} = useGameObject();

	const {
		isAccessibleCarTile,
		isBlockedCarTile,
	} = usePlacement();

	const classes = useStyles();

	const gameObject = useMemo(() => {

		const gameObject = getGameObject(tileProperties);

		return (
			gameObject &&
			gameObject.xPosition === tileProperties.xPosition &&
			gameObject.yPosition === tileProperties.yPosition
		) ? gameObject : null;

	}, [ gameObjects ])

	const isBlocked = useMemo(() => {

		return isBlockedCarTile(selectedObject, tileProperties);

	}, [
		Boolean(selectedObject),
		selectedObject?.orientation === AppCarOrientations.Horizontal && selectedObject?.yPosition !== tileProperties.yPosition,
		selectedObject?.orientation === AppCarOrientations.Vertical && selectedObject?.xPosition !== tileProperties.xPosition,
	])

	const isVehicleAccessible = useMemo(() => {

		return isAccessibleCarTile(selectedObject as GameObject, tileProperties);

	}, [
		Boolean(selectedObject),
		selectedObject?.orientation === AppCarOrientations.Horizontal && selectedObject?.yPosition !== tileProperties.yPosition,
		selectedObject?.orientation === AppCarOrientations.Vertical && selectedObject?.xPosition !== tileProperties.xPosition,
	 ])

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
					{/* {isBlocked && <BlockedTile />} */}
					<Grow in={!isBlocked}>
						<Box>
							<AccessibleTile tileProperties={tileProperties} />
						</Box>
					</Grow>
					{/* {!isBlocked && <AccessibleTile tileProperties={tileProperties} />} */}
				</>}
			</>}
		</Box>
	);
}


export default Tile;