import { AppCarOrientations, CreateGameProperties, GameObjectTypes, GameTileCoordinate, MoveTurn } from 'Types/gameTypes';
import { GameObject } from './../__types/gameTypes';
import { LevelData } from './../components/app/level_selection/LevelSelection';

export const setPlacementType = (placementType: GameObjectTypes) => ({
	type: 'SET_PLACEMENT_TYPE',
	placementType,
})

export const selectObject = (gameObject: GameObject | null) => ({
	type: 'SELECT_OBJECT',
	gameObject
})

export const moveObject = (moveTurn: MoveTurn) => ({
	type: 'MOVE_OBJECT',
	moveTurn,
})

export const undoMoveObject = (moveTurn: MoveTurn) => ({
	type: 'UNDO_MOVE_OBJECT',
	moveTurn,
})

export const redoMoveObject = (moveTurn: MoveTurn) => ({
	type: 'REDO_MOVE_OBJECT',
	moveTurn,
})

export const createGame = (game: CreateGameProperties) => ({
	type: 'CREATE_GAME',
	game,
})

export const createGameProperties = (levelData: LevelData) => ({
	type: 'CREATE_GAME_PROPERTIES',
	levelData,
})

export const addObject = (gameObject: GameObject) => ({
	type: 'ADD_OBJECT',
	gameObject,
})

export const setSelectedTile = (tile: GameTileCoordinate) => ({
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

export const removeObject = (tile: GameTileCoordinate) => ({
	type: 'REMOVE_OBJECT',
	tile,
})

export const setTurnQueue = (queue: Array<MoveTurn>) => ({
	type: 'SET_TURN_QUEUE',
	queue,
})

export const setGridSize = (size: number) => ({
	type: 'SET_GRID_SIZE',
	size,
})

export const setHorizontalGridSize = (size: number) => ({
	type: 'SET_HORIZONTAL_GRID_SIZE',
	size,
})

export const setVerticalGridSize = (size: number) => ({
	type: 'SET_VERTICAL_GRID_SIZE',
	size,
})