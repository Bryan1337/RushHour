import { getExitYPosition } from 'Scripts/coordinateHelper';
import { AppCarOrientations, GameObject, GameObjectTypes, GameState, GameTileCoordinate } from 'Types/gameTypes';
import { RootStateOrAny, useSelector } from 'react-redux';
import { getCoordinateTileKey } from './../scripts/coordinateHelper';
import { useGameObject } from './useGameObject';

export const usePlacement = () => {

	const {
		getGameObject,
	} = useGameObject();

	const placementType = useSelector((state: RootStateOrAny) => (state.gameReducer as GameState).placementType);

	const placementLength = useSelector((state: RootStateOrAny) => (state.gameReducer as GameState).placementLength);

	const placementDirection = useSelector((state: RootStateOrAny) => (state.gameReducer as GameState).placementDirection);

	const selectedTile = useSelector((state: RootStateOrAny) => (state.gameReducer as GameState).selectedTile);

	const gridSize = useSelector((state: RootStateOrAny) => (state.gameReducer as GameState).gridSize);

	const gameTiles = useSelector((state: RootStateOrAny) => (state.gameReducer as GameState).gameTiles);

	const selectedObject = useSelector((state: RootStateOrAny) => (state.gameReducer as GameState).selectedObject);

	/**
	 * O(1)
	 *
	 * @param tileProperties
	 *
	 * @returns boolean
	 */
	const isAccessibleCarTile = (selected: GameObject, tileProperties: GameTileCoordinate) : boolean => {

		const { xPosition, yPosition } = tileProperties;

		if (!selected) {

			return false;
		}

		if (selected.orientation === AppCarOrientations.Horizontal) {

			return (
				yPosition === selected.yPosition
			);
		}

		if (selected.orientation === AppCarOrientations.Vertical) {

			return (
				xPosition === selected.xPosition
			);
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

		if(!selectedTile) {

			return false;
		}

		return (
			selectedTile.xPosition === xPosition &&
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
	const isBlockedCarTile = (selected, tileProperties: GameTileCoordinate) : boolean => {

		const { xPosition, yPosition } = tileProperties;

		if (!isAccessibleCarTile(selected, tileProperties)) {

			return false;
		}

		const selection = selected as GameObject;

		if (selection.orientation === AppCarOrientations.Horizontal) {

			for (let xIndex = selection.xPosition + 1; xIndex < selection.xPosition + selection.size; xIndex++) {

				if(tileProperties.xPosition === xIndex) {

					return true;
				}
			}

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

			for (let yIndex = selection.yPosition + 1; yIndex < selection.yPosition + selection.size; yIndex++) {

				if (tileProperties.yPosition === yIndex) {

					return true;
				}
			}

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