
import { makeStyles } from '@mui/styles';


const useStyles = makeStyles(() => ({
	tile: {
		width: 64,
		height: 64,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		background: '#252525',
		cursor: 'pointer',
		color: '#fff',
		fontSize: 32,
		fontWeight: 500,
		margin: 4,
		borderRadius: 4,
	}
}));

export default useStyles;
