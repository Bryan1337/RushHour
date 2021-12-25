
import { makeStyles } from '@mui/styles';
import { CSSProperties } from 'react';


const useStyles = makeStyles(() => ({
	tile: ({ background } : CSSProperties) => ({
		width: 125,
		height: 125,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		background,
		cursor: 'pointer',
		color: '#fff',
		fontSize: 32,
		fontWeight: 500,
		margin: 4,
		borderRadius: 4,
	})
}));

export default useStyles;
