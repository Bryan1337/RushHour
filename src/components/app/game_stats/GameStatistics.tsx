import ExtensionIcon from '@mui/icons-material/Extension';
import RedoIcon from '@mui/icons-material/Redo';
import ReplayIcon from '@mui/icons-material/Replay';
import UndoIcon from '@mui/icons-material/Undo';
import { Button, CircularProgress, Paper } from '@mui/material';
import { Box } from '@mui/system';
import { useAppTiles } from 'Hooks/useAppTiles';
import { useSolverWorker } from 'Hooks/useSolverWorker';
import { CreateGameProperties, GameState, MoveTurn } from 'Types/gameTypes';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';

const GameStatistics = () => {

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

	useLayoutEffect(() => {

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

	const handleClickedUndo = async () => {

		setIsWorking(true);

		await undoLastMove();

		setIsWorking(false);
	}

	const handleClickedRedo = async () => {

		setIsWorking(true);

		await redoLastMove();

		setIsWorking(false);
	}

	useEffect(() => {

		if(isResetting) {

			handleUndoQueue();
		}

	}, [undoQueue.length, isResetting ])

	const disableButtons = (isWorking || isSolving);

	const disableSolveButton = Boolean(turnQueue.length || disableButtons);

	const disableUndoButton = Boolean(!undoQueue.length || disableSolveButton);

	const disableRedoButton = Boolean(!redoQueue.length || disableSolveButton);


	return (
		<Box minWidth={320}>
			<Box height="auto" m={.5} overflow="scroll" maxHeight={500}>
				<Paper>
					<Box p={3}>
						<p>
							Turn counter
						</p>
						<p>
							{undoQueue.length}
						</p>
						<Box mt={2}>
							<Button
								startIcon={!disableSolveButton ? <ExtensionIcon /> : <CircularProgress size={16} />}
								fullWidth
								disabled={disableSolveButton}
								onClick={() => clickedSolveGame()}
								variant="contained">
								Solve
							</Button>
						</Box>
						<Box mt={2}>
							<Button
								startIcon={<ReplayIcon />}
								fullWidth
								disabled={disableUndoButton}
								variant="contained"
								onClick={() => resetGame()}>
								Reset
							</Button>
						</Box>
						<Box display="flex" mt={2}>
							<Box mr={2} mb={2} width="100%">
								<Button
									style={{
										minWidth: "max-content",
									}}
									startIcon={<UndoIcon />}
									fullWidth
									disabled={disableUndoButton}
									onClick={() => handleClickedUndo()}
									variant="contained">
									Undo ({undoQueue.length})
								</Button>
							</Box>
							<Box mb={2} width="100%">
								<Button
									style={{
										minWidth: "max-content",
									}}
									startIcon={<RedoIcon />}
									fullWidth
									disabled={disableRedoButton}
									onClick={() => handleClickedRedo()}
									variant="contained">
									Redo ({redoQueue.length})
								</Button>
							</Box>
						</Box>
					</Box>
				</Paper>
			</Box>
		</Box>
	)
}

export default GameStatistics;