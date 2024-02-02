import KeyboardDoubleArrowDownRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowDownRounded';
import KeyboardDoubleArrowLeftRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowLeftRounded';
import KeyboardDoubleArrowRightRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowRightRounded';
import KeyboardDoubleArrowUpRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowUpRounded';
import { Box } from '@mui/system';
import { useAppTiles } from 'Hooks/useAppTiles';
import { AppCarOrientations, GameObject, GameState, GameTileCoordinate, MoveTurn } from 'Types/gameTypes';
import React from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import useStyles from './Styles';

interface AccessibleTileProperties {
	tileProperties: GameTileCoordinate;
}

const AccessibleTile = ({
	tileProperties,
}: AccessibleTileProperties) => {

	const { xPosition, yPosition } = tileProperties;

	const {
		moveObject,
		selectObject
	} = useAppTiles();

	const selectedObject = useSelector((state: RootStateOrAny) => (state.gameReducer as GameState).selectedObject) as GameObject;

	const classes = useStyles();

	const moveToTile = async () => {

		if (Boolean(selectedObject)) {

			selectObject(null);

			let newXPosition = xPosition;

			let newYPosition = yPosition;
			// Make sure object cant move out of bounds
			if (newYPosition > selectedObject!.yPosition) {

				newYPosition = newYPosition - selectedObject!.size + 1;
			}

			if (newXPosition > selectedObject!.xPosition) {

				newXPosition = newXPosition - selectedObject!.size + 1;
			}

			const gameObject = selectedObject as GameObject;

			const moveTurn: MoveTurn = {
				gameObject,
				fromX: gameObject.xPosition,
				fromY: gameObject.yPosition,
				toX: newXPosition,
				toY: newYPosition,
			}

			await moveObject(moveTurn);
		}
	}

	return (
		<Box
			className={classes.accessibleTile}
			onClick={() => moveToTile()}>
			{selectedObject.orientation === AppCarOrientations.Horizontal && (
				<>
					{(tileProperties.xPosition >= selectedObject?.xPosition) && <KeyboardDoubleArrowRightRoundedIcon className={classes.navIcon} />}
					{(tileProperties.xPosition <= selectedObject?.xPosition) && <KeyboardDoubleArrowLeftRoundedIcon className={classes.navIcon} />}
				</>
			)}
			{selectedObject.orientation === AppCarOrientations.Vertical && (
				<>
					{(tileProperties.yPosition >= selectedObject?.yPosition) && <KeyboardDoubleArrowDownRoundedIcon className={classes.navIcon} />}
					{(tileProperties.yPosition <= selectedObject?.yPosition) && <KeyboardDoubleArrowUpRoundedIcon className={classes.navIcon} />}
				</>
			)}
		</Box>
	);
};

export default AccessibleTile;