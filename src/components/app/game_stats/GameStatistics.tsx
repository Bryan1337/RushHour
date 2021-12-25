import { Button, Grid, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import Solver from 'Classes/solver/Solver';
import { useAppTiles } from 'Hooks/useAppTiles';
import { useInterval } from 'Hooks/useInterval';
import { isEmpty } from 'lodash';
import React from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import { CreateGameProperties, GameState } from 'Types/gameTypes';


const GameStatistics = () => {

	const gameState: GameState = useSelector((state: RootStateOrAny) => state.gameReducer);

	const {
		moveVehicle,
		selectVehicle,
		setTurnQueue,
		undoLastMove,
		redoLastMove,
	} = useAppTiles();

	const {
		moveCounter,
		vehicles,
		gridSize,
		turnQueue,
		undoQueue,
		redoQueue,
		walls,
	} = gameState;


	const solveGame = () => {

		const game: CreateGameProperties = {
			vehicles,
			gridSize,
			walls,
		}

		const solver = new Solver(game);

		solver.solve();

		const turns = solver.getWinningTurns();

		setTurnQueue(turns);
	}

	const handleTurn = () => {

		const [ firstTurn ] = turnQueue;

		const { vehicle, toX, toY } = firstTurn;

		const newTurns = [...turnQueue].filter((_, index) => index !== 0)

		selectVehicle(vehicle);

		moveVehicle(vehicle, toX, toY)

		setTurnQueue(newTurns);
	}

	useInterval(() => {

		handleTurn();

	}, turnQueue.length ? 50 : null)

	return (
		<Box>
			<Box height="auto" m={.5}>
				<Paper>
					<Box p={3}>
						<Typography>
							Turn counter
						</Typography>
						<Typography variant="h2">
							{moveCounter}
						</Typography>
						<Grid mt={2} container spacing={2}>
							<Grid item xs>
								<Button
									fullWidth
									onClick={() => solveGame()}
									variant="contained">
									Solve
								</Button>
							</Grid>
						</Grid>
						<Grid mt={2} container spacing={2}>
							<Grid item xs>
								<Button
									fullWidth
									disabled={isEmpty(undoQueue)}
									onClick={() => undoLastMove()}
									variant="contained">
									Undo
								</Button>
							</Grid>
							<Grid item xs>
								<Button
									fullWidth
									disabled={isEmpty(redoQueue)}
									onClick={() => redoLastMove()}
									variant="contained">
									Redo
								</Button>
							</Grid>
						</Grid>
					</Box>
				</Paper>
			</Box>
		</Box>
	)
}

export default GameStatistics;