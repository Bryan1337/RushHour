import { Box } from '@mui/system';
import { LevelData } from 'Components/app/level_selection/LevelSelection';
import CreateTile from 'Components/app/map_creator/tile/CreateTile';
import { useAppTiles } from 'Hooks/useAppTiles';
import { useGame } from 'Hooks/useGame';
import React, { Fragment, useEffect } from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { CreateGameProperties, GameState } from 'Types/gameTypes';
import levelList from '../../../levels/levels.json';

const EditGameGrid = () => {

	const {
		gameTiles,
	}: GameState = useSelector((state: RootStateOrAny) => state.gameReducer);

	const {
		levelId
	} = useParams();

	const {
		importString,
	} = useGame();

	const {
		createGame,
		createGameProperties,
	} = useAppTiles();

	useEffect(() => {

		const level: LevelData = levelList[levelId];

		console.log({
			level,
			levelList,
		})

		if (Boolean(level)) {

			const game = importString(level.game);

			console.log({
				game
			})

			createGame(game as CreateGameProperties);

			createGameProperties(level);
		}

	}, [levelId])

	const getTileGrid = () => {

		const grid = {}

		Object.keys(gameTiles).forEach((coordinate) => {

			const tile = gameTiles[coordinate];

			grid[tile.yPosition] = {
				...grid[tile.yPosition],
				[tile.xPosition]: tile
			}
		})

		return grid;

	};

	const tileGrid = getTileGrid();

	return (
		<Box>
			{Object.keys(tileGrid).map((yKey: string) => (
				<Fragment key={yKey}>
					<Box display="flex">
						{Object.keys(tileGrid[yKey]).map((xKey: string, xIndex) => (
							<Fragment key={xKey}>
								<CreateTile
									key={xIndex}
									tileProperties={tileGrid[yKey][xKey]}
								/>
							</Fragment>
						))}
					</Box>
				</Fragment>
			))}
		</Box>
	);
};

export default EditGameGrid;