
import { AppCarOrientations, CreateGameProperties, GameTileMatrix, GameTileProperties, GameVehicle, MoveTurn } from 'Types/gameTypes';

export const setGridTiles = (grid: GameTileMatrix<GameTileProperties>) => ({
	type: 'SET_GRID_TILES',
	grid,
})

export const setSelectedVehicle = (vehicle: GameVehicle) => ({
	type: 'SET_SELECTED_VEHICLE',
	vehicle
})

export const moveVehicle = (vehicle: GameVehicle, newXPosition: number, newYPosition: number) => ({
	type: 'MOVE_VEHICLE',
	vehicle,
	newXPosition,
	newYPosition,
})

export const createGame = (gameProperties: CreateGameProperties) => ({
	type: 'CREATE_GAME',
	gameProperties,
})

export const addVehicle = (vehicle: GameVehicle) => ({
	type: 'ADD_VEHICLE',
	vehicle
})

export const undoLastMove = () => ({
	type: 'UNDO_LAST_MOVE',
})

export const redoLastMove = () => ({
	type: 'REDO_LAST_MOVE',
})

export const setSelectedTile = (tile: GameTileProperties) => ({
	type: 'SET_SELECTED_TILE',
	tile,
})

export const setPlacementLength = (length: number) => ({
	type: 'SET_PLACEMENT_LENGTH',
	length,
})

export const setPlacementDirection = (direction: AppCarOrientations) => ({
	type: 'SET_PLACEMENT_DIRECTION',
	direction
})

export const removeVehicleFromSelectedTile = () => ({
	type: 'REMOVE_VEHICLE_FROM_SELECTED_TILE',
})

export const setTurnQueue = (queue: Array<MoveTurn>) => ({
	type: 'SET_TURN_QUEUE',
	queue,
})