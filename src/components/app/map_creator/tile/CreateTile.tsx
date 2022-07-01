import GameObjectTile from 'Components/grid/tile/object/GameObjectTile';
import { useAppTiles } from 'Hooks/useAppTiles';
import { useGameObject } from 'Hooks/useGameObject';
import { usePlacement } from 'Hooks/usePlacement';
import React from 'react';
import { GameTileCoordinate } from 'Types/gameTypes';
import useStyles from './Styles';

interface CreateTileTileProperties {
	tileProperties: GameTileCoordinate
}

const CreateTile = ({ tileProperties }: CreateTileTileProperties) => {

	const {
		setSelectedTile,
	} = useAppTiles();

	const {
		getGameObject,
	} = useGameObject();

	const {
		isSelectedTile,
		isAdjacentSelectedTile,
		isBlockedPlacementTile,
	} = usePlacement();

	const gameObject = getGameObject(tileProperties);

	const isSelected = isSelectedTile(tileProperties);

	const isAdjacentSelected = isAdjacentSelectedTile(tileProperties);

	const isBlocked = isBlockedPlacementTile(tileProperties);

	const tileColor = () => {

		if (isBlocked) {

			return '#ff4747'
		}

		if (isSelected) {

			return '#4fc05f';
		}

		if (isAdjacentSelected) {

			return '#4fc05f60';
		}

		return '#343fc3';

	}

	const classes = useStyles({ tileColor: tileColor() });

	return (
		<>
			<div
				onClick={() => setSelectedTile(tileProperties)}
				className={classes.createTileContainer}>
				<span className={classes.createTileBorder} />
				{gameObject && <GameObjectTile object={gameObject} />}
			</div>
		</>

	);
}


export default CreateTile;