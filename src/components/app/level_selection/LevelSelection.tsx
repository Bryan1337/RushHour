import { Button, Grid, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useAppTiles } from 'Hooks/useAppTiles';
import { useCreator } from 'Hooks/useCreator';
import { useGame } from 'Hooks/useGame';
import React, { useState } from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import { GameState, MoveTurn } from 'Types/gameTypes';
import levelData from '../../../levels/levels.json';

const LevelSelection = () => {


	const [ turns, setTurns ] = useState<Array<MoveTurn>>([]);

	const {
		importString
	} = useGame();

	const {
		createGame,
		selectVehicle,
		moveVehicle,
	} = useAppTiles();

	const gameState: GameState = useSelector((state: RootStateOrAny) => state.gameReducer);

	const {
		gameAppTiles
	} = gameState

	const {
		setCreatorModeEnabled,
	} = useCreator()

	const loadLevel = (levelNr: number) => {

		if (Boolean(levelData[levelNr])) {

			const game = importString(levelData[levelNr].game);

			createGame(game);

			setCreatorModeEnabled(false);
		}
	}

	return (
		<Box
			height="auto"
			m={.5}>
			<Paper style={{ height: '100%' }}>
				<Box p={3}>
					<Typography pb={2} variant="h4">
						Level selection
					</Typography>
					<Typography pb={2}>
						Beginner
					</Typography>
					<Grid container spacing={2}>
						{Array.from({ length: 10 }).map((_, index) => (
							<Grid item key={index}>
								<Button
									onClick={() => loadLevel(index)}
									disabled={!Boolean(levelData[index + 1])}
									color="success"
									variant="contained">
									{index + 1}
								</Button>
							</Grid>
						))}
					</Grid>
					<Typography py={2}>
						Intermediate
					</Typography>
					<Grid container spacing={2}>
						{Array.from({ length: 10 }).map((_, index) => (
							<Grid item key={index}>
								<Button
									onClick={() => loadLevel(index + 10)}
									disabled={!Boolean(levelData[index + 11])}
									color="warning"
									variant="contained">
									{index + 11}
								</Button>
							</Grid>
						))}
					</Grid>
					<Typography py={2}>
						Advanced
					</Typography>
					<Grid container spacing={2}>
						{Array.from({ length: 10 }).map((_, index) => (
							<Grid item key={index}>
								<Button
									onClick={() => loadLevel(index + 20)}
									disabled={Boolean(levelData[index + 21])}
									color="primary"
									variant="contained">
									{index + 21}
								</Button>
							</Grid>
						))}
					</Grid>
					<Typography py={2}>
						Expert
					</Typography>
					<Grid container spacing={2}>
						{Array.from({ length: 10 }).map((_, index) => (
							<Grid item key={index}>
								<Button
									onClick={() => loadLevel(index + 30)}
									disabled={!Boolean(levelData[index + 31])}
									color="error"
									variant="contained">
									{index + 31}
								</Button>
							</Grid>
						))}
					</Grid>
				</Box>
			</Paper>
		</Box>
	);
};

export default LevelSelection;