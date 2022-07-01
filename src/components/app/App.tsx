import { Box } from '@mui/system';
import 'Components/app/App.css';
import React from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import { CreateState } from 'Types/createTypes';
import MainRoutes from '../../routes/MainRoutes';

const App = () => {

	const {
		creatorModeEnabled,
	}: CreateState = useSelector((state: RootStateOrAny) => state.createReducer);

	return (
		<Box
			p={2}
			display="flex"
			justifyContent="center"
			alignItems="center"
			flexDirection="row"
			height="100%">
			<MainRoutes />
			<Box
				display="flex"
				flexDirection="row">
				{/* <GameStatistics /> */}
				{/* <LevelInfo /> */}
			</Box>
		</Box>
	)
}

export default App;