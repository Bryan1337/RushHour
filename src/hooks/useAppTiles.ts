import * as gameActions from 'Actions/gameActions';
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { AppCarOrientations, CreateGameProperties, GameObjectTypes, GameState, GameTileCoordinate, MoveTurn } from "Types/gameTypes";
import { LevelData } from './../components/app/level_selection/LevelSelection';
import { GameObject } from './../__types/gameTypes';

export const useAppTiles = () => {

	const {
		undoQueue,
		redoQueue,
	} : GameState = useSelector((state: RootStateOrAny) => state.gameReducer)

	const dispatch = useDispatch();

	const setGridSize = (newSize: number) => {

		dispatch(gameActions.setGridSize(newSize));
	}

	const moveObject = (moveTurn: MoveTurn) => {

		dispatch(gameActions.moveObject(moveTurn));
	}

	const selectObject = (gameObject: GameObject) => {

		dispatch(gameActions.selectObject(gameObject));
	}

	const createGame = (gameProperties: CreateGameProperties) => {

		dispatch(gameActions.createGame(gameProperties));
	}

	const createGameProperties = (levelData: LevelData) => {

		dispatch(gameActions.createGameProperties(levelData));
	}

	const addObject = (gameObject: GameObject) => {

		dispatch(gameActions.addObject(gameObject));
	}

	const setSelectedTile = (tile: GameTileCoordinate) => {

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

	const removeObject = (tile: GameTileCoordinate) => {

		dispatch(gameActions.removeObject(tile));
	}

	const setTurnQueue = (queue : Array<MoveTurn>) => {

		dispatch(gameActions.setTurnQueue(queue));
	}

	const undoLastMove = () => {

		const [ lastMove ] = undoQueue;

		dispatch(gameActions.undoMoveObject(lastMove));
	}

	const redoLastMove = () => {

		const [ lastMove ] = redoQueue;

		dispatch(gameActions.redoMoveObject(lastMove));
	}

	return {
		selectObject,
		moveObject,
		createGame,
		createGameProperties,
		addObject,
		setGridSize,
		setSelectedTile,
		setPlacementType,
		setPlacementLength,
		setPlacementDirection,
		removeObject,
		setTurnQueue,
		undoLastMove,
		redoLastMove,
	}
}