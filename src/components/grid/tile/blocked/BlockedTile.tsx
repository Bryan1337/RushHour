import { Box } from '@mui/system';
import React from 'react';
import useStyles from './Styles';

const BlockedTile = () => {

	const classes = useStyles();

	return (
		<Box className={classes.blockedTile}>
			⛔
		</Box>
	);
};

export default BlockedTile;