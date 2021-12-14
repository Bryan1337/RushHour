import { useDispatch } from "react-redux";
import { generateKey } from "Scripts/keyHelper";
import { AppCarOrientations, AppTileIndices, CreateGameProperties, GameTileMatrix, GameTileProperties, GameVehicle, VehicleColors } from "Types/gameTypes";

export const useGame = () => {

	const dispatch = useDispatch();

	const importString = (text: string): CreateGameProperties | null => {

		try {

			const encodedString = atob(text);

			const [gameGridSize, gameText] = encodedString.split('@');

			const uniqueVehiclesByKey = {};

			const vehicleOccuranceByKey = {};

			gameText.split(':').forEach((row, yIndex) => {

				row.split('').forEach((tile, xIndex) => {

					if (tile !== '.') {

						if (!Object.keys(uniqueVehiclesByKey).includes(tile)) {

							uniqueVehiclesByKey[tile] = {
								key: generateKey(),
								xPosition: xIndex,
								yPosition: yIndex,
								isPlayerCar: tile === 'X',
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
				vehicles: Object.values(uniqueVehiclesByKey)
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

				if (tile.vehicle) {

					if (tile.vehicle.isPlayerCar) {

						rowString += 'X';

					} else {

						if (!uniqueEncounteredVehicleKeys.includes(tile.vehicle.key)) {

							uniqueEncounteredVehicleKeys.push(tile.vehicle.key);
						}

						rowString += AppTileIndices[uniqueEncounteredVehicleKeys.indexOf(tile.vehicle.key)];
					}

				} else {

					rowString += '.';
				}
			})

			gameStringList.push(rowString);
		})

		return btoa(`${6}@${gameStringList.join(':')}`);
	}

	const createGameFromAppTiles = (gameAppTiles: GameTileMatrix<GameTileProperties>) : CreateGameProperties => {

		let gridSize = 0;

		const vehicles : Array<GameVehicle> = [];

		Object.keys(gameAppTiles).forEach((yIndex) => {

			Object.keys(gameAppTiles[yIndex]).forEach((xIndex) => {

				gridSize = Math.max(Number(xIndex) + 1, Number(yIndex) + 1, gridSize);

				const tile: GameTileProperties = gameAppTiles[yIndex][xIndex];

				if (tile.vehicle) {

					vehicles[tile.vehicle.key] = tile.vehicle;
				}
			})
		})

		return {
			gridSize,
			vehicles: Object.values(vehicles),
		}

	}

	return {
		importString,
		exportString,
		createGameFromAppTiles,
	}
}