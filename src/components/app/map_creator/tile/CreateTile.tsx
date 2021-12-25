import Vehicle from 'Components/entities/vehicle/Vehicle';
import Wall from 'Components/entities/wall/Wall';
import { useAppTiles } from 'Hooks/useAppTiles';
import { useGameObject } from 'Hooks/useGameObject';
import { usePlacement } from 'Hooks/usePlacement';
import React from 'react';
import { GameTileProperties } from 'Types/gameTypes';
import useStyles from './Styles';

interface CreateTileTileProperties {
	tileProperties: GameTileProperties
}

const CreateTile = ({ tileProperties }: CreateTileTileProperties) => {

	const {
		setSelectedTile,
	} = useAppTiles();

	const {
		getWall,
		getVehicle,
	} = useGameObject();

	const {
		isSelectedTile,
		isAdjacentSelectedTile,
		isBlockedPlacementTile,
	} = usePlacement();

	const vehicle = getVehicle(tileProperties);

	const wall = getWall(tileProperties);

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
				{wall && <Wall />}
				{vehicle && <Vehicle vehicle={vehicle} />}
			</div>
		</>

	);
}


export default CreateTile;