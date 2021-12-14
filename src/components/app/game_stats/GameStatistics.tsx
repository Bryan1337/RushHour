import { Button, Grid, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import Solver from 'Classes/solver/Solver';
import 'Components/app/App.css';
import { useAppTiles } from 'Hooks/useAppTiles';
import { useGame } from 'Hooks/useGame';
import { useInterval } from 'Hooks/useInterval';
import { cloneDeep } from 'lodash';
import React from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import { GameState } from 'Types/gameTypes';

const GameStatistics = () => {

	const gameState: GameState = useSelector((state: RootStateOrAny) => state.gameReducer);

	const {
		undoLastMove,
		redoLastMove,
		moveVehicle,
		setTurnQueue,
	} = useAppTiles();

	const {
		createGameFromAppTiles
	} = useGame();

	const {
		moveCounter,
		undoQueue,
		redoQueue,
		turnQueue,
		gameAppTiles,
	} = gameState;


	const solveGame = () => {

		const game = createGameFromAppTiles(gameAppTiles);

		const solver = new Solver(game);

		solver.solve();

		const turns = solver.getWinningTurns();

		console.log(turns);
		// setTurnQueue(turns);
	}

	useInterval(() => {

		const newTurns = [ ...turnQueue ];

		if(newTurns.length) {

			const lastTurn = newTurns[newTurns.length - 1];

			const { vehicle, toX, toY } = lastTurn;

			moveVehicle(vehicle, toX, toY);

			const turnsWithoutLastTurn = cloneDeep(newTurns.slice(0, -1));

			setTurnQueue(turnsWithoutLastTurn);
		}

	}, turnQueue.length > 0 ? 500 : null)

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
							<Grid item>
								<Button
									fullWidth
									disabled={!undoQueue.length}
									onClick={() => undoLastMove()}
									variant="contained">
									Undo
								</Button>
							</Grid>
							<Grid item>
								<Button
									fullWidth
									disabled={!redoQueue.length}
									onClick={() => redoLastMove()}
									variant="contained">
									Redo
								</Button>
							</Grid>
						</Grid>
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
					</Box>
				</Paper>
			</Box>
		</Box>
	)
}

export default GameStatistics;