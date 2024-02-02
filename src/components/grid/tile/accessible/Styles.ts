
import { makeStyles } from '@mui/styles';


const useStyles = makeStyles(() => ({
	accessibleTile: {
		background: '#4BB543',
		// height: '100%',
		// width: '100%',
		display: "flex",
		justifyContent: 'center',
		alignItems: 'center',
		cursor: 'pointer',
		borderRadius: 8,
		height: 64,
		width: 64,
		// boxShadow: `0 0 0 4px #4BB54380`,
		animation: 'pulse-growth 3s ease-in-out infinite',
		stroke: '#4BB54380',
		transition: '250ms all'
	},
	navIcon: {
		height: 48,
		width: 48,
		textShadow: '0px 0px 5px 0px rgba(0,0,0,0.75)',
		stroke: '#00ff4a',
		animation: 'stroke-growth 3s ease-in-out infinite',
		transition: '250ms all'
	}
}));

export default useStyles;
