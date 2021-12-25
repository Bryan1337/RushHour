import { Box } from '@mui/system';
import React from 'react';
import useStyles from './Styles';


const Wall = () => {

	const classes = useStyles();
	return (
		<Box className={classes.wall}>
			🧱
		</Box>
	);
};

export default Wall;