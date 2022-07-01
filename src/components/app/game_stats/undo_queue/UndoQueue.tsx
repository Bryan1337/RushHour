import { Typography } from '@mui/material';
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
		<>
			<Typography>
				Recent Moves ({undoQueue.length})
			</Typography>
			{undoQueue.map((moveTurn: MoveTurn, index) => (
				<Fragment key={index}>
					<MoveItem moveTurn={moveTurn} />
				</Fragment>
			))}
		</>
	)
}

export default UndoQueue;