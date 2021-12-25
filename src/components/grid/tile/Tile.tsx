import { Box } from '@mui/material';
import { useGameObject } from 'Hooks/useGameObject';
import { usePlacement } from 'Hooks/usePlacement';
import React from 'react';
import { GameTileProperties } from 'Types/gameTypes';
import AccessibleTile from './accessible/AccessibleTile';
import BlockedTile from './blocked/BlockedTile';
import GameObjectTile from './object/GameObjectTile';
import useStyles from './Styles';
import WinTile from './win/WinTile';

interface TileProperties {
	tileProperties: GameTileProperties
}

const Tile = ({ tileProperties }: TileProperties) => {

	const {
		isWinTile,
	} : GameTileProperties = tileProperties


	// Move this hook out of here, it's heavy
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

	const tileColor = () => {

		if (isWinTile) {

			return '#00000000';
		}

		return '#252525';
	}

	const classes = useStyles({ background: tileColor() });

	return (
		<Box
			className={classes.tile}>
			{gameObject && <GameObjectTile object={gameObject} />}
			{!gameObject && <>
				{isWinTile && <WinTile />}
				{!isWinTile && isVehicleAccessible && <>
					{isBlocked && <BlockedTile />}
					{!isBlocked && <AccessibleTile tileProperties={tileProperties} />}
				</>}
			</>}
		</Box>
	);
}


export default Tile;