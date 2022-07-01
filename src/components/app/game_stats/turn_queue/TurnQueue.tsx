import { Typography } from '@mui/material';
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
		<>
			<Typography>
				Turn Queue ({turnQueue.length})
			</Typography>
			{turnQueue.map((moveTurn: MoveTurn, index) => (
				<Fragment key={index}>
					<MoveItem moveTurn={moveTurn} />
				</Fragment>
			))}
		</>
	)
}

export default TurnQueue;