import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from '@mui/material';
import React, { Fragment } from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import { GameState, MoveTurn } from 'Types/gameTypes';
import MoveItem from '../move/MoveItem';

const RedoQueue = () => {

	const gameState: GameState = useSelector((state: RootStateOrAny) => state.gameReducer);

	const {
		redoQueue,
	} = gameState;

	return (
		<Accordion TransitionProps={{ unmountOnExit: true }}>
			<AccordionSummary expandIcon={<ExpandMoreIcon />}>
			<Typography>
				Redo Queue  ({redoQueue.length})
			</Typography>
			</AccordionSummary>
			<AccordionDetails>
				{redoQueue.map((moveTurn: MoveTurn, index) => (
					<Fragment key={index}>
						<MoveItem moveTurn={moveTurn} />
					</Fragment>
				))}
				{!redoQueue.length && (
					<Box display="flex" justifyContent="center">
						<Typography variant="caption">
							No turns to redo
						</Typography>
					</Box>
				)}
			</AccordionDetails>

		</Accordion>
	)
}

export default RedoQueue;