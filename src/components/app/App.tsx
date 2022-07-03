import { Grid } from '@mui/material';
import 'Components/app/App.css';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Navigation from '../../pages/navigation/Navigation';
import MainRoutes from '../../routes/MainRoutes';

const App = () => {

	return (
		<BrowserRouter>
			<Grid
				container
				display="flex"
				flexDirection="column"
				height="100%">
				<Grid
					display="flex"
					flexDirection="column"
					alignItems="center"
					justifyContent="center"
					item
					xs>
					<MainRoutes />
				</Grid>
				<Grid item>
					<Navigation />
				</Grid>
			</Grid>
		</BrowserRouter>

	)
}

export default App;