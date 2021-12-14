import * as gameActions from 'Actions/gameActions';
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { AppCarOrientations, AppTileIndices, CreateGameProperties, GameState, GameTileMatrix, GameTileProperties, GameVehicle, MoveTurn } from "Types/gameTypes";

export const useAppTiles = () => {

	const {
		selectedVehicle
	} : GameState = useSelector((state: RootStateOrAny) => state.gameReducer);

	const dispatch = useDispatch();

	const setGridTiles = (grid: GameTileMatrix<GameTileProperties>) => {

		dispatch(gameActions.setGridTiles(grid));
	}

	const moveVehicle = (vehicle: GameVehicle, newXPosition: number, newYPosition: number) => {

		const oldX = AppTileIndices[Number(vehicle.yPosition)];

		const oldY = AppTileIndices[Number(vehicle.xPosition)]

		console.log({
			selectedVehicle,
		})

		console.log(`Moving vehicle: ${oldX},${oldY} > ${AppTileIndices[newYPosition]},${AppTileIndices[newXPosition]}`)

		dispatch(gameActions.moveVehicle(vehicle, newXPosition, newYPosition));
	}

	const selectVehicle = (vehicle: GameVehicle) => {

		dispatch(gameActions.setSelectedVehicle(vehicle));
	}

	const createGame = (gameProperties: CreateGameProperties) => {

		dispatch(gameActions.createGame(gameProperties));
	}

	const addVehicle = (vehicle: GameVehicle) => {

		dispatch(gameActions.addVehicle(vehicle));
	}

	const undoLastMove = () => {

		dispatch(gameActions.undoLastMove());
	}

	const redoLastMove = () => {

		dispatch(gameActions.redoLastMove());
	}

	const setSelectedTile = (tile: GameTileProperties) => {

		dispatch(gameActions.setSelectedTile(tile));
	}

	const setPlacementLength = (length: number) => {

		dispatch(gameActions.setPlacementLength(length));
	}

	const setPlacementDirection = (direction: AppCarOrientations) => {

		dispatch(gameActions.setPlacementDirection(direction));
	}

	const removeVehicleFromSelectedTile = () => {

		dispatch(gameActions.removeVehicleFromSelectedTile());
	}

	const setTurnQueue = (queue : Array<MoveTurn>) => {

		dispatch(gameActions.setTurnQueue(queue));
	}

	return {
		selectVehicle,
		moveVehicle,
		createGame,
		addVehicle,
		setGridTiles,
		undoLastMove,
		redoLastMove,
		setSelectedTile,
		setPlacementLength,
		setPlacementDirection,
		removeVehicleFromSelectedTile,
		setTurnQueue,
	}
}