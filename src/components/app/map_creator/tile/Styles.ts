import { makeStyles } from '@mui/styles';

interface CreateTileCssProps {
	tileColor: string;
}

const useStyles = makeStyles(() => ({
	createTileContainer: ({ tileColor }: CreateTileCssProps) => ({
		width: 125,
		height: 125,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		background: tileColor,
		color: '#fff',
		fontSize: 32,
		fontWeight: 500,
		margin: 4,
		borderRadius: 4,
	}),
	createTileBorder: {
		position: 'absolute',
		height: 48,
		width: 48,
		border: '16px dashed rgb(0 0 0 / 28%)',
	}
}));

export default useStyles;
