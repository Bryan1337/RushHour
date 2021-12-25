import { cloneDeep, isEmpty } from 'lodash';
import { AnyAction } from 'redux';
import { getDimension, getExitYPosition } from 'Scripts/coordinateHelper';
import { AppCarOrientations, CreateGameProperties, GameObjectSizes, GameObjectTypes, GameState, GameTileMatrix, GameTileProperties } from 'Types/gameTypes';
import { LevelData } from './../components/app/level_selection/LevelSelection';

export const initialAppState: GameState = {
	gridSize: 6,
	selectedVehicle: null,
	selectedTile: null,
	gameAppTiles: {},
	placementDirection: AppCarOrientations.Horizontal,
	placementLength: GameObjectSizes.Small,
	placementType: GameObjectTypes.Default,
	moveCounter: 0,
	turnQueue: [],
	vehicles: [],
	walls: [],
	levelData: null,
	undoQueue: [],
	redoQueue: [],
}

export const gameReducer = (state: GameState = initialAppState, action: AnyAction) => {
	switch (action.type) {
		case 'SET_PLACEMENT_TYPE': {

			let newPlacementLength = state.placementLength

			if (action.placementType === GameObjectTypes.Wall) {

				newPlacementLength = GameObjectSizes.Tiny;

			} else {

				newPlacementLength = Math.max(GameObjectSizes.Small, state.placementType);
			}

			return {
				...state,
				placementType: action.placementType,
				placementLength: newPlacementLength,
			}
		}
		case 'SET_TURN_QUEUE': {
			return {
				...state,
				turnQueue: action.queue,
			}
		}
		case 'SET_GRID_TILES': {
			return {
				...state,
				gameAppTiles: {
					...action.grid,
				}
			}
		}
		case 'SET_PLACEMENT_LENGTH': {

			const { selectedTile, placementDirection, gridSize, gameAppTiles } = state;

			const { length } = action;

			if(Boolean(selectedTile)) {

				const dimension = getDimension(placementDirection);

				if (selectedTile![dimension] + length >= gridSize) {

					const newTiles = {
						...gameAppTiles
					}

					const newSelectedTile = {
						...selectedTile
					}

					const maxDimensionPosition = gridSize - length;

					newSelectedTile[dimension] = maxDimensionPosition;

					return {
						...state,
						gameAppTiles: newTiles,
						selectedTile: newSelectedTile,
						placementLength: length,
					}
				}
			}

			return {
				...state,
				placementLength: action.length
			}
		}
		case 'SET_PLACEMENT_DIRECTION': {

			const { selectedTile, placementLength, gridSize, gameAppTiles } = state;

			const { direction } = action;

			if (Boolean(selectedTile)) {

				const dimension = getDimension(direction);

				if (selectedTile![dimension] + placementLength >= gridSize) {

					const newTiles = {
						...gameAppTiles
					}

					const newSelectedTile = {
						...selectedTile
					}

					const maxDimensionPosition = gridSize - placementLength;

					newSelectedTile[dimension] = maxDimensionPosition;

					return {
						...state,
						gameAppTiles: newTiles,
						selectedTile: newSelectedTile,
						placementDirection: direction,
					}
				}
			}

			return {
				...state,
				placementDirection: direction,
			}
		}
		case 'UNDO_VEHICLE_MOVE': {

			if(isEmpty(state.undoQueue)) {

				return {
					...state,
				}
			}

			const newUndoQueue = cloneDeep(state.undoQueue);

			const lastVehicleState = newUndoQueue.pop();

			const newRedoQueue = cloneDeep(state.redoQueue);

			newRedoQueue.push(state.vehicles);

			return {
				...state,
				vehicles: cloneDeep(lastVehicleState),
				undoQueue: newUndoQueue,
				redoQueue: newRedoQueue,
				moveCounter: state.moveCounter - 1,
			}
		}
		case 'REDO_VEHICLE_MOVE': {

			if (isEmpty(state.redoQueue)) {

				return {
					...state,
				}
			}

			const newRedoQueue = cloneDeep(state.redoQueue);

			const nextVehicleState = newRedoQueue.pop();

			const newUndoQueue = cloneDeep(state.undoQueue);

			newUndoQueue.push(state.vehicles);

			return {
				...state,
				vehicles: cloneDeep(nextVehicleState),
				undoQueue: newUndoQueue,
				redoQueue: newRedoQueue,
				moveCounter: state.moveCounter + 1,
			}
		}
		case 'MOVE_VEHICLE': {

			let { vehicle, newXPosition, newYPosition } = action;

			const newVehicles = [ ...state.vehicles ];

			let moveCounter = state.moveCounter;

			for(const index in newVehicles) {

				if(vehicle.key === newVehicles[index].key) {

					if(!(
						newVehicles[index].xPosition === newXPosition &&
						newVehicles[index].yPosition === newYPosition)
					) {

						moveCounter += 1;
					}

					newVehicles[index] = {
						...newVehicles[index],
						xPosition: newXPosition,
						yPosition: newYPosition,
					}
				}
			}

			return {
				...state,
				vehicles: newVehicles,
				selectedVehicle: null,
				moveCounter: moveCounter,
				undoQueue: [
					...state.undoQueue,
					cloneDeep(state.vehicles),
				],
				redoQueue: [],
			}
		}
		case 'CREATE_GAME': {

			const { gridSize, vehicles, walls = [] } : CreateGameProperties = action.game;

			const gameAppTiles: GameTileMatrix<GameTileProperties> = {}

			Array.from({ length: gridSize }).forEach((_, yIndex) => {

				Array.from({ length: gridSize }).forEach((_, xIndex) => {

					gameAppTiles[yIndex] = {
						...gameAppTiles[yIndex],
						[xIndex]: {
							xPosition: xIndex,
							yPosition: yIndex,
							isWinTile: false,
						}
					}
				})
			})

			gameAppTiles[getExitYPosition(gridSize)][gridSize] = {
				yPosition: getExitYPosition(gridSize) - 1,
				xPosition: gridSize,
				isWinTile: true,
			}

			return {
				...state,
				gameAppTiles,
				vehicles: [
					...vehicles,
				],
				walls: [
					...walls,
				],
				gridSize,
				moveCounter: 0,
			}
		}
		case 'CREATE_GAME_PROPERTIES': {

			const levelData : LevelData = action.levelData;

			return {
				...state,
				levelData,
			}
		}
		case 'ADD_VEHICLE': {

			const newVehicles = [
				...state.vehicles,
				action.vehicle,
			]

			return {
				...state,
				vehicles: newVehicles,
				selectedTile: null,
			}
		}
		case 'ADD_WALL': {

			const newWalls = [
				...state.walls,
				action.tile,
			]

			return {
				...state,
				walls: newWalls,
			}
		}
		case 'SET_SELECTED_VEHICLE': {
			return {
				...state,
				selectedVehicle: action.vehicle,
			}
		}
		case 'SET_SELECTED_TILE': {

			const { tile } = action;

			const { gridSize, gameAppTiles, placementLength, placementDirection } = state;

			const newTiles = {
				...gameAppTiles,
			}

			const newSelectedTile = {
				...tile,
			}

			const dimension = getDimension(placementDirection);

			let maxDimensionPosition = Math.min(tile[dimension], gridSize - 1);

			if (maxDimensionPosition + placementLength > gridSize) {

				maxDimensionPosition = gridSize - placementLength;
			}

			newSelectedTile[dimension] = maxDimensionPosition;

			return {
				...state,
				gameAppTiles: cloneDeep(newTiles),
				selectedTile: newSelectedTile,
			}
		}
		case 'REMOVE_WALL': {

			const { walls } = state;

			const { xPosition, yPosition } = action.tile;

			const newWalls = [ ...walls ].filter((wall) => !(
				wall.xPosition === xPosition &&
				wall.yPosition === yPosition
			));

			return {
				...state,
				walls: newWalls,
			}
		}
		case 'REMOVE_VEHICLE': {

			const { vehicles } = state;

			const { xPosition, yPosition } = action.tile;

			const newVehicles = [...vehicles].filter((vehicle) => (
				vehicle.xPosition === xPosition &&
				vehicle.yPosition === yPosition
			));

			return {
				...state,
				vehicles: newVehicles,
			}
		}
		default:
			return state
	}
}
