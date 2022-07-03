import ExtensionIcon from '@mui/icons-material/Extension';
import RedoIcon from '@mui/icons-material/Redo';
import ReplayIcon from '@mui/icons-material/Replay';
import UndoIcon from '@mui/icons-material/Undo';
import { Button, CircularProgress, Grid, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useAppTiles } from 'Hooks/useAppTiles';
import { useSolverWorker } from 'Hooks/useSolverWorker';
import React, { useEffect, useState } from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import { CreateGameProperties, GameState, MoveTurn } from 'Types/gameTypes';
import RedoQueue from './redo_queue/RedoQueue';
import TurnQueue from './turn_queue/TurnQueue';
import UndoQueue from './undo_queue/UndoQueue';

const GameStatistics = () => {

	const gameState: GameState = useSelector((state: RootStateOrAny) => state.gameReducer);

	const [ isResetting, setIsResetting ] = useState(false);

	const {
		moveObject,
		setTurnQueue,
		undoLastMove,
		redoLastMove,
	} = useAppTiles();

	const {
		gameObjects,
		gridSize,
		turnQueue,
		undoQueue,
		redoQueue,
	} = gameState;

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

	const handleTurn = () => {

		const [ firstTurn ] = turnQueue;

		const newTurns = [...turnQueue].filter((_, index) => index !== 0)

		moveObject(firstTurn);

		setTurnQueue(newTurns);
	}

	useEffect(() => {

		if(Boolean(turnQueue.length)) {

			requestAnimationFrame(() => {

				handleTurn();
			})

		}

	}, [ turnQueue.length])

	const resetGame = () => {

		setIsResetting(true);
	}

	useEffect(() => {

		if(isResetting) {

			if (undoQueue.length) {

				undoLastMove();

			} else {

				setIsResetting(false);
			}
		}

	}, [ undoQueue.length, isResetting ])

	const disableButtons = (isResetting || isSolving);

	const disableSolveButton = Boolean(turnQueue.length || disableButtons);

	const disableUndoButton = Boolean(!undoQueue.length || disableSolveButton);

	const disableRedoButton = Boolean(!redoQueue.length || disableSolveButton);

	return (
		<Box minWidth={320}>
			<Box height="auto" m={.5} overflow="scroll" maxHeight={500}>
				<Paper>
					<Box p={3}>
						<Typography>
							Turn counter
						</Typography>
						<Typography variant="h2">
							{undoQueue.length}
						</Typography>
						<Box mt={2}>
							<Button
								startIcon={!disableSolveButton && <ExtensionIcon />}
								fullWidth
								disabled={disableSolveButton}
								onClick={() => clickedSolveGame()}
								variant="contained">
								{!disableSolveButton && "Solve"}
								{disableSolveButton && <CircularProgress size={16} />}
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
									onClick={() => undoLastMove()}
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
									onClick={() => redoLastMove()}
									variant="contained">
									Redo ({redoQueue.length})
								</Button>
							</Box>
						</Box>
						<Grid mt={2}>
							<TurnQueue />
							<UndoQueue />
							<RedoQueue />
						</Grid>
					</Box>
				</Paper>
			</Box>
		</Box>
	)
}

export default GameStatistics;