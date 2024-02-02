
import { makeStyles } from '@mui/styles';


const useStyles = makeStyles((theme) => ({
	tooltip: {
		padding: 16,
		backgroundColor: '#0000006e',
		minWidth: theme.spacing(10),
		textAlign: 'center',
		fontSize: 20,
		fontWeight: 700,
		fontStyle: 'italic',
		animation: 'updown 4s ease infinite',
	},
	arrow: {
		color: '#0000006e',
	},

}));

export default useStyles;
