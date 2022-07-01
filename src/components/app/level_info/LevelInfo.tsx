import { Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { isEmpty } from 'lodash';
import React from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import { GameState } from 'Types/gameTypes';
import { Achievement, LevelData } from '../level_selection/LevelSelection';

const LevelInfo = () => {

	const { levelData }: GameState = useSelector((state: RootStateOrAny) => state.gameReducer);

	const {
		level = 0,
		text = '-',
		achievements = [],
	}: LevelData = levelData;

	return (
		<Paper>
			<Box p={3}>
				<Typography variant="h4">
					{level} {text}
				</Typography>
				{!isEmpty(achievements) && <>
					<Typography variant="h5" py={2}>
						Rankings
					</Typography>
					{achievements.map((achievement: Achievement, index) => (
						<Box pb={3} key={index}>
							<Typography variant="h6">
								{achievement.rank}
							</Typography>
							<Typography>
								{achievement.turns} turns
							</Typography>
						</Box>
					))}
				</>}
			</Box>

		</Paper>
	);
};

export default LevelInfo;