import { Box } from '@mui/system';
import { LevelData } from 'Components/app/level_selection/LevelSelection';
import { useAppTiles } from 'Hooks/useAppTiles';
import { useGame } from 'Hooks/useGame';
import React, { Fragment, useEffect, useMemo } from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getCoordinateTileKey } from 'Scripts/coordinateHelper';
import { CreateGameProperties, GameState } from 'Types/gameTypes';
import { RouteParams } from 'Types/pageTypes';
import levelList from '../../../levels/levels.json';
import Tile from '../tile/Tile';

const GameGrid = () => {

	const {
		gameTiles,
		undoQueue,
		redoQueue,
	}: GameState = useSelector((state: RootStateOrAny) => state.gameReducer);

	const {
		levelId
	} = useParams() as RouteParams;

	const {
		importString,
	} = useGame();

	const {
		createGame,
		createGameProperties,
	} = useAppTiles();

	useEffect(() => {

		const level: LevelData = levelList[levelId];

		if (Boolean(level)) {

			const game = importString(level.game);

			createGame(game as CreateGameProperties);

			createGameProperties(level);
		}

	}, [levelId])

	const tileGrid = useMemo(() => {

		const grid = {}

		Object.keys(gameTiles).forEach((coordinate) => {

			const tile = gameTiles[coordinate];

			grid[tile.yPosition] = {
				...grid[tile.yPosition],
				[tile.xPosition]: tile
			}
		})

		return grid;

	}, [undoQueue.length, redoQueue.length, gameTiles ]);

	return (
		<Box>
			{Object.keys(tileGrid).map((_, yIndex) => (
				<Fragment key={yIndex}>
					<Box display="flex">
						{Object.keys(tileGrid[yIndex]).map((_, xIndex) => (
							<Fragment key={getCoordinateTileKey(xIndex, yIndex)}>
								<Tile
									tileProperties={tileGrid[yIndex][xIndex]}
								/>
							</Fragment>
						))}
					</Box>
				</Fragment>
			))}
		</Box>
	);
};

export default GameGrid;