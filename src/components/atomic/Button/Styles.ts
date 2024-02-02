
import { makeStyles } from '@mui/styles';


interface CssProps {
	disabled?: boolean;
	loading?: boolean;
	textColor?: string;
	backgroundColor?: string;
}

const useStyles = makeStyles(() => ({
	buttonWrapper: ({ disabled, }: CssProps) => ({
		cursor: disabled ? 'not-allowed' : 'pointer',
	}),
	button: ({ disabled, backgroundColor, textColor }: CssProps) => ({
		width: '100%',
		position: 'relative',
		userSelect: 'none',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		transition: 'all 0.2s ease-in-out',
		opacity: disabled ? 0.5 : 1,
		color: textColor || 'black',
		backgroundColor: backgroundColor || 'white',
		pointerEvents: disabled ? 'none' : 'auto',
		border: `4px solid black`,
		boxShadow: `8px 8px 0px 1px rgba(0, 0, 0, 1)`,
		borderRadius:16,
		marginRight: 8,
		marginBottom: 8,
		fontSize: 24,
		'&:hover': {
			cursor: 'pointer',
			boxShadow: `6px 6px 0px 1px rgba(0, 0, 0, 1)`,
			transform: `translate(2px, 2px)`,
		},
		'&:active': {
			boxShadow: `4px 4px 0px 1px rgba(0, 0, 0, 1)`,
			transform: `translate(4px, 4px)`,
		},
		'& svg': {
			marginRight: 16,
		}
	})
}));

export default useStyles;
