import { cloneDeep, isEmpty } from 'lodash';
import { AnyAction } from 'redux';
import { AppCarOrientations, CreateGameProperties, GameState, GameTileMatrix, GameTileProperties, GameVehicle, VehicleSizes } from 'Types/gameTypes';

export const initialAppState: GameState = {
	gridSize: 6,
	selectedVehicle: null,
	selectedTile: null,
	gameAppTiles: {},
	placementDirection: AppCarOrientations.Horizontal,
	placementLength: VehicleSizes.Small,
	moveCounter: 0,
	undoQueue: [],
	redoQueue: [],
	turnQueue: [],
	vehicles: [],
}

export const gameReducer = (state: GameState = initialAppState, action: AnyAction) => {
	switch (action.type) {

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

				if (placementDirection === AppCarOrientations.Horizontal) {

					if (selectedTile.xPosition + length >= gridSize) {

						const newTiles = {
							...gameAppTiles
						}

						const newSelectedTile = {
							...selectedTile
						}

						const maxXPosition = gridSize - length;

						newTiles[newSelectedTile.yPosition][newSelectedTile.xPosition].isSelected = false;

						newSelectedTile.xPosition = maxXPosition;

						newTiles[newSelectedTile.yPosition][maxXPosition].isSelected = true;

						return {
							...state,
							gameAppTiles: newTiles,
							selectedTile: newSelectedTile,
							placementLength: length,
						}
					}
				}

				if (placementDirection === AppCarOrientations.Vertical) {

					if (selectedTile.yPosition + length >= gridSize) {

						const newTiles = {
							...gameAppTiles
						}

						const newSelectedTile = {
							...selectedTile
						}

						const maxYPosition = gridSize - length;

						newTiles[newSelectedTile.yPosition][newSelectedTile.xPosition].isSelected = false;

						newSelectedTile.yPosition = maxYPosition;

						newTiles[maxYPosition][newSelectedTile.xPosition].isSelected = true;

						return {
							...state,
							gameAppTiles: newTiles,
							selectedTile: newSelectedTile,
							placementLength: length,
						}
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

				if(direction === AppCarOrientations.Horizontal) {

					if (selectedTile.xPosition + placementLength >= gridSize) {

						const newTiles = {
							...gameAppTiles
						}

						const newSelectedTile = {
							...selectedTile
						}

						const maxXPosition = gridSize - placementLength;

						newTiles[newSelectedTile.yPosition][newSelectedTile.xPosition].isSelected = false;

						newSelectedTile.xPosition = maxXPosition;

						newTiles[newSelectedTile.yPosition][maxXPosition].isSelected = true;

						return {
							...state,
							gameAppTiles: newTiles,
							selectedTile: newSelectedTile,
							placementDirection: direction,
						}
					}
				}

				if (direction === AppCarOrientations.Vertical) {

					if (selectedTile.yPosition + placementLength >= gridSize) {

						const newTiles = {
							...gameAppTiles
						}

						const newSelectedTile = {
							...selectedTile
						}

						const maxYPosition = gridSize - placementLength;

						newTiles[newSelectedTile.yPosition][newSelectedTile.xPosition].isSelected = false;

						newSelectedTile.yPosition = maxYPosition;

						newTiles[maxYPosition][newSelectedTile.xPosition].isSelected = true;

						return {
							...state,
							gameAppTiles: newTiles,
							selectedTile: newSelectedTile,
							placementDirection: direction,
						}
					}
				}
			}

			return {
				...state,
				placementDirection: direction,
			}
		}
		case 'MOVE_VEHICLE': {

			const { moveCounter, gameAppTiles, undoQueue } = state;

			const newUndoQueue = [
				...undoQueue,
				cloneDeep(gameAppTiles),
			]

			let { vehicle, newXPosition, newYPosition } = action;

			if (!vehicle) {

				return {
					...state,
				}
			}

			if (vehicle.orientation === AppCarOrientations.Horizontal) {

				if (newXPosition > vehicle.xPosition) {
					// Make sure vehicles cant move out of bounds
					newXPosition = newXPosition - vehicle.size + 1;
				}
			}

			if (vehicle.orientation === AppCarOrientations.Vertical) {

				if (newYPosition > vehicle.yPosition) {
					// Make sure vehicles cant move out of bounds
					newYPosition = newYPosition - vehicle.size + 1;
				}
			}

			const newTiles = {
				...gameAppTiles
			}

			if (vehicle.orientation === AppCarOrientations.Horizontal) {

				for (let sizeCounter = 0; sizeCounter < vehicle.size; sizeCounter++) {
					// Clear vehicle reference from old tiles
					newTiles[vehicle.yPosition][vehicle.xPosition + sizeCounter].vehicle = null;
				}

				for (let sizeCounter = 0; sizeCounter < vehicle.size; sizeCounter++) {
					// Move vehicle to tiles
					newTiles[vehicle.yPosition][newXPosition + sizeCounter].vehicle = {
						...vehicle,
						xPosition: newXPosition,
						yPosition: newYPosition,
					}
				}
			}

			if (vehicle.orientation === AppCarOrientations.Vertical) {

				for (let sizeCounter = 0; sizeCounter < vehicle.size; sizeCounter++) {
					// Clear vehicle reference from old tiles
					newTiles[vehicle.yPosition + sizeCounter][vehicle.xPosition].vehicle = null;
				}

				for (let sizeCounter = 0; sizeCounter < vehicle.size; sizeCounter++) {
					// Move vehicle to tiles
					console.log({
						newTiles,
						newYPosition,
						newXPosition,
					})
					newTiles[newYPosition + sizeCounter][newXPosition].vehicle = {
						...vehicle,
						xPosition: newXPosition,
						yPosition: newYPosition,
					}
				}
			}

			return {
				...state,
				gameAppTiles: newTiles,
				selectedVehicle: null,
				moveCounter: moveCounter + 1,
				undoQueue: newUndoQueue,
				redoQueue: [],
			}
		}
		case 'CREATE_GAME': {

			const { gridSize, vehicles } : CreateGameProperties = action.gameProperties;

			const gameAppTiles: GameTileMatrix<GameTileProperties> = {}

			Array.from({ length: gridSize }).forEach((_, yIndex) => {

				Array.from({ length: gridSize }).forEach((_, xIndex) => {

					gameAppTiles[yIndex] = {
						...gameAppTiles[yIndex],
						[xIndex]: {
							xPosition: xIndex,
							yPosition: yIndex,
						}
					}
				})
			})

			gameAppTiles[Math.floor(gridSize / 2) - 1][gridSize] = {
				yPosition: Math.floor(gridSize / 2) - 1,
				xPosition: gridSize,
				vehicle: null,
				isWinTile: true,
			}

			vehicles.forEach((vehicle: GameVehicle) => {

				if (vehicle.orientation === AppCarOrientations.Horizontal) {

					for (let sizeCounter = 0; sizeCounter < vehicle.size; sizeCounter++) {

						gameAppTiles[vehicle.yPosition][vehicle.xPosition + sizeCounter].vehicle = {
							...vehicle,
						}
					}
				}

				if (vehicle.orientation === AppCarOrientations.Vertical) {

					for (let sizeCounter = 0; sizeCounter < vehicle.size; sizeCounter++) {

						gameAppTiles[vehicle.yPosition + sizeCounter][vehicle.xPosition].vehicle = {
							...vehicle,
						}
					}
				}
			})

			return {
				...state,
				gameAppTiles,
				gridSize,
			}
		}
		case 'ADD_VEHICLE': {

			const { gameAppTiles } = state;

			const vehicle : GameVehicle = action.vehicle

			if (isEmpty(gameAppTiles)) {

				return {
					...state,
				}
			}

			if (vehicle.orientation === AppCarOrientations.Horizontal) {

				for (let sizeCounter = 0; sizeCounter < vehicle.size; sizeCounter++) {

					newTiles[vehicle.yPosition][vehicle.xPosition + sizeCounter].vehicle = {
						...vehicle,
					}
				}
			}

			if (vehicle.orientation === AppCarOrientations.Vertical) {

				for (let sizeCounter = 0; sizeCounter < vehicle.size; sizeCounter++) {

					newTiles[vehicle.yPosition + sizeCounter][vehicle.xPosition].vehicle = {
						...vehicle,
					}
				}
			}

			return {
				...state,
				gameAppTiles: newTiles,
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

			const { gridSize, gameAppTiles, selectedTile, placementLength, placementDirection } = state;

			const newTiles = {
				...gameAppTiles,
			}

			const newSelectedTile = {
				...tile,
			}

			if(Boolean(selectedTile)) {

				newTiles[selectedTile.yPosition][selectedTile.xPosition].isSelected = false;
			}

			let maxXPosition = Math.min(tile.xPosition, gridSize - 1);

			let maxYPosition = Math.min(tile.yPosition, gridSize - 1);

			if (placementDirection === AppCarOrientations.Horizontal) {

				if (maxXPosition + placementLength > gridSize) {

					maxXPosition = gridSize - placementLength ;
				}
			}

			if (placementDirection === AppCarOrientations.Vertical) {

				if (maxYPosition + placementLength > gridSize) {

					maxYPosition = gridSize - placementLength;
				}
			}

			newSelectedTile.xPosition = maxXPosition;

			newSelectedTile.yPosition = maxYPosition;

			newTiles[maxYPosition][maxXPosition].isSelected = true;

			return {
				...state,
				gameAppTiles: cloneDeep(newTiles),
				selectedTile: newSelectedTile,
			}
		}
		case 'UNDO_LAST_MOVE': {

			if(!state.undoQueue.length) {

				return {
					...state,
				}
			}

			const newUndoQueue = [...state.undoQueue];

			const lastUndoState = newUndoQueue.pop();

			return {
				...state,
				gameAppTiles: lastUndoState,
				undoQueue: newUndoQueue,
				redoQueue: [
					...state.redoQueue,
					state.gameAppTiles,
				]
			}
		}
		case 'REDO_LAST_MOVE': {

			if (!state.redoQueue.length) {

				return {
					...state,
				}
			}

			const newRedoQueue = [ ...state.redoQueue ]

			const lastState = newRedoQueue.pop();

			return {
				...state,
				gameAppTiles: lastState,
				undoQueue: [
					...state.undoQueue,
					state.gameAppTiles,
				],
				redoQueue: newRedoQueue
			}
		}
		case 'ADD_TO_UNDO_QUEUE': {
			return {
				...state,
				undoQueue: [
					...state.undoQueue,
					action.state,
				]
			}
		}
		case 'REMOVE_VEHICLE_FROM_SELECTED_TILE': {

			const { selectedTile, gameAppTiles } = state;

			if(!selectedTile) {

				return {
					...state,
				}
			}

			const { vehicle } = selectedTile;

			const newTiles = {
				...gameAppTiles,
			}

			if(!vehicle) {

				return {
					...state,
				}
			}

			if (vehicle.orientation === AppCarOrientations.Horizontal) {

				for (let sizeCounter = 0; sizeCounter < vehicle.size; sizeCounter++) {

					newTiles[vehicle.yPosition][vehicle.xPosition + sizeCounter].vehicle = null;
				}
			}

			if (vehicle.orientation === AppCarOrientations.Vertical) {

				for (let sizeCounter = 0; sizeCounter < vehicle.size; sizeCounter++) {

					newTiles[vehicle.yPosition + sizeCounter][vehicle.xPosition].vehicle = null;
				}
			}

			return {
				...state,
				gameAppTiles: newTiles,
			}
		}
		default:
			return state
	}
}
