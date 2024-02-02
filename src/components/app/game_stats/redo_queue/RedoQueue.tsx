import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Box } from '@mui/material';
import { GameState, MoveTurn } from 'Types/gameTypes';
import React, { Fragment } from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import MoveItem from '../move/MoveItem';

const RedoQueue = () => {

	const redoQueue: GameState = useSelector((state: RootStateOrAny) => (state.gameReducer as GameState).redoQueue);

	return (
		<Accordion TransitionProps={{ unmountOnExit: true }}>
			<AccordionSummary expandIcon={<ExpandMoreIcon />}>
			<p>
				Redo Queue  ({redoQueue.length})
			</p>
			</AccordionSummary>
			<AccordionDetails>
				{redoQueue.map((moveTurn: MoveTurn, index) => (
					<Fragment key={index}>
						<MoveItem moveTurn={moveTurn} />
					</Fragment>
				))}
				{!redoQueue.length && (
					<Box display="flex" justifyContent="center">
						<p variant="caption">
							No turns to redo
						</p>
					</Box>
				)}
			</AccordionDetails>

		</Accordion>
	)
}

export default RedoQueue;