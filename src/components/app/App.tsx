import { Box } from '@mui/system';
import 'Components/app/App.css';
import Row from 'Components/grid/row/Row';
import React, { Fragment } from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import { CreateState } from 'Types/createTypes';
import { GameState } from 'Types/gameTypes';
import GameStatistics from './game_stats/GameStatistics';
import LevelInfo from './level_info/LevelInfo';
import LevelSelection from './level_selection/LevelSelection';
import MapCreator from './map_creator/MapCreator';

const App = () => {

	const {
		levelData,
		gameAppTiles,
	}: GameState = useSelector((state: RootStateOrAny) => state.gameReducer);

	const {
		creatorModeEnabled,
	}: CreateState = useSelector((state: RootStateOrAny) => state.createReducer);

	return (
		<Box
			p={2}
			display="flex"
			justifyContent="center"
			alignItems="center"
			flexDirection="row"
			height="100%">
			<Box
				display="flex"
				flexDirection="row">
				{!creatorModeEnabled && <>
					<GameStatistics />
					{!Boolean(levelData) && <LevelSelection />}
					{Boolean(levelData) && <LevelInfo />}
				</>}
				{creatorModeEnabled && <>
					<MapCreator />
				</>}
				<Box>
					{Object.keys(gameAppTiles).map((yKey: string) => (
						<Fragment key={yKey}>
							<Row
								rowItems={gameAppTiles[yKey]}
							/>
						</Fragment>
					))}
				</Box>
			</Box>
		</Box>
	)
}

export default App;