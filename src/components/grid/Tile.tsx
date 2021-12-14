import 'Components/app/App.css';
import GameVehicle from 'Components/entities/vehicle/GameVehicle';
import { useAppTiles } from 'Hooks/useAppTiles';
import React, { useMemo } from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import { AppCarOrientations, GameState, GameTileProperties } from 'Types/gameTypes';

interface TileProperties {
	tileProperties: GameTileProperties
}

const Tile = ({ tileProperties }: TileProperties) => {

	const {
		xPosition,
		yPosition,
		vehicle,
		isWinTile,
	} : GameTileProperties = tileProperties

	const {
		selectedVehicle,
		gameAppTiles,
	} : GameState = useSelector((state: RootStateOrAny) => state.gameReducer);

	const {
		moveVehicle
	} = useAppTiles();

	const tileIsAccessible = useMemo(() => {

		if(!selectedVehicle) {

			return;
		}

		if(selectedVehicle.orientation === AppCarOrientations.Horizontal) {

			return yPosition === selectedVehicle.yPosition;
		}

		if (selectedVehicle.orientation === AppCarOrientations.Vertical) {

			return xPosition === selectedVehicle.xPosition;
		}

	}, [selectedVehicle])


	const tileIsBlocked = useMemo(() => {

		if (!selectedVehicle || !tileIsAccessible) {

			return false;
		}

		const gridSize = Object.keys(gameAppTiles).length;

		if(selectedVehicle.orientation === AppCarOrientations.Horizontal) {

			for (let xIndex = selectedVehicle.xPosition + 1; xIndex < gridSize; xIndex++) {

				const tile: GameTileProperties = gameAppTiles[selectedVehicle.yPosition][xIndex];

				if (tile?.vehicle?.key === selectedVehicle.key) {

					continue;
				}

				if(Boolean(tile.vehicle) && tile.xPosition <= xPosition) {

					return true;
				}
			}

			for (let xIndex = selectedVehicle.xPosition - 1; xIndex >= 0; xIndex--) {

				const tile: GameTileProperties = gameAppTiles[selectedVehicle.yPosition][xIndex];

				if (tile?.vehicle?.key === selectedVehicle.key) {

					continue;
				}

				if (Boolean(tile.vehicle) && tile.xPosition >= xPosition) {

					return true;
				}
			}
		}

		if(selectedVehicle.orientation === AppCarOrientations.Vertical) {

			for (let yIndex = selectedVehicle.yPosition + 1; yIndex < gridSize; yIndex++) {

				const tile: GameTileProperties = gameAppTiles[yIndex][selectedVehicle.xPosition];

				if (tile?.vehicle?.key === selectedVehicle.key) {

					continue;
				}

				if (Boolean(tile.vehicle) && tile.yPosition <= yPosition) {

					return true;
				}
			}

			for (let yIndex = selectedVehicle.yPosition - 1; yIndex >= 0; yIndex--) {

				const tile: GameTileProperties = gameAppTiles[yIndex][selectedVehicle.xPosition];

				if (tile?.vehicle?.key === selectedVehicle.key) {

					continue;
				}

				if (Boolean(tile.vehicle) && tile.yPosition >= yPosition) {

					return true;
				}
			}
		}

		return Boolean(vehicle);

	}, [selectedVehicle])

	const moveToTile = () => {

		if (tileIsAccessible && !tileIsBlocked) {

			moveVehicle(selectedVehicle, xPosition, yPosition);
		}
	}

	const tileColor = () => {

		if (isWinTile) {

			return '#0832d1';
		}

		// if(tileIsBlocked) {

		// 	return '#fce100';
		// }

		// if(tileIsAccessible) {

		// 	return '#54c34e';
		// }

		return '#252525';

	}

	return (
		<div
			onClick={() => moveToTile()}
			style={{
				width: 100,
				height: 100,
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				background: tileColor(),
				cursor: 'pointer',
				color: '#fff',
				fontSize: 32,
				fontWeight: 500,
				margin: 4,
				borderRadius: 4,
			}}>
			{Boolean(vehicle) && <GameVehicle
				vehicle={vehicle}
			/>}
			{!Boolean(tileProperties.vehicle) && <>
				{isWinTile && "🏁"}
				{!isWinTile && <>
					{tileIsAccessible && <>
						{tileIsBlocked && "⛔"}
						{!tileIsBlocked && "✔️"}
					</>}
					{!tileIsAccessible && <>
						{/* {AppTileIndices[yPosition]}, {AppTileIndices[xPosition]} */}
					</>}
				</>}
			</>}
		</div>
	);
}


export default Tile;