import * as gameActions from 'Actions/gameActions';
import { useDispatch } from "react-redux";
import { AppCarOrientations, CreateGameProperties, GameObjectTypes, GameTileCoordinate, GameTileMatrix, GameTileProperties, GameVehicle, MoveTurn } from "Types/gameTypes";
import { LevelData } from './../components/app/level_selection/LevelSelection';

export const useAppTiles = () => {

	const dispatch = useDispatch();

	const setGridTiles = (grid: GameTileMatrix<GameTileProperties>) => {

		dispatch(gameActions.setGridTiles(grid));
	}

	const moveVehicle = (vehicle: GameVehicle, newXPosition: number, newYPosition: number) => {

		// console.log(`Moving vehicle ${vehicle.key}: ${Number(vehicle.yPosition)},${Number(vehicle.xPosition)} > ${newYPosition},${newXPosition}`)

		dispatch(gameActions.moveVehicle(vehicle, newXPosition, newYPosition));
	}

	const selectVehicle = (vehicle: GameVehicle) => {

		dispatch(gameActions.setSelectedVehicle(vehicle));
	}

	const createGame = (gameProperties: CreateGameProperties) => {

		dispatch(gameActions.createGame(gameProperties));
	}

	const createGameProperties = (levelData: LevelData) => {

		dispatch(gameActions.createGameProperties(levelData));
	}

	const addWall = (tile: GameTileCoordinate) => {

		dispatch(gameActions.addWall(tile));
	}

	const addVehicle = (vehicle: GameVehicle) => {

		dispatch(gameActions.addVehicle(vehicle));
	}

	const setSelectedTile = (tile: GameTileProperties) => {

		dispatch(gameActions.setSelectedTile(tile));
	}

	const setPlacementLength = (length: number) => {

		dispatch(gameActions.setPlacementLength(length));
	}

	const setPlacementType = (type: GameObjectTypes) => {

		dispatch(gameActions.setPlacementType(type));
	}

	const setPlacementDirection = (direction: AppCarOrientations) => {

		dispatch(gameActions.setPlacementDirection(direction));
	}

	const removeVehicle = (tile: GameTileCoordinate) => {

		dispatch(gameActions.removeVehicle(tile));
	}

	const removeWall = (tile: GameTileCoordinate) => {

		dispatch(gameActions.removeWall(tile));
	}

	const setTurnQueue = (queue : Array<MoveTurn>) => {

		dispatch(gameActions.setTurnQueue(queue));
	}

	const undoLastMove = () => {

		dispatch(gameActions.undoLastMove());
	}

	const redoLastMove = () => {

		dispatch(gameActions.redoLastMove());
	}

	return {
		selectVehicle,
		moveVehicle,
		createGame,
		createGameProperties,
		addWall,
		addVehicle,
		setGridTiles,
		setSelectedTile,
		setPlacementType,
		setPlacementLength,
		setPlacementDirection,
		removeVehicle,
		removeWall,
		setTurnQueue,
		undoLastMove,
		redoLastMove,
	}
}