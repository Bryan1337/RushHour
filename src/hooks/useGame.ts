import { useGameObject } from 'Hooks/useGameObject';
import { getCoordinateTileKey } from 'Scripts/coordinateHelper';
import { generateKey } from 'Scripts/keyHelper';
import { AppCarOrientations, AppTileIndices, CreateGameProperties, GameObject, GameObjectKeys, GameObjectMap, GameObjectTypes, VehicleColors } from "Types/gameTypes";

/**
 * "A-W" = Default vehicle
 * "X" = Player vehicle
 * "_" = Wall
 */

export const useGame = () => {

	const { getGameObject } = useGameObject();

	const getTypeFromString = (tileString: string) => {

		switch(tileString) {
			case GameObjectKeys.Player:
				return GameObjectTypes.Player;
			case GameObjectKeys.Wall:
				return GameObjectTypes.Wall;
			default:
				return GameObjectTypes.Vehicle;
		}
	}

	const levelIsAvailable = (level: number) => {

		if(level === 0) {

			return true;
		}

		const completedLevels = localStorage.getItem('completedLevels');

		const levels = JSON.parse(completedLevels || '[]');

		return levels.includes(level);
	}

	const hasCompletedLevel = (level: number) => {

		const completedLevels = localStorage.getItem('completedLevels');

		const levels = JSON.parse(completedLevels || '[]');

		return Boolean(levels) && levels.includes(level + 1);
	}

	const importString = (text: string): CreateGameProperties | null => {

		try {

			const encodedString = atob(text);

			const [gameGridSize, gameText] = encodedString.split('@');

			const uniqueGameObjectsByKey = {};

			const gameObjectOccuranceByKey = {};

			gameText.split(GameObjectKeys.Separator).forEach((row, yIndex) => {

				row.split('').forEach((tile, xIndex) => {

					let key = tile;

					if(tile === GameObjectKeys.Wall) {

						key = `${tile})_${xIndex}_${yIndex}`;
					}

					if (tile !== GameObjectKeys.EmptyTile) {

						if (!Object.keys(uniqueGameObjectsByKey).includes(tile)) {

							const type = getTypeFromString(tile);

							uniqueGameObjectsByKey[key] = {
								key: generateKey(),
								xPosition: xIndex,
								yPosition: yIndex,
								type,
								color: VehicleColors[tile],
							};

							gameObjectOccuranceByKey[key] = 0;
						}

						gameObjectOccuranceByKey[key] += 1;

						if (gameObjectOccuranceByKey[key] > 1) {

							if (xIndex > uniqueGameObjectsByKey[key].xPosition) {

								uniqueGameObjectsByKey[key].orientation = AppCarOrientations.Horizontal;
							}

							if (yIndex > uniqueGameObjectsByKey[key].yPosition) {

								uniqueGameObjectsByKey[key].orientation = AppCarOrientations.Vertical;
							}
						}

						uniqueGameObjectsByKey[key].size = gameObjectOccuranceByKey[key];
					}
				})
			})

			const gameObjects: GameObjectMap = {}

			Object.keys(uniqueGameObjectsByKey).forEach((key) => {

				const gameObject = uniqueGameObjectsByKey[key];

				gameObjects[getCoordinateTileKey(gameObject.xPosition, gameObject.yPosition)] = gameObject;
			})

			const createGameProperties: CreateGameProperties = {
				gridSize: Number(gameGridSize),
				gameObjects,
			}

			return createGameProperties;

		} catch (error) {

			console.warn(error)
		}

		return null;
	}

	const exportString = (gridSize: number, gameObjects: GameObjectMap) : string => {

		let gameString = '';

		const uniqueEncounteredVehicleKeys : Array<string> = [];

		// 6@ABB_..:A..CDD:EXXC...:E.FGGH:IIF..H:JJKKKH
		Array.from({ length: gridSize }).forEach((_, yIndex) => {

			Array.from({ length: gridSize }).forEach((_, xIndex) => {

				const gameObject = getGameObject({ xPosition: xIndex, yPosition: yIndex }) as GameObject;

				if (!Boolean(gameObject)) {

					gameString += GameObjectKeys.EmptyTile;

				} else if (gameObject.type === GameObjectTypes.Wall) {

					gameString += GameObjectKeys.Wall;

				} else if (gameObject.type === GameObjectTypes.Player) {

					gameString += GameObjectKeys.Player;

				} else if (gameObject.type === GameObjectTypes.Vehicle) {

					if (!uniqueEncounteredVehicleKeys.includes(gameObject.key)) {

						uniqueEncounteredVehicleKeys.push(gameObject.key);
					}

					gameString += AppTileIndices[uniqueEncounteredVehicleKeys.indexOf(gameObject.key)];
				}

				if(xIndex === gridSize - 1) {

					gameString += GameObjectKeys.Separator;
				}
			})
		})

		return btoa(`${gridSize}@${gameString}`);
	}

	return {
		importString,
		exportString,
		hasCompletedLevel,
		levelIsAvailable,
	}
}