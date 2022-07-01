import { Box } from '@mui/system';
import GameStatistics from 'Components/app/game_stats/GameStatistics';
import LevelInfo from 'Components/app/level_info/LevelInfo';
import GameGrid from 'Components/grid/game/GameGrid';
import React from 'react';

const PlayLevelPage = () => {
	return (
		<Box display="flex">
			<LevelInfo />
			<GameGrid />
			<GameStatistics />
		</Box>
	);
};

export default PlayLevelPage;