import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from '@mui/material';
import React, { Fragment } from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import { GameState, MoveTurn } from 'Types/gameTypes';
import MoveItem from '../move/MoveItem';


const TurnQueue = () => {

	const gameState: GameState = useSelector((state: RootStateOrAny) => state.gameReducer);

	const {
		turnQueue,
	} = gameState;

	return (
		<Accordion TransitionProps={{ unmountOnExit: true }}>
			<AccordionSummary expandIcon={<ExpandMoreIcon />}>
				<Typography>
					Turn Queue ({turnQueue.length})
				</Typography>
			</AccordionSummary>
			<AccordionDetails>
				{turnQueue.map((moveTurn: MoveTurn, index) => (
					<Fragment key={index}>
						<MoveItem moveTurn={moveTurn} />
					</Fragment>
				))}
				{!turnQueue.length && (
					<Box display="flex" justifyContent="center">
						<Typography variant="caption">
							No turn items in the queue
						</Typography>
					</Box>
				)}
			</AccordionDetails>
		</Accordion>
	)
}

export default TurnQueue;