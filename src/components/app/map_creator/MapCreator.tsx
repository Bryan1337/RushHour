import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import TextsmsIcon from '@mui/icons-material/Textsms';
import ViewComfyIcon from '@mui/icons-material/ViewComfy';
import { Button, Grid, Paper, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { Box } from '@mui/system';
import 'Components/app/App.css';
import { useAppTiles } from 'Hooks/useAppTiles';
import { useCreator } from 'Hooks/useCreator';
import { useGame } from 'Hooks/useGame';
import React, { useEffect, useMemo, useState } from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import { generateKey } from 'Scripts/keyHelper';
import { AppCarOrientations, AppTileIndices, GameState, GameTileMatrix, GameTileProperties, GameVehicle, VehicleColors, VehicleSizes } from 'Types/gameTypes';

const MapCreator = () => {

	const gameState: GameState = useSelector((state: RootStateOrAny) => state.gameReducer);

	const [ shouldPlacePlayerCar, setShouldPlacePlayerCar ] = useState<boolean>(false);

	const [ vehicleCount, setVehicleCount ] = useState<number>(0);

	const {
		selectedTile,
		gameAppTiles,
		placementLength,
		placementDirection,
	} = gameState;

	const {
		importString,
		exportString,
	} = useGame();

	const {
		removeVehicleFromSelectedTile,
		setPlacementDirection,
		setPlacementLength,
		addVehicle,
		createGame,
		setGridTiles,
	} = useAppTiles();

	const {
		setCreatorModeEnabled
	} = useCreator();

	const createVehicle = () => {

		if(Boolean(selectedTile)) {

			const newVehicle: GameVehicle = {
				orientation: placementDirection,
				size: placementLength,
				isPlayerCar: shouldPlacePlayerCar,
				key: generateKey(),
				color: shouldPlacePlayerCar ? VehicleColors.X : VehicleColors[AppTileIndices[vehicleCount]],
				xPosition: Number(selectedTile?.xPosition),
				yPosition: Number(selectedTile?.yPosition),
			}

			addVehicle(newVehicle);

			setVehicleCount(count => count + 1);
		}
	}

	const removeVehicle = () => {

		removeVehicleFromSelectedTile();

		setVehicleCount(count => count - 1);
	}

	const logGameString = () => {

		const text = exportString(gameAppTiles);

		console.log(text);
	}

	const convertImport = (text: string) => {

		try {

			const grid : GameTileMatrix<GameTileProperties> = importString(text);

			setGridTiles(grid);

		} catch (error) {

			console.warn(error)
		}
	}

	const generateGrid = () => {

		createGame({
			gridSize: 6,
			vehicles: []
		})
	}

	useEffect(() => {

		window['importString'] = convertImport;

	}, [])

	const canPlaceTiles = useMemo(() => {

		if (!selectedTile) {

			return false;
		}

		if (placementDirection === AppCarOrientations.Horizontal) {

			for (let xIndex = Number(selectedTile?.xPosition); xIndex <= Number(selectedTile?.xPosition) + placementLength - 1; xIndex++) {

				if (Boolean(gameAppTiles[selectedTile.yPosition][xIndex].vehicle)) {

					return true;
				}
			}
		}

		if (placementDirection === AppCarOrientations.Vertical) {

			for (let yIndex = Number(selectedTile?.yPosition); yIndex <= Number(selectedTile?.yPosition) + placementLength - 1; yIndex++) {

				if (Boolean(gameAppTiles[yIndex][selectedTile.xPosition].vehicle)) {

					return true;
				}
			}
		}

		return false;

	}, [
		selectedTile?.vehicle,
		selectedTile?.xPosition,
		selectedTile?.yPosition,
	])

	const tileHasVehicle = useMemo(() => {

		return selectedTile?.vehicle

	}, [selectedTile?.vehicle, selectedTile?.xPosition, selectedTile?.yPosition])

	return (
		<Box
			height="auto"
			m={.5}>
			<Paper style={{height: '100%'}}>
				<Box p={3}>
					<Typography
						variant="h4"
						pb={2}>
						Editor
					</Typography>
					<Typography pb={2}>
						Orientation ({AppCarOrientations[placementDirection]})
					</Typography>
					<Box>
						<ToggleButtonGroup
							value={placementDirection}
							exclusive
							fullWidth
							onChange={(_, value) => value !== null && setPlacementDirection(value)}>
							<ToggleButton size="small" value={AppCarOrientations.Horizontal}>
								{AppCarOrientations[AppCarOrientations.Horizontal]}
							</ToggleButton>
							<ToggleButton size="small" value={AppCarOrientations.Vertical}>
								{AppCarOrientations[AppCarOrientations.Vertical]}
							</ToggleButton>
						</ToggleButtonGroup>
					</Box>
					<Typography py={2}>
						Selected length ({placementLength})
					</Typography>
					<Box>
						<ToggleButtonGroup
							value={placementLength}
							exclusive
							fullWidth
							onChange={(_, value) => value !== null && setPlacementLength(value)}>
							<ToggleButton size="small" value={VehicleSizes.Small}>
								{VehicleSizes.Small}
							</ToggleButton>
							<ToggleButton size="small" value={VehicleSizes.Medium}>
								{VehicleSizes.Medium}
							</ToggleButton>
							<ToggleButton size="small" value={VehicleSizes.Large}>
								{VehicleSizes.Large}
							</ToggleButton>
						</ToggleButtonGroup>
					</Box>
					<Typography py={2}>
						Place player car ({shouldPlacePlayerCar ? 'Yes' : 'No'})
					</Typography>
					<Box>
						<ToggleButtonGroup
							value={shouldPlacePlayerCar}
							exclusive
							fullWidth
							onChange={(_, value) => value !== null && setShouldPlacePlayerCar(value)}>
							<ToggleButton size="small" value={true}>
								Yes
							</ToggleButton>
							<ToggleButton size="small" value={false}>
								No
							</ToggleButton>
						</ToggleButtonGroup>
					</Box>
					<Typography py={2}>
						Selected tile
					</Typography>
					{selectedTile && <>
						<Box textAlign="center">
							<Typography
								variant="h4">
								{AppTileIndices[selectedTile.xPosition]}:{AppTileIndices[selectedTile.yPosition]}
							</Typography>
						</Box>
						<Grid
							container
							spacing={2}
							my={1}>
							<Grid
								item
								xs>
								{tileHasVehicle && <Button
									startIcon={<DeleteIcon />}
									onClick={() => removeVehicle()}
									fullWidth
									color="error"
									variant="contained">
									Remove vehicle
								</Button>}
								{!tileHasVehicle && <Button
									startIcon={<AddIcon />}
									onClick={() => createVehicle()}
									fullWidth
									color="success"
									disabled={canPlaceTiles}
									variant="contained">
									Place vehicle
								</Button>}
							</Grid>
						</Grid>
					</>}
					<Grid
						container
						spacing={2}
						my={1}>
						<Grid
							item
							xs>
							<Button
								startIcon={<TextsmsIcon />}
								onClick={() => logGameString()}
								fullWidth
								variant="contained">
								Log game string
							</Button>
						</Grid>
					</Grid>
					<Grid
						container
						spacing={2}
						my={1}>
						<Grid
							item
							xs>
							<Button
								startIcon={<ViewComfyIcon />}
								onClick={() => generateGrid()}
								fullWidth
								variant="contained">
								Generate grid
							</Button>
						</Grid>
					</Grid>
					<Grid
						container
						spacing={2}
						my={1}>
						<Grid
							item
							xs>
							<Button
								startIcon={<ViewComfyIcon />}
								onClick={() => setCreatorModeEnabled(false)}
								fullWidth
								variant="contained">
								Play
							</Button>
						</Grid>
					</Grid>
				</Box>
			</Paper>
		</Box>
	)
}

export default MapCreator;