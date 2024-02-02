import * as gameActions from 'Actions/gameActions';
import { OBJECT_ID_PREFIX } from 'Components/entities/vehicle/Vehicle';
import { AppCarOrientations, CreateGameProperties, GameObjectTypes, GameState, GameTileCoordinate, MoveTurn } from "Types/gameTypes";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";
import { GameObject } from './../__types/gameTypes';
import { LevelData } from './../components/app/level_selection/LevelSelection';

export const useAppTiles = () => {

	const undoQueue = useSelector((state: RootStateOrAny) => (state.gameReducer as GameState).undoQueue);

	const redoQueue = useSelector((state: RootStateOrAny) => (state.gameReducer as GameState).redoQueue);

	const dispatch = useDispatch();

	const setGridSize = (newSize: number) => {

		dispatch(gameActions.setGridSize(newSize));
	}

	const moveElement = (moveTurn: MoveTurn) => {

		const vehicleSelector = `${OBJECT_ID_PREFIX}${moveTurn.gameObject.key}`;

		const vehicle = document.querySelector(`#${vehicleSelector}`) as HTMLElement;

		if (!vehicle) {

			return;
		}

		const { fromX, fromY, toX, toY } = moveTurn;

		const xDifference = toX - fromX;
		const yDifference = toY - fromY;

		let xDifferenceInPx = 0;
		let yDifferenceInPx = 0;

		if (Boolean(xDifference)) {

			xDifferenceInPx = (xDifference * 64) + (xDifference * 8);
		}

		if (Boolean(yDifference)) {

			yDifferenceInPx = (yDifference * 64) + (yDifference * 8);
		}

		vehicle.style.transform = `translate(${xDifferenceInPx}px, ${yDifferenceInPx}px)`;
	}

	const moveObject = async (moveTurn: MoveTurn) => {

		moveElement(moveTurn);

		return new Promise((resolve) => {

			setTimeout(() => {

				dispatch(gameActions.moveObject(moveTurn));

				resolve(true);

			}, 125);
		})
	}

	const selectObject = (gameObject: GameObject|null) => {

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

	const undoLastMove = async () => {

		const [ lastMove ] = undoQueue;

		moveElement({
			...lastMove,
			fromX: lastMove.gameObject.xPosition,
			fromY: lastMove.gameObject.yPosition,
			toX: lastMove.fromX,
			toY: lastMove.fromY,
		});

		return new Promise((resolve) => {

			setTimeout(() => {

				dispatch(gameActions.undoMoveObject(lastMove));

				resolve(true);

			}, 50);
		})
	}

	const redoLastMove = async () => {

		const [ lastMove ] = redoQueue;

		moveElement(lastMove);

		return new Promise((resolve) => {

			setTimeout(() => {

				dispatch(gameActions.redoMoveObject(lastMove));

				resolve(true);

			}, 125);
		})
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