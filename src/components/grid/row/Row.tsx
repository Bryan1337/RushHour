import { Box } from '@mui/material';
import CreateTile from 'Components/app/map_creator/tile/CreateTile';
import React, { Fragment } from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import { CreateState } from 'Types/createTypes';
import { GameTileProperties } from 'Types/gameTypes';
import Tile from '../tile/Tile';


interface AppGameRowProperties {
	rowItems: {
		[key: string]: GameTileProperties;
	}
}

const Row = ({ rowItems }: AppGameRowProperties) => {

	const {
		creatorModeEnabled
	}: CreateState = useSelector((state: RootStateOrAny) => state.createReducer);

	return (
		<Box display="flex">
			{Object.keys(rowItems).map((xKey: string, xIndex) => (
				<Fragment key={xKey}>
					{!creatorModeEnabled && <Tile
						key={xIndex}
						tileProperties={rowItems[xKey]}
					/>}
					{creatorModeEnabled && <CreateTile
						key={xIndex}
						tileProperties={rowItems[xKey]}
					/>}
				</Fragment>
			))}
		</Box>
	)
}

export default Row;