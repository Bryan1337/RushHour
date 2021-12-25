import { RootStateOrAny, useSelector } from 'react-redux';
import { getExitYPosition } from 'Scripts/coordinateHelper';
import { AppCarOrientations, GameObjectTypes, GameState, GameTileProperties } from 'Types/gameTypes';
import { useGameObject } from './useGameObject';

export const usePlacement = () => {

	const {
		getGameObject,
	} = useGameObject();

	const {
		placementType,
		placementLength,
		placementDirection,
		selectedTile,
		gridSize,
		gameAppTiles,
		selectedVehicle,
		walls,
	}: GameState = useSelector((state: RootStateOrAny) => state.gameReducer);

	const isAccessibleCarTile = (tileProperties: GameTileProperties) : boolean => {

		const { xPosition, yPosition } = tileProperties;

		if (!selectedVehicle) {

			return false;
		}

		if (selectedVehicle.orientation === AppCarOrientations.Horizontal) {

			return yPosition === selectedVehicle.yPosition;
		}

		if (selectedVehicle.orientation === AppCarOrientations.Vertical) {

			return xPosition === selectedVehicle.xPosition;
		}

		return false;
	}

	const isSelectedTile = (tileProperties: GameTileProperties) : boolean => {

		const { xPosition, yPosition } = tileProperties;

		return (
			selectedTile?.xPosition === xPosition &&
			selectedTile.yPosition === yPosition
		);
	}

	const isAdjacentSelectedTile = (tileProperties: GameTileProperties) => {

		if(placementType === GameObjectTypes.Wall) {

			return false;
		}

		const { xPosition, yPosition } = tileProperties;

		if (placementDirection === AppCarOrientations.Horizontal) {

			if ((
				yPosition === selectedTile?.yPosition &&
				xPosition >= selectedTile?.xPosition &&
				xPosition <= selectedTile?.xPosition + placementLength - 1 &&
				xPosition <= gridSize - 1
			)) {

				return true;
			}
		}

		if (placementDirection === AppCarOrientations.Vertical) {

			if ((
				xPosition === selectedTile?.xPosition &&
				yPosition >= selectedTile?.yPosition &&
				yPosition <= selectedTile?.yPosition + placementLength - 1 &&
				yPosition <= gridSize - 1
			)) {

				return true;
			}
		}
	}

	const isBlockedCarTile = (tileProperties: GameTileProperties) : boolean => {

		const { xPosition, yPosition } = tileProperties;

		if (!selectedVehicle || !isAccessibleCarTile(tileProperties)) {

			return false;
		}

		if (selectedVehicle.orientation === AppCarOrientations.Horizontal) {

			for (let xIndex = selectedVehicle.xPosition + 1; xIndex < gridSize; xIndex++) {

				const tile: GameTileProperties = gameAppTiles[selectedVehicle.yPosition][xIndex];

				const gameObject = getGameObject(tile);

				if (Boolean(gameObject)) {

					if (gameObject?.key === selectedVehicle.key) {

						continue;
					}

					if (tile.xPosition <= xPosition) {

						return true;
					}
				}
			}

			for (let xIndex = selectedVehicle.xPosition - 1; xIndex >= 0; xIndex--) {

				const tile: GameTileProperties = gameAppTiles[selectedVehicle.yPosition][xIndex];

				const gameObject = getGameObject(tile);

				if (Boolean(gameObject)) {

					if (gameObject?.key === selectedVehicle.key) {

						continue;
					}

					if (tile.xPosition >= xPosition) {

						return true;
					}
				}
			}
		}

		if (selectedVehicle.orientation === AppCarOrientations.Vertical) {

			for (let yIndex = selectedVehicle.yPosition + 1; yIndex < gridSize; yIndex++) {

				const tile: GameTileProperties = gameAppTiles[yIndex][selectedVehicle.xPosition];

				const gameObject = getGameObject(tile);

				if (Boolean(gameObject)) {

					if (gameObject?.key === selectedVehicle.key) {

						continue;
					}

					if (tile.yPosition <= yPosition) {

						return true;
					}
				}
			}

			for (let yIndex = selectedVehicle.yPosition - 1; yIndex >= 0; yIndex--) {

				const tile: GameTileProperties = gameAppTiles[yIndex][selectedVehicle.xPosition];

				const gameObject = getGameObject(tile);

				if (Boolean(gameObject)) {

					if (gameObject?.key === selectedVehicle.key) {

						continue;
					}

					if (tile.yPosition >= yPosition) {

						return true;
					}
				}
			}
		}

		return false;
	}

	const isBlockedPlacementTile = (tileProperties: GameTileProperties) : boolean => {

		const { yPosition } = tileProperties;

		if (!isSelectedTile(tileProperties) && !isAdjacentSelectedTile(tileProperties)) {

			return false;
		}

		if (placementType === GameObjectTypes.Player) {

			if (placementDirection !== AppCarOrientations.Horizontal || yPosition !== getExitYPosition(gridSize)) {

				return true;
			}
		}

		if (placementDirection === AppCarOrientations.Horizontal) {

			for (let xIndex = selectedTile!.xPosition; xIndex < selectedTile!.xPosition + placementLength; xIndex++) {

				const tile: GameTileProperties = gameAppTiles[selectedTile!.yPosition][xIndex];

				const gameObject = getGameObject(tile);

				if (Boolean(gameObject)) {

					return true;
				}
			}
		}

		if (placementDirection === AppCarOrientations.Vertical) {

			for (let yIndex = selectedTile!.yPosition; yIndex < selectedTile!.yPosition + placementLength; yIndex++) {

				const tile: GameTileProperties = gameAppTiles[yIndex][selectedTile!.xPosition];

				const gameObject = getGameObject(tile);

				if (Boolean(gameObject)) {

					return true;
				}
			}
		}

		return false;
	}

	const isWallTile = (tileProperties: GameTileProperties) => {

		for(let wallIndex = 0; wallIndex < walls.length; wallIndex++) {

			const wall = walls[wallIndex];

			if((
				wall.yPosition === tileProperties.yPosition &&
				wall.xPosition === tileProperties.xPosition
			)) {

				return true;
			}
		}

		return null;
	}

	return {
		isSelectedTile,
		isAdjacentSelectedTile,
		isBlockedPlacementTile,
		isBlockedCarTile,
		isWallTile,
		isAccessibleCarTile,
	}
}