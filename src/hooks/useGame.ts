import { useGameObject } from 'Hooks/useGameObject';
import { generateKey } from "Scripts/keyHelper";
import { AppCarOrientations, AppTileIndices, CreateGameProperties, GameObject, GameObjectTypes, GameTileMatrix, GameTileProperties, VehicleColors } from "Types/gameTypes";

/**
 * "A-W" = Default vehicle
 * "X" = Player vehicle
 * "_" = Wall
 */

export const useGame = () => {

	const { getVehicle, getWall } = useGameObject();

	const importString = (text: string): CreateGameProperties | null => {

		try {

			const encodedString = atob(text);

			const [gameGridSize, gameText] = encodedString.split('@');

			const uniqueVehiclesByKey = {};

			const vehicleOccuranceByKey = {};

			const walls: Array<GameObject> = [];

			gameText.split(':').forEach((row, yIndex) => {

				row.split('').forEach((tile, xIndex) => {

					if(tile === '_') {

						walls.push({
							xPosition: xIndex,
							yPosition: yIndex,
							key: generateKey(),
							type: GameObjectTypes.Wall,
						})

					} else if (tile !== '.') {

						if (!Object.keys(uniqueVehiclesByKey).includes(tile)) {

							uniqueVehiclesByKey[tile] = {
								key: generateKey(),
								xPosition: xIndex,
								yPosition: yIndex,
								type: tile === 'X' ? GameObjectTypes.Player : GameObjectTypes.Default,
								color: VehicleColors[tile],
							};

							vehicleOccuranceByKey[tile] = 0;
						}

						vehicleOccuranceByKey[tile] += 1;

						if (vehicleOccuranceByKey[tile] > 1) {

							if (xIndex > uniqueVehiclesByKey[tile].xPosition) {

								uniqueVehiclesByKey[tile].orientation = AppCarOrientations.Horizontal;
							}

							if (yIndex > uniqueVehiclesByKey[tile].yPosition) {

								uniqueVehiclesByKey[tile].orientation = AppCarOrientations.Vertical;
							}
						}

						uniqueVehiclesByKey[tile].size = vehicleOccuranceByKey[tile];
					}
				})
			})

			const createGameProperties: CreateGameProperties = {
				gridSize: Number(gameGridSize),
				vehicles: Object.values(uniqueVehiclesByKey),
				walls,
			}

			return createGameProperties;

		} catch (error) {

			console.warn(error)
		}

		return null;
	}

	const exportString = (tiles: GameTileMatrix<GameTileProperties>) : string => {

		const gameStringList : Array<string> = [];

		const uniqueEncounteredVehicleKeys : Array<string> = [];

		Object.keys(tiles).forEach((yIndex) => {

			const row = tiles[yIndex];

			let rowString = '';

			Object.keys(row).forEach((xIndex) => {

				const tile: GameTileProperties = row[xIndex];

				const vehicle = getVehicle(tile);

				const wall = getWall(tile);

				if(wall) {

					rowString += '_';

				} else if (vehicle) {

					if (vehicle.type === GameObjectTypes.Player) {

						rowString += 'X';

					} else {

						if (!uniqueEncounteredVehicleKeys.includes(vehicle.key)) {

							uniqueEncounteredVehicleKeys.push(vehicle.key);
						}

						rowString += AppTileIndices[uniqueEncounteredVehicleKeys.indexOf(vehicle.key)];
					}

				} else {

					rowString += '.';
				}
			})

			gameStringList.push(rowString);
		})

		return btoa(`${6}@${gameStringList.join(':')}`);
	}

	return {
		importString,
		exportString,
	}
}