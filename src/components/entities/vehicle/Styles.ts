import { makeStyles } from '@mui/styles';
import { CSSProperties } from 'react';


const useStyles = makeStyles(() => ({
	vehicle: ({ background } : CSSProperties) => ({
		background,
		cursor: 'pointer',
		transition: '250ms all',
		'&:hover': {
			filter: 'brightness(125%)'
		}
	})
}));

export default useStyles;
