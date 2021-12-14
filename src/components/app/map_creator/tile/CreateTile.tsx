import 'Components/app/App.css';
import GameVehicle from 'Components/entities/vehicle/GameVehicle';
import { useAppTiles } from 'Hooks/useAppTiles';
import React, { useMemo } from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import { AppCarOrientations, GameState, GameTileProperties } from 'Types/gameTypes';

interface CreateTileTileProperties {
	tileProperties: GameTileProperties
}

const CreateTile = ({ tileProperties }: CreateTileTileProperties) => {

	const {
		xPosition,
		yPosition,
		vehicle,
		isSelected,
	}: GameTileProperties = tileProperties

	const gameState: GameState = useSelector((state: RootStateOrAny) => state.gameReducer);

	const {
		placementDirection,
		placementLength,
		gameAppTiles,
		selectedTile,
		gridSize,
	} = gameState;

	const {
		setSelectedTile,
	} = useAppTiles();

	const isSelectedTile = useMemo(() => {

		if(placementDirection === AppCarOrientations.Horizontal) {

			if(isSelected || (
				yPosition === selectedTile?.yPosition &&
				xPosition >= selectedTile?.xPosition &&
				xPosition <= selectedTile?.xPosition + placementLength - 1 &&
				xPosition <= gridSize - 1
			)) {

				return true;
			}
		}

		if(placementDirection === AppCarOrientations.Vertical) {

			if ((
				xPosition === selectedTile?.xPosition &&
				yPosition >= selectedTile?.yPosition &&
				yPosition <= selectedTile?.yPosition + placementLength - 1 &&
				yPosition <= gridSize - 1
			)) {

				return true;
			}
		}

		return false;

	}, [
		selectedTile?.xPosition,
		selectedTile?.yPosition,
		placementLength,
		placementDirection,
		isSelected
	])

	const isBlockedPlacementTile = useMemo(() => {

		if(!isSelectedTile) {

			return false;
		}

		// centralize this
		if (placementDirection === AppCarOrientations.Horizontal) {

			for(let xIndex = Number(selectedTile?.xPosition); xIndex <= Number(selectedTile?.xPosition) + placementLength - 1; xIndex++) {

				if (Boolean(gameAppTiles[yPosition][xIndex].vehicle)) {

					return true;
				}
			}
		}

		if (placementDirection === AppCarOrientations.Vertical) {

			for (let yIndex = Number(selectedTile?.yPosition); yIndex <= Number(selectedTile?.yPosition) + placementLength - 1; yIndex++) {

				if (Boolean(gameAppTiles[yIndex][xPosition].vehicle)) {

					return true;
				}
			}
		}

		return false;

	}, [
		vehicle,
		isSelectedTile,
		placementDirection,
		placementLength,
	])

	return (
		<>
			{isSelectedTile && <>
				{!isBlockedPlacementTile && <>
					<div
						onClick={() => setSelectedTile(tileProperties)}
						style={{
							width: 100,
							height: 100,
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							background: '#4fc05f',
							color: '#fff',
							fontSize: 32,
							fontWeight: 500,
							margin: 4,
							borderRadius: 4,
						}}>
						{!vehicle && <span style={{
							position: 'absolute',
							height: 48,
							width: 48,
							border: '16px dashed rgb(0 0 0 / 28%)',
						}} />}
						{vehicle && <GameVehicle vehicle={vehicle} />}
					</div>
				</>}
				{isBlockedPlacementTile && <>
					<div
						onClick={() => setSelectedTile(tileProperties)}
						style={{
							width: 100,
							height: 100,
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							background: '#ff5454',
							color: '#fff',
							fontSize: 32,
							fontWeight: 500,
							margin: 4,
							borderRadius: 4,
						}}>
						{!vehicle && <span style={{
							position: 'absolute',
							height: 48,
							width: 48,
							border: '16px dashed rgb(0 0 0 / 28%)',
						}} />}
						{vehicle && <GameVehicle vehicle={vehicle} />}
					</div>
				</>}
			</>}
			{!isSelectedTile && <>
				<div
					onClick={() => setSelectedTile(tileProperties)}
					style={{
						width: 100,
						height: 100,
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						background: 'gray',
						color: '#fff',
						fontSize: 32,
						fontWeight: 500,
						margin: 4,
						borderRadius: 4,
					}}>

					{!vehicle && <span style={{
						position: 'absolute',
						height: 48,
						width: 48,
						border: '16px dashed #949494',
					}} />}
					{vehicle && <GameVehicle vehicle={vehicle} />}

				</div>
			</>}
		</>

	);
}


export default CreateTile;