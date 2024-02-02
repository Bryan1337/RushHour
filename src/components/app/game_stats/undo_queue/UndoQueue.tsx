import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import { Box } from '@mui/system';
import { GameState, MoveTurn } from 'Types/gameTypes';
import React, { Fragment } from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import MoveItem from '../move/MoveItem';


const UndoQueue = () => {

	const undoQueue = useSelector((state: RootStateOrAny) => (state.gameReducer as GameState).undoQueue);

	return (
		<Accordion TransitionProps={{ unmountOnExit: true }}>
			<AccordionSummary expandIcon={<ExpandMoreIcon />}>
				<p>
					Recent Moves ({undoQueue.length})
				</p>
			</AccordionSummary>
			<AccordionDetails>
				{undoQueue.map((moveTurn: MoveTurn, index) => (
					<Fragment key={index}>
						<MoveItem moveTurn={moveTurn} />
					</Fragment>
				))}
				{!undoQueue.length && (
					<Box display="flex" justifyContent="center">
						<p variant="caption">
							No recent moves
						</p>
					</Box>
				)}
			</AccordionDetails>
		</Accordion>
	)
}

export default UndoQueue;