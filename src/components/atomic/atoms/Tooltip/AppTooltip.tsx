import { Tooltip, TooltipProps } from '@mui/material';
import React from 'react';
import useStyles from './Styles';


interface Props extends TooltipProps { }

const AppTooltip = ({ ...props }: Props) => {

	const tooltipRef = React.useRef<HTMLDivElement>(null);

	const classes = useStyles({ containerStyles: tooltipRef.current });

	const { children, ...otherProps } = props;

	return (
		<Tooltip
			ref={tooltipRef}
			placement='bottom'
			arrow
			{...otherProps}
			classes={{
				tooltip: classes.tooltip,
				arrow: classes.arrow,
			}}
		>
			<span>
				{children}
			</span>
		</Tooltip>
	)
}

			export default AppTooltip;