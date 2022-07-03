import { Button, Grid, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useAppTiles } from 'Hooks/useAppTiles';
import { useCreator } from 'Hooks/useCreator';
import { useGame } from 'Hooks/useGame';
import { useSolverWorker } from 'Hooks/useSolverWorker';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { CreateGameProperties } from 'Types/gameTypes';
import { PageParams, Pages } from 'Types/pageTypes';
import levelData from '../../../levels/levels.json';

export interface Achievement {
	turns: number;
	rank: string;
}
export interface LevelData {
	game: string;
	level: number;
	text: string;
	achievements: Array<Achievement>;
}

const LevelSelection = () => {

	const {
		importString,
	} = useGame();

	const history = useHistory();

	const {
		createGame,
		createGameProperties,
	} = useAppTiles();

	const {
		setCreatorModeEnabled,
	} = useCreator()

	const {
		solveGame,
	} = useSolverWorker();

	const loadLevel = (levelNr: number) => {

		// const level: LevelData = levelData[levelNr];

		// if (Boolean(level)) {

		// 	const game = importString(level.game);

		// 	createGame(game as CreateGameProperties);

		// 	createGameProperties(level);

		// 	setCreatorModeEnabled(false);
		// }

		history.push(Pages.PlayLevel.replace(PageParams.LevelId, levelNr));
	}

	const solveAll = async() => {

		const turnSolveCounter = {}

		levelData.forEach(async (levelData: LevelData) => {

			const game = importString(levelData.game) as CreateGameProperties;

			const turns = await solveGame(game);

			// console.log(`Level ${levelData.level} solved in ${turns.length} turns`);

			turnSolveCounter[levelData.text] = {
				platinum: turns.length,
				gold: turns.length + 5,
				silver: turns.length + 12,
				bronze: turns.length + 25,
			}
		})

		console.log({
			turnSolveCounter
		})
	}

	useEffect(() => {

		// solveAll();
	}, [])

	return (
		<Box
			height="auto"
			m={.5}>
			<Paper>
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
									disabled={!Boolean(levelData[index]?.game)}
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
									disabled={!Boolean(levelData[index + 10]?.game)}
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
									disabled={!Boolean(levelData[index + 20]?.game)}
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
									disabled={!Boolean(levelData[index + 30]?.game)}
									color="error"
									variant="contained">
									{index + 31}
								</Button>
							</Grid>
						))}
					</Grid>
					<Typography py={2}>
						Elite
					</Typography>
					<Grid container spacing={2}>
						{Array.from({ length: 10 }).map((_, index) => (
							<Grid item key={index}>
								<Button
									onClick={() => loadLevel(index + 40)}
									disabled={!Boolean(levelData[index + 40]?.game)}
									color="info"
									variant="contained">
									{index + 41}
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