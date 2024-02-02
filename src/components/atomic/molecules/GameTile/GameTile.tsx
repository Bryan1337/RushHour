import { Box, Grow } from '@mui/material';
import AvailableTile from 'Components/atomic/atoms/AvailableTile/AvailableTile';
import FinishTile from 'Components/atomic/atoms/FinishTile/FinishTile';
import { GameObject, GameTileCoordinate } from 'Types/gameTypes';
import React from 'react';
import useStyles from './Styles';

interface Props {
	tileProperties: GameTileCoordinate;
	selectedObject?: GameObject;
	isFinishTile?: boolean;
	isBlocked: boolean;
	onClick?: () => void;
	children?: React.ReactNode;
}

const GameTile = ({
	tileProperties,
	selectedObject,
	isFinishTile,
	isBlocked,
	onClick,
	children
}: Props) => {

	const classes = useStyles();

	return (
		<Box
			className={classes.tile}>
			{isFinishTile && <FinishTile />}
			<Grow in={!isBlocked}>
				<Box>
					<AvailableTile
						selectedObject={selectedObject}
						tileProperties={tileProperties}
						onClick={onClick}
					/>
				</Box>
			</Grow>
			{children}
		</Box>
	);
}


export default GameTile;