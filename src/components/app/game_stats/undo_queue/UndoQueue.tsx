import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { Fragment } from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import { GameState, MoveTurn } from 'Types/gameTypes';
import MoveItem from '../move/MoveItem';


const UndoQueue = () => {

	const gameState: GameState = useSelector((state: RootStateOrAny) => state.gameReducer);

	const {
		undoQueue,
	} = gameState;

	return (
		<Accordion TransitionProps={{ unmountOnExit: true }}>
			<AccordionSummary expandIcon={<ExpandMoreIcon />}>
				<Typography>
					Recent Moves ({undoQueue.length})
				</Typography>
			</AccordionSummary>
			<AccordionDetails>
				{undoQueue.map((moveTurn: MoveTurn, index) => (
					<Fragment key={index}>
						<MoveItem moveTurn={moveTurn} />
					</Fragment>
				))}
				{!undoQueue.length && (
					<Box display="flex" justifyContent="center">
						<Typography variant="caption">
							No recent moves
						</Typography>
					</Box>
				)}
			</AccordionDetails>
		</Accordion>
	)
}

export default UndoQueue;