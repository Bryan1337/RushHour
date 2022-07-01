import { Typography } from '@mui/material';
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
		<>
			<Typography>
				Redo Queue  ({redoQueue.length})
			</Typography>
			{redoQueue.map((moveTurn: MoveTurn, index) => (
				<Fragment key={index}>
					<MoveItem moveTurn={moveTurn} />
				</Fragment>
			))}
		</>
	)
}

export default RedoQueue;