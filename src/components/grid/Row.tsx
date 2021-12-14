import { Box } from '@mui/material';
import 'Components/app/App.css';
import CreateTile from 'Components/app/map_creator/tile/CreateTile';
import React, { Fragment } from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import { CreateState } from 'Types/createTypes';
import { GameTileProperties } from 'Types/gameTypes';
import Tile from './Tile';


interface AppGameRowProperties {
	rowItems: {
		[key: string]: GameTileProperties;
	}
}


const Row = ({ rowItems }: AppGameRowProperties) => {

	const createState: CreateState = useSelector((state: RootStateOrAny) => state.createReducer);

	const {
		creatorModeEnabled
	} = createState;

	return (
		<Box display="flex">
			{Object.keys(rowItems).map((xKey: string, xIndex) => {

				return (
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
				)
			})}
		</Box>
	)
}

export default Row;