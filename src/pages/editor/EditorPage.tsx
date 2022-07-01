import { Box } from '@mui/material';
import MapCreator from 'Components/app/map_creator/MapCreator';
import EditGameGrid from 'Components/grid/edit/EditGameGrid';
import React from 'react';

const EditorPage = () => {
	return (
		<Box display="flex">
			<MapCreator />
			<EditGameGrid />
		</Box>
	);
};

export default EditorPage;