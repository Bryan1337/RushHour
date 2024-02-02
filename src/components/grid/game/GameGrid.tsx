import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ExtensionIcon from '@mui/icons-material/Extension';
import ReplayIcon from '@mui/icons-material/Replay';
import { Box, } from '@mui/system';
import { LevelData } from 'Components/app/level_selection/LevelSelection';
import TileButton from 'Components/atomic/atoms/TileButton/TileButton';
import AppTooltip from 'Components/atomic/atoms/Tooltip/AppTooltip';
import { useAppTiles } from 'Hooks/useAppTiles';
import { useGame } from 'Hooks/useGame';
import { useInterval } from 'Hooks/useInterval';
import { useSolverWorker } from 'Hooks/useSolverWorker';
import { getCoordinateTileKey } from 'Scripts/coordinateHelper';
import { formatDuration } from 'Scripts/stringHelper';
import { CreateGameProperties, GameState, MoveTurn } from 'Types/gameTypes';
import { RouteParams } from 'Types/pageTypes';
import React, { Fragment, useEffect, useMemo, useState } from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import levelList from '../../../levels/levels.json';
import Tile from '../tile/Tile';


const GameGrid = () => {

	const gameTiles = useSelector((state: RootStateOrAny) => (state.gameReducer as GameState).gameTiles);

	const {
		levelId
	} = useParams() as RouteParams;

	const {
		importString,
	} = useGame();

	const {
		createGame,
		createGameProperties,
	} = useAppTiles();

	useEffect(() => {

		const level: LevelData = levelList[levelId];

		if (Boolean(level)) {

			const game = importString(level.game);

			createGame(game as CreateGameProperties);

			createGameProperties(level);
		}

	}, [levelId])

	const tileGrid = useMemo(() => {

		const grid = {}

		Object.keys(gameTiles).forEach((coordinate) => {

			const tile = gameTiles[coordinate];

			grid[tile.yPosition] = {
				...grid[tile.yPosition],
				[tile.xPosition]: tile
			}
		})

		return grid;

	}, [gameTiles]);

	return (
		<Box style={{
			padding: 24,
			background: '#1F1F1F',
			borderRadius: 8,
		}}>
			{Object.keys(tileGrid).map((_, yIndex) => (
				<Fragment key={yIndex}>
					<Box display="flex">
						{Object.keys(tileGrid[yIndex]).map((_, xIndex) => (
							<Fragment key={getCoordinateTileKey(xIndex, yIndex)}>
								<Tile
									tileProperties={tileGrid[yIndex][xIndex]}
								/>
							</Fragment>
						))}
					</Box>
				</Fragment>
			))}
			<GameOptions />
		</Box>
	);
};


const Timer = () => {

	const [gameTimer, setGameTimer] = React.useState(0);

	const [timerStarted, setTimerStarted] = React.useState(false);

	useEffect(() => {

		setTimerStarted(true);

	}, [])

	useInterval(() => {

		setGameTimer(gameTimer + 1);

	}, timerStarted ? 1000 : null)

	return (
		<Box
			mr={1}
			display="flex"
			alignItems="center"
			justifyContent="center"
			flexDirection="column"
			width={136}
			style={{ backgroundColor: '#252525', borderRadius: 8 }}>
			<p>
				Timer
			</p>
			<p>
				{formatDuration(gameTimer)}
			</p>
		</Box>
	)
}


const GameOptions = () => {

	const gameObjects = useSelector((state: RootStateOrAny) => (state.gameReducer as GameState).gameObjects);

	const gridSize = useSelector((state: RootStateOrAny) => (state.gameReducer as GameState).gridSize);

	const turnQueue = useSelector((state: RootStateOrAny) => (state.gameReducer as GameState).turnQueue);

	const undoQueue = useSelector((state: RootStateOrAny) => (state.gameReducer as GameState).undoQueue);

	const redoQueue = useSelector((state: RootStateOrAny) => (state.gameReducer as GameState).redoQueue);

	const [isWorking, setIsWorking] = useState<boolean>(false);

	const [isResetting, setIsResetting] = useState<boolean>(false);

	const {
		selectObject,
		moveObject,
		setTurnQueue,
		undoLastMove,
		redoLastMove,
	} = useAppTiles();

	const {
		solveGame,
		isSolving,
	} = useSolverWorker();

	const {
		importString,
	} = useGame();

	const clickedSolveGame = async () => {

		const game: CreateGameProperties = {
			gameObjects,
			gridSize,
		}

		try {

			const turns = await solveGame(game) as Array<MoveTurn>;

			setTurnQueue(turns);

		} catch (error) {

			console.log({
				error
			})
		}
	}

	const handleTurn = async () => {

		const [firstTurn] = turnQueue;

		const newTurns = [...turnQueue].filter((_, index) => index !== 0)

		await moveObject(firstTurn);

		setTurnQueue(newTurns);
	}

	useEffect(() => {

		if (Boolean(turnQueue.length)) {

			requestAnimationFrame(() => {

				selectObject(null);

				handleTurn();
			})
		}

	}, [turnQueue.length])

	const resetGame = () => {

		setIsResetting(true);

		setIsWorking(true);
	}

	const handleUndoQueue = async () => {

		if (isResetting) {

			if (undoQueue.length) {

				await undoLastMove();

			} else {

				setIsResetting(false);

				setIsWorking(false);
			}
		}
	}

	// const handleClickedUndo = async () => {

	// 	setIsWorking(true);

	// 	await undoLastMove();

	// 	setIsWorking(false);
	// }

	// const handleClickedRedo = async () => {

	// 	setIsWorking(true);

	// 	await redoLastMove();

	// 	setIsWorking(false);
	// }

	useEffect(() => {

		if (isResetting) {

			handleUndoQueue();
		}

	}, [undoQueue.length, isResetting])

	const disableButtons = (isWorking || isSolving);

	const disableSolveButton = Boolean(turnQueue.length || disableButtons);

	const disableUndoButton = Boolean(!undoQueue.length || disableSolveButton);

	const disableRedoButton = Boolean(!redoQueue.length || disableSolveButton);

	const {
		hasCompletedLevel,
	} = useGame();


	const history = useHistory();

	const {
		levelId
	} = useParams() as RouteParams;

	const {
		createGame,
		createGameProperties,
	} = useAppTiles();

	const toLevelSelection = () => {

		const level: LevelData = levelList[levelId];

		if (Boolean(level)) {

			const game = importString(level.game);

			createGame(game as CreateGameProperties);

			createGameProperties(level);

			history.push("/");
		}
	}

	return (
		<Box display="flex" pt={1.5} px={.5}>
			<Timer />
			<Box
				display="flex"
				alignItems="center"
				justifyContent="center"
				flexDirection="column"
				height={48}
				width={48}
				mr={1}
				style={{ backgroundColor: '#252525', borderRadius: 8 }}
			>
				<p>
					Turns
				</p>
				<p >
					{Math.min(9999, undoQueue.length)}
				</p>
			</Box>
			<Box display="flex" justifyContent="flex-end">
				<AppTooltip title="Level selection" placement="top">
					<TileButton
						onClick={() => toLevelSelection()}
						disabled={disableButtons || Boolean(turnQueue.length)}
						textColor='#5d5d5d'
						buttonColor="#fffa54">
						<ArrowBackIcon fontSize='large' />
					</TileButton>
				</AppTooltip>
				<Box pr={1} />
				<AppTooltip title="Restart level" placement="top">
					<TileButton
						onClick={() => resetGame()}
						disabled={disableButtons || !undoQueue.length || Boolean(turnQueue.length)}
						textColor='#5d5d5d'
						buttonColor="#FF4A50">
						<ReplayIcon fontSize='large' />
					</TileButton>
				</AppTooltip>
				<Box pr={1} />
				<AppTooltip title="Solve" placement="top">
					<TileButton
						disabled={!hasCompletedLevel(Number(levelId)) || disableButtons || Boolean(turnQueue.length)}
						onClick={() => clickedSolveGame()}
						textColor='#fff'
						buttonColor="#633595">
						<ExtensionIcon fontSize="large" />
					</TileButton>
				</AppTooltip>
			</Box>
		</Box>
	)


}

export default GameGrid;