import { lighten } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

interface CssProps {
	buttonColor?: string;
	textColor?: string;
}

const useStyles = makeStyles(() => ({
	tileButton: ({ buttonColor, textColor }: CssProps) => ({
		background: buttonColor || '#4BB543',
		color: textColor || '#fff',
		fontWeight: 700,
		fontSize: 16,
		display: "flex",
		justifyContent: 'center',
		alignItems: 'center',
		cursor: 'pointer',
		borderRadius: 8,
		height: 48,
		minWidth: 0,
		width: 48,
		transition: '250ms all',
		boxShadow: 'none',
		'&:hover': {
			filter: 'brightness(125%)',
			backgroundColor: lighten(buttonColor || '#4BB543', 0.1),
			boxShadow: 'none',
		}
	}),
}));

export default useStyles;
