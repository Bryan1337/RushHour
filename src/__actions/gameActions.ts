import { AppCarOrientations, CreateGameProperties, GameObjectTypes, GameTileCoordinate, GameTileMatrix, GameTileProperties, GameVehicle, MoveTurn } from 'Types/gameTypes';
import { LevelData } from './../components/app/level_selection/LevelSelection';


export const setPlacementType = (placementType: GameObjectTypes) => ({
	type: 'SET_PLACEMENT_TYPE',
	placementType,
})

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

export const createGame = (game: CreateGameProperties) => ({
	type: 'CREATE_GAME',
	game,
})

export const createGameProperties = (levelData: LevelData) => ({
	type: 'CREATE_GAME_PROPERTIES',
	levelData,
})

export const addWall = (tile: GameTileCoordinate) => ({
	type: 'ADD_WALL',
	tile,
})

export const addVehicle = (vehicle: GameVehicle, tile: GameTileCoordinate) => ({
	type: 'ADD_VEHICLE',
	vehicle,
	tile,
})

export const undoLastMove = () => ({
	type: 'UNDO_VEHICLE_MOVE',
})

export const redoLastMove = () => ({
	type: 'REDO_VEHICLE_MOVE',
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

export const removeWall = (tile: GameTileCoordinate) => ({
	type: 'REMOVE_WALL',
	tile,
})

export const removeVehicle = (tile: GameTileCoordinate) => ({
	type: 'REMOVE_VEHICLE',
	tile,
})

export const setTurnQueue = (queue: Array<MoveTurn>) => ({
	type: 'SET_TURN_QUEUE',
	queue,
})