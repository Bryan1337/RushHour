import { Grid, Paper } from '@mui/material';
import { Box } from '@mui/system';
import TileButton from 'Components/atomic/atoms/TileButton/TileButton';
import { useGame } from 'Hooks/useGame';
import { useSolverWorker } from 'Hooks/useSolverWorker';
import { PageParams, Pages } from 'Types/pageTypes';
import React from 'react';
import { useHistory } from 'react-router-dom';

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
		hasCompletedLevel,
		levelIsAvailable,
	} = useGame();

	const history = useHistory();

	const {
		solveGame,
	} = useSolverWorker();

	const loadLevel = (levelNr: number) => {

		history.push(Pages.PlayLevel.replace(PageParams.LevelId, String(levelNr)));
	}

	return (

		<Paper style={{
			maxWidth: 360,
			backgroundColor: "#1F1F1F",
		}}>
			<Box p={3}>
				<strong>
					Rush Hour :: Level selection
				</strong>
				<Box py={2}>
					<p>
						Beginner
					</p>
				</Box>
				<Grid container spacing={2}>
					{Array.from({ length: 10 }).map((_, index) => (
						<Grid item key={index}>
							<TileButton
								completed={hasCompletedLevel(index)}
								disabled={!levelIsAvailable(index)}
								onClick={() => loadLevel(index)}
								buttonColor="#58B368">
								<p>
									{index + 1}
								</p>
							</TileButton>
						</Grid>
					))}
				</Grid>
				<Box py={2}>
					<p>
						Intermediate
					</p>
				</Box>
				<Grid container spacing={2}>
					{Array.from({ length: 10 }).map((_, index) => (
						<Grid item key={index}>
							<TileButton
								completed={hasCompletedLevel(index + 10)}
								disabled={!levelIsAvailable(index + 10)}
								onClick={() => loadLevel(index + 10)}
								textColor='#1F1F1F'
								buttonColor="#FACD60">
								<p>
									{index + 11}
								</p>
							</TileButton>
						</Grid>
					))}
				</Grid>
				<Box py={2}>
					<p>
						Advanced
					</p>
				</Box>
				<Grid container spacing={2}>
					{Array.from({ length: 10 }).map((_, index) => (
						<Grid item key={index}>
							<TileButton
								completed={hasCompletedLevel(index + 20)}
								disabled={!levelIsAvailable(index + 20)}
								onClick={() => loadLevel(index + 20)}
								buttonColor="#FB7756">
								<p>
									{index + 21}
								</p>
							</TileButton>
						</Grid>
					))}
				</Grid>
				<Box py={2}>
					<p>
						Expert
					</p>
				</Box>
				<Grid container spacing={2}>
					{Array.from({ length: 10 }).map((_, index) => (
						<Grid item key={index}>
							<TileButton
								completed={hasCompletedLevel(index + 30)}
								disabled={!levelIsAvailable(index + 30)}
								onClick={() => loadLevel(index + 30)}
								buttonColor="#E74645">
								<p>
									{index + 31}
								</p>
							</TileButton>
						</Grid>
					))}
				</Grid>
				<Box py={2}>
					<p>
						Elite (Walls)
					</p>
				</Box>
				<Grid container spacing={2}>
					{Array.from({ length: 4 }).map((_, index) => (
						<Grid item key={index}>
							<TileButton
								completed={hasCompletedLevel(index + 40)}
								disabled={!levelIsAvailable(index + 40)}
								onClick={() => loadLevel(index + 40)}
								buttonColor="#E74645">
								<p>
									{index + 41}
								</p>
							</TileButton>
						</Grid>
					))}
				</Grid>
			</Box>
		</Paper >
	);
};

export default LevelSelection;