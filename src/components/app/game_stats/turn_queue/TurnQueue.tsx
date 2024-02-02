import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Box } from '@mui/material';
import { GameState, MoveTurn } from 'Types/gameTypes';
import React, { Fragment } from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import MoveItem from '../move/MoveItem';


const TurnQueue = () => {

	const turnQueue: GameState = useSelector((state: RootStateOrAny) => (state.gameReducer as GameState).turnQueue);

	return (
		<Accordion TransitionProps={{ unmountOnExit: true }}>
			<AccordionSummary expandIcon={<ExpandMoreIcon />}>
				<p>
					Turn Queue ({turnQueue.length})
				</p>
			</AccordionSummary>
			<AccordionDetails>
				{turnQueue.map((moveTurn: MoveTurn, index) => (
					<Fragment key={index}>
						<MoveItem moveTurn={moveTurn} />
					</Fragment>
				))}
				{!turnQueue.length && (
					<Box display="flex" justifyContent="center">
						<p variant="caption">
							No turn items in the queue
						</p>
					</Box>
				)}
			</AccordionDetails>
		</Accordion>
	)
}

export default TurnQueue;