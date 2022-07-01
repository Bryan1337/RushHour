import { Button, Paper } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { Pages } from 'Types/pageTypes';

const MainPage = () => {

	const history = useHistory();

	return (
		<Paper>
			<Box p={4} display="flex" flexDirection="column">
				<Button
					fullWidth
					variant="outlined"
					onClick={() => history.push(Pages.Editor)}>
					To Editor
				</Button>
				<Box p={1} />
				<Button
					fullWidth
					variant="outlined"
					onClick={() => history.push(Pages.LevelSelection)}>
					Level Selection
				</Button>
			</Box>
		</Paper>
	);
};

export default MainPage;