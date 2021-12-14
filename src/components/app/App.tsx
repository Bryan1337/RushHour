import { Box } from '@mui/system';
import Solver from 'Classes/solver/Solver';
import 'Components/app/App.css';
import Row from 'Components/grid/Row';
import { useGame } from 'Hooks/useGame';
import React, { Fragment, useEffect } from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import { generateKey } from 'Scripts/keyHelper';
import { CreateState } from 'Types/createTypes';
import { AppCarOrientations, AppTileIndices, GameState, GameVehicle, VehicleSizes } from 'Types/gameTypes';
import levelData from '../../levels/levels.json';
import GameStatistics from './game_stats/GameStatistics';
import LevelSelection from './level_selection/LevelSelection';
import MapCreator from './map_creator/MapCreator';


const level40: Array<GameVehicle> = [
	{
		orientation: AppCarOrientations.Horizontal,
		size: VehicleSizes.Small,
		yPosition: AppTileIndices.C,
		xPosition: AppTileIndices.D,
		key: generateKey(),
	},
	{
		orientation: AppCarOrientations.Vertical,
		size: VehicleSizes.Medium,
		xPosition: AppTileIndices.A,
		yPosition: AppTileIndices.A,
		key: generateKey(),
	},
	{
		orientation: AppCarOrientations.Horizontal,
		size: VehicleSizes.Small,
		yPosition: AppTileIndices.A,
		xPosition: AppTileIndices.B,
		key: generateKey(),
	},
	{
		orientation: AppCarOrientations.Vertical,
		size: VehicleSizes.Small,
		yPosition: AppTileIndices.A,
		xPosition: AppTileIndices.E,
		key: generateKey(),
	},
	{
		orientation: AppCarOrientations.Vertical,
		size: VehicleSizes.Small,
		xPosition: AppTileIndices.B,
		yPosition: AppTileIndices.B,
		key: generateKey(),
	},
	{
		orientation: AppCarOrientations.Vertical,
		size: VehicleSizes.Small,
		yPosition: AppTileIndices.B,
		xPosition: AppTileIndices.C,
		key: generateKey(),
	},
	{
		orientation: AppCarOrientations.Vertical,
		size: VehicleSizes.Medium,
		yPosition: AppTileIndices.B,
		xPosition: AppTileIndices.F,
		key: generateKey(),
	},
	{
		orientation: AppCarOrientations.Horizontal,
		size: VehicleSizes.Medium,
		yPosition: AppTileIndices.D,
		xPosition: AppTileIndices.A,
		key: generateKey(),
	},
	{
		orientation: AppCarOrientations.Vertical,
		size: VehicleSizes.Small,
		xPosition: AppTileIndices.D,
		yPosition: AppTileIndices.D,
		key: generateKey(),
	},

	{
		orientation: AppCarOrientations.Vertical,
		size: VehicleSizes.Small,
		yPosition: AppTileIndices.E,
		xPosition: AppTileIndices.C,
		key: generateKey(),
	},
	{
		orientation: AppCarOrientations.Horizontal,
		size: VehicleSizes.Small,
		xPosition: AppTileIndices.E,
		yPosition: AppTileIndices.E,
		key: generateKey(),
	},
	{
		orientation: AppCarOrientations.Horizontal,
		size: VehicleSizes.Small,
		yPosition: AppTileIndices.F,
		xPosition: AppTileIndices.A,
		key: generateKey(),
	},
	{
		orientation: AppCarOrientations.Horizontal,
		size: VehicleSizes.Small,
		yPosition: AppTileIndices.F,
		xPosition: AppTileIndices.D,
		key: generateKey(),
	}
];


const App = () => {

	const gameState: GameState = useSelector((state: RootStateOrAny) => state.gameReducer);

	const createState: CreateState = useSelector((state: RootStateOrAny) => state.createReducer);

	const {
		creatorModeEnabled,
	} = createState;

	const {
		gameAppTiles,
	} = gameState;

	const {
		importString
	} = useGame();

	useEffect(() => {

		const game = importString(levelData[0].game);

		const { gridSize, vehicles } = game

		const solver = new Solver({
			gridSize,
			vehicles: level40
		});

		solver.solve();

		const turns = solver.getWinningTurns();

		console.log({
			turns
		})

	}, [])

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
				{!creatorModeEnabled && <GameStatistics />}
				{creatorModeEnabled && <>
					<MapCreator />
					<LevelSelection />
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