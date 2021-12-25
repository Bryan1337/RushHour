import { useAppTiles } from 'Hooks/useAppTiles';
import { useMemo } from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import { AppCarOrientations, GameObject, GameObjectTypes, GameState, GameTileMatrix, GameTileProperties, GameVehicle } from 'Types/gameTypes';

export const useGameObject = () => {

	const {
		addWall,
		removeWall,
		addVehicle,
		removeVehicle,
	} = useAppTiles();

	const {
		vehicles,
		gridSize,
		selectedVehicle,
		placementType,
		selectedTile,
		walls,
	}: GameState = useSelector((state: RootStateOrAny) => state.gameReducer);

	const vehicleKeyMatrix: GameTileMatrix<string> = useMemo(() => {

		const matrix = {}

		Array.from({ length: gridSize }).forEach((_, yIndex) => {

			Array.from({ length: gridSize }).forEach((_, xIndex) => {

				matrix[yIndex] = {
					...matrix[yIndex],
					[xIndex]: null
				}
			})
		})

		vehicles.forEach((vehicle: GameVehicle) => {

			matrix[vehicle.yPosition] = {
				...matrix[vehicle.yPosition],
				[vehicle.xPosition]: vehicle.key
			}

			if (vehicle.orientation === AppCarOrientations.Horizontal) {

				for (let sizeCounter = 0; sizeCounter < vehicle.size; sizeCounter++) {

					matrix[vehicle.yPosition][vehicle.xPosition + sizeCounter] = vehicle.key
				}
			}

			if (vehicle.orientation === AppCarOrientations.Vertical) {

				for (let sizeCounter = 0; sizeCounter < vehicle.size; sizeCounter++) {

					matrix[vehicle.yPosition + sizeCounter][vehicle.xPosition] = vehicle.key;
				}
			}
		})

		return matrix;

	}, [
		selectedVehicle?.key,
		selectedTile?.xPosition,
		selectedTile?.yPosition,
		vehicles,
	]);


	const getVehicle = (tileProperties: GameTileProperties) => {

		const { xPosition, yPosition } = tileProperties;

		const vehicleKey = vehicleKeyMatrix[yPosition][xPosition];

		if (!vehicleKey) {

			return null;
		}

		for(let index in vehicles) {

			const vehicle = vehicles[index];

			if(vehicle.key === vehicleKey) {

				return vehicle;
			}
		}

		return null;
	}

	const getWall = (tile: GameTileProperties) => {

		if (Boolean(tile)) {

			for (let wallIndex = 0; wallIndex < walls.length; wallIndex++) {

				const wall = walls[wallIndex];

				if ((
					wall.yPosition === tile.yPosition &&
					wall.xPosition === tile.xPosition
				)) {

					return wall;
				}
			}
		}

		return null;
	}

	const getGameObject = (tile: GameTileProperties) : GameObject | null => {

		return getWall(tile) || getVehicle(tile)
	}

	const addGameObject = (tile: GameTileProperties, objectProperties?: GameVehicle) => {

		switch (placementType) {
			case GameObjectTypes.Player:
			case GameObjectTypes.Default: {
				return addVehicle(objectProperties!);
			}
			case GameObjectTypes.Wall: {
				return addWall(tile);
			}
		}
	}

	const removeGameObject = (tile: GameTileProperties) => {

		switch(placementType) {
			case GameObjectTypes.Player:
			case GameObjectTypes.Default: {
				return removeVehicle(tile);
			}
			case GameObjectTypes.Wall: {

				return removeWall(tile);
			}
		}
	}

	return {
		getWall,
		getVehicle,
		getGameObject,
		addGameObject,
		removeGameObject,
	}
}