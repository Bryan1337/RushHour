import EditIcon from '@mui/icons-material/Edit';
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import { BottomNavigation, BottomNavigationAction, Box } from '@mui/material';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { Pages } from 'Types/pageTypes';

const Navigation = () => {

	const history = useHistory();

	return (
		<Box width="100%">
			<BottomNavigation
				showLabels
				value={window.location.pathname}
				onChange={(event, newValue) => history.push(newValue)}>
				<BottomNavigationAction value={Pages.Editor} label="Editor" icon={<EditIcon />} />
				<BottomNavigationAction value={Pages.LevelSelection} label="Level Selection" icon={<PlaylistPlayIcon />} />
			</BottomNavigation>
		</Box>

	);
};

export default Navigation;