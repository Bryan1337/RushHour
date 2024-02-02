import KeyboardDoubleArrowDownRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowDownRounded';
import KeyboardDoubleArrowLeftRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowLeftRounded';
import KeyboardDoubleArrowRightRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowRightRounded';
import KeyboardDoubleArrowUpRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowUpRounded';
import { Box } from '@mui/system';
import { AppCarOrientations, GameObject, GameTileCoordinate } from 'Types/gameTypes';
import React, { useMemo } from 'react';
import useStyles from './Styles';

export enum AvailableTileDirections {
	Up,
	Down,
	Left,
	Right,
}
interface Props {
	selectedObject?: GameObject;
	tileProperties: GameTileCoordinate;
	onClick?: () => void;
}

const AvailableTile = ({
	selectedObject,
	tileProperties,
	onClick,
}: Props) => {

	const classes = useStyles();

	const availableTileDirection = useMemo(() => {

		if (!selectedObject) {

			return;
		}

		if (selectedObject.orientation === AppCarOrientations.Horizontal) {

			if (tileProperties.yPosition > selectedObject.yPosition) {

				return AvailableTileDirections.Up;
			}

			if (tileProperties.yPosition < selectedObject.yPosition) {

				return AvailableTileDirections.Down;
			}
		}

		if (selectedObject.orientation === AppCarOrientations.Vertical) {

			if (tileProperties.xPosition > selectedObject.xPosition) {

				return AvailableTileDirections.Left;
			}

			if (tileProperties.xPosition < selectedObject.xPosition) {

				return AvailableTileDirections.Right;
			}
		}

	}, [selectedObject, tileProperties])

	return (
		<Box
			className={classes.tile}
			onClick={onClick}>
			{Boolean(availableTileDirection) && (
				<>
					{availableTileDirection === AvailableTileDirections.Up && (
						<KeyboardDoubleArrowUpRoundedIcon className={classes.tile} />
					)}
					{availableTileDirection === AvailableTileDirections.Down && (
						<KeyboardDoubleArrowDownRoundedIcon className={classes.tile} />
					)}
					{availableTileDirection === AvailableTileDirections.Left && (
						<KeyboardDoubleArrowLeftRoundedIcon className={classes.tile} />
					)}
					{availableTileDirection === AvailableTileDirections.Right && (
						<KeyboardDoubleArrowRightRoundedIcon className={classes.tile} />
					)}
				</>
			)}
		</Box>
	);
};

export default AvailableTile;