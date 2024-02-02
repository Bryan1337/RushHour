import { Box } from '@mui/system';
import GameGrid from 'Components/grid/game/GameGrid';
import React from 'react';

const PlayLevelPage = () => {
	return (
		<Box display="flex" justifyContent="center" flex-direction="column">
			{/* <GameStatistics /> */}
			<GameGrid />
		</Box>
	);
};

export default PlayLevelPage;