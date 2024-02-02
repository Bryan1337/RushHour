import { Grid } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/styles';
import 'Components/app/App.css';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import MainRoutes from '../../routes/MainRoutes';

const App = () => {

	const theme = createTheme();

	return (
		<BrowserRouter>
			<ThemeProvider theme={theme}>
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
				</Grid>
			</ThemeProvider>

		</BrowserRouter>

	)
}

export default App;