import { Button } from '@mui/material';
import React from 'react';
import useStyles from './Styles';



interface Props {
	children: React.ReactNode;
	buttonColor?: string;
	textColor?: string;
	completed?: boolean;
	disabled?: boolean;
	className?: string;
	onClick?: () => void;
}

const TileButton  = React.forwardRef<HTMLButtonElement, Props>(({
	completed,
	children,
	buttonColor,
	textColor,
	...props
}: Props, ref) => {

	const { className, ...otherProps } = props;

	const classes = useStyles({ buttonColor, textColor });

	return (
		<Button
			ref={ref}
			disableFocusRipple
			disableRipple
			disableTouchRipple
			component="button"
			variant="contained"
			className={`${classes.tileButton} ${className || ``}`}
			{...otherProps}>
			{completed && (
				<div style={{
					position: 'absolute',
					top: -16,
					right: -16,
					fontSize: 24,
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}>
					✔️
				</div>
			)}
			{children}
		</Button>
	);
});

export default TileButton;