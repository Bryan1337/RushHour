import { alpha } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { AppCarOrientations, GameObject } from 'Types/gameTypes';

const baseObjectWidth = 64;
const baseObjectHeight = 64;

const itemPadding = 8

interface CssProps {
	gameObject: GameObject;
	isSelected: Boolean;
}

const getObjectWidth = (gameObject: GameObject) => {

	if (gameObject.orientation === AppCarOrientations.Horizontal) {

		return (gameObject.size * baseObjectWidth) + (gameObject.size - 1) * itemPadding;
	}

	return baseObjectWidth;
}

const getObjectHeight = (gameObject: GameObject) => {

	if (gameObject.orientation === AppCarOrientations.Vertical) {

		return (gameObject.size * baseObjectHeight) + (gameObject.size - 1) * itemPadding;
	}

	return baseObjectHeight;
}

const useStyles = makeStyles(() => ({
	objectContainer: {
		height: baseObjectHeight,
		width: baseObjectWidth,
		display: 'flex',
		cursor: 'pointer',
		transition: '250ms all',
		'&:hover': {
			filter: 'brightness(125%)'
		},
		userSelect: 'none',
	},
	objectBox: ({ gameObject, isSelected }: CssProps) => ({
		background: gameObject.color,
		fontSize: 32,
		borderRadius: 8,
		boxShadow: isSelected ? `0 0 0 4px ${alpha(gameObject.color as string, .5)}` : 'none',
		height: getObjectHeight(gameObject),
		width: getObjectWidth(gameObject),
		position: 'absolute',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		transition: '125ms ease-in-out all',
	}),
	object: {
		marginTop: -8,
	},
}));

export default useStyles;
