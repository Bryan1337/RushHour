import { RootStateOrAny, useSelector } from 'react-redux';
import { getExitYPosition } from 'Scripts/coordinateHelper';
import { AppCarOrientations, GameObject, GameObjectTypes, GameState, GameTileCoordinate } from 'Types/gameTypes';
import { getCoordinateTileKey } from './../scripts/coordinateHelper';
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
		gameTiles,
		selectedObject,
	}: GameState = useSelector((state: RootStateOrAny) => state.gameReducer);

	/**
	 * O(1)
	 *
	 * @param tileProperties
	 *
	 * @returns boolean
	 */
	const isAccessibleCarTile = (tileProperties: GameTileCoordinate) : boolean => {

		const { xPosition, yPosition } = tileProperties;

		if (!selectedObject) {

			return false;
		}

		if (selectedObject.orientation === AppCarOrientations.Horizontal) {

			return yPosition === selectedObject.yPosition;
		}

		if (selectedObject.orientation === AppCarOrientations.Vertical) {

			return xPosition === selectedObject.xPosition;
		}

		return false;
	}

	/**
	 * O(1)
	 *
	 * @param tileProperties
	 * @returns boolean
	 */
	const isSelectedTile = (tileProperties: GameTileCoordinate) : boolean => {

		const { xPosition, yPosition } = tileProperties;

		return (
			selectedTile?.xPosition === xPosition &&
			selectedTile.yPosition === yPosition
		);
	}


	/**
	 * O(1)
	 *
	 * @param tileProperties
	 * @returns
	 */
	const isAdjacentSelectedTile = (tileProperties: GameTileCoordinate) => {

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

		return false;
	}

	/**
	 * O(n)
	 *
	 * @param tileProperties
	 * @returns boolean
	 */
	const isBlockedCarTile = (tileProperties: GameTileCoordinate) : boolean => {

		const { xPosition, yPosition } = tileProperties;

		if (!isAccessibleCarTile(tileProperties)) {

			return false;
		}

		const selection = selectedObject as GameObject;

		if (selection.orientation === AppCarOrientations.Horizontal) {

			for (let xIndex = selection.xPosition + 1; xIndex < gridSize; xIndex++) {

				const coordinate = getCoordinateTileKey(xIndex, selection.yPosition);

				const tile: GameTileCoordinate = gameTiles[coordinate];

				const gameObject = getGameObject(tile);

				if (Boolean(gameObject)) {

					if (gameObject?.key === selection.key) {

						continue;
					}

					if (tile.xPosition <= xPosition) {

						return true;
					}
				}
			}

			for (let xIndex = selection.xPosition - 1; xIndex >= 0; xIndex--) {

				const coordinate = getCoordinateTileKey(xIndex, selection.yPosition);

				const tile: GameTileCoordinate = gameTiles[coordinate];

				const gameObject = getGameObject(tile);

				if (Boolean(gameObject)) {

					if (gameObject?.key === selection.key) {

						continue;
					}

					if (tile.xPosition >= xPosition) {

						return true;
					}
				}
			}
		}

		if (selection.orientation === AppCarOrientations.Vertical) {

			for (let yIndex = selection.yPosition + 1; yIndex < gridSize; yIndex++) {

				const coordinate = getCoordinateTileKey(selection.xPosition, yIndex);

				const tile: GameTileCoordinate = gameTiles[coordinate];

				const gameObject = getGameObject(tile);

				if (Boolean(gameObject)) {

					if (gameObject?.key === selection.key) {

						continue;
					}

					if (tile.yPosition <= yPosition) {

						return true;
					}
				}
			}

			for (let yIndex = selection.yPosition - 1; yIndex >= 0; yIndex--) {

				const coordinate = getCoordinateTileKey(selection.xPosition, yIndex);

				const tile: GameTileCoordinate = gameTiles[coordinate];

				const gameObject = getGameObject(tile);

				if (Boolean(gameObject)) {

					if (gameObject?.key === selection.key) {

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

	const isBlockedPlacementTile = (tileProperties: GameTileCoordinate) : boolean => {

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

				const coordinate = getCoordinateTileKey(xIndex, selectedTile!.yPosition);

				const tile: GameTileCoordinate = gameTiles[coordinate];

				const gameObject = getGameObject(tile);

				if (Boolean(gameObject)) {

					return true;
				}
			}
		}

		if (placementDirection === AppCarOrientations.Vertical) {

			for (let yIndex = selectedTile!.yPosition; yIndex < selectedTile!.yPosition + placementLength; yIndex++) {

				const coordinate = getCoordinateTileKey(selectedTile!.xPosition, yIndex);

				const tile: GameTileCoordinate = gameTiles[coordinate];

				const gameObject = getGameObject(tile);

				if (Boolean(gameObject)) {

					return true;
				}
			}
		}

		return false;
	}

	return {
		isSelectedTile,
		isAdjacentSelectedTile,
		isBlockedPlacementTile,
		isBlockedCarTile,
		isAccessibleCarTile,
	}
}