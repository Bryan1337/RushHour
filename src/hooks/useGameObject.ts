import { useAppTiles } from 'Hooks/useAppTiles';
import { RootStateOrAny, useSelector } from 'react-redux';
import { getCoordinateTileKey } from 'Scripts/coordinateHelper';
import { generateKey } from 'Scripts/keyHelper';
import { AppCarOrientations, AppTileIndices, GameObject, GameObjectTypes, GameState, GameTileCoordinate, VehicleColors } from 'Types/gameTypes';

export const useGameObject = () => {

	const {
		addObject,
		removeObject,
	} = useAppTiles();

	const gameObjects = useSelector((state: RootStateOrAny) => (state.gameReducer as GameState).gameObjects);

	const placementType = useSelector((state: RootStateOrAny) => (state.gameReducer as GameState).placementType);

	const placementDirection = useSelector((state: RootStateOrAny) => (state.gameReducer as GameState).placementDirection);

	const placementLength = useSelector((state: RootStateOrAny) => (state.gameReducer as GameState).placementLength);

	/**
	 * O(n)
	 *
	 * @param tile
	 * @returns GameObject|null
	 */
	const getGameObject = (tile: GameTileCoordinate) : GameObject | null => {

		const { xPosition, yPosition } = tile;

		const coordinate = getCoordinateTileKey(xPosition, yPosition);
		/** If theres a vehicle directly on the given tile, return it */
		if (Boolean(gameObjects[coordinate])) {

			return gameObjects[coordinate];
		}

		/** Otherwise, iterate over each object */
		for (let objectCoordinate in gameObjects) {

			const gameObject = gameObjects[objectCoordinate];

			if (gameObject.orientation === AppCarOrientations.Horizontal) {
				/** If the orientation is horizontal and the yPosition matches */
				if (gameObject.yPosition === yPosition) {
					/** xPosition is smaller than the objects xPosition plus its size */
					if (xPosition < gameObject.xPosition + gameObject.size) {
						/** xPosition is larger or equal to the objects xPosition */
						if (xPosition >= gameObject.xPosition) {

							return gameObject;
						}
					}
				}
			}

			if (gameObject.orientation === AppCarOrientations.Vertical) {
				/** If the orientation is vertical and the xPosition matches */
				if (gameObject.xPosition === xPosition) {
					/** yPosition is smaller than the objects yPosition plus its size */
					if (yPosition < gameObject.yPosition + gameObject.size) {
						/** yPosition is larger or equal to the objects yPosition */
						if (yPosition >= gameObject.yPosition) {

							return gameObject;
						}
					}
				}
			}
		}

		return null;
	}

	const addGameObject = (objectProperties: GameObject) => {

		addObject(objectProperties as GameObject);
	}

	const removeGameObject = (tile: GameTileCoordinate) => {

		return removeObject(tile);
	}

	const createObject = (tileProperties: GameTileCoordinate) => {

		if (Boolean(tileProperties)) {

			const interactableObjects = Object.keys(gameObjects).filter((key) => {

				return gameObjects[key].type !== GameObjectTypes.Wall;
			});

			const newObject: GameObject = {
				orientation: placementDirection,
				size: placementLength,
				type: placementType,
				key: generateKey(),
				color: placementType === GameObjectTypes.Player ? VehicleColors.X : VehicleColors[AppTileIndices[interactableObjects.length]],
				xPosition: Number(tileProperties?.xPosition),
				yPosition: Number(tileProperties?.yPosition),
			}

			addGameObject(newObject);
		}
	}

	return {
		getGameObject,
		addGameObject,
		removeGameObject,
		createObject,
	}
}