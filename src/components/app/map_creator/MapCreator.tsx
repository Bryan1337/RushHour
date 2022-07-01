import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import TextsmsIcon from '@mui/icons-material/Textsms';
import ViewComfyIcon from '@mui/icons-material/ViewComfy';
import { Button, ButtonGroup, Grid, Paper, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useAppTiles } from 'Hooks/useAppTiles';
import { useCreator } from 'Hooks/useCreator';
import { useGame } from 'Hooks/useGame';
import { useGameObject } from 'Hooks/useGameObject';
import { usePlacement } from 'Hooks/usePlacement';
import React, { useEffect } from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import { AppCarOrientations, CreateGameProperties, GameObjectSizes, GameObjectTypes, GameState } from 'Types/gameTypes';

const MapCreator = () => {

	const {
		gridSize,
		gameTiles,
		gameObjects,
		selectedTile,
		placementLength,
		placementType,
		placementDirection,
	}: GameState = useSelector((state: RootStateOrAny) => state.gameReducer);

	const {
		importString,
		exportString,
	} = useGame();

	const {
		setPlacementDirection,
		setPlacementType,
		setPlacementLength,
		createGame,
		setGridSize,
	} = useAppTiles();

	const {
		isBlockedPlacementTile,
	} = usePlacement();

	const {
		setCreatorModeEnabled
	} = useCreator();

	const {
		getGameObject,
		removeGameObject,
		createObject,
	} = useGameObject();

	const logGameString = () => {

		const text = exportString(gridSize, gameObjects);

		console.log(text);
	}

	const convertImport = (text: string) => {

		try {

			const game = importString(text) as CreateGameProperties;

			createGame(game);

		} catch (error) {

			console.warn(error)
		}
	}

	const generateGrid = () => {

		createGame({
			gridSize,
			gameObjects: {}
		})
	}

	useEffect(() => {

		window['importString'] = convertImport;

	}, [])

	const canPlaceTiles = selectedTile && isBlockedPlacementTile(selectedTile!);

	const hasSelectedObject = selectedTile && getGameObject(selectedTile!);

	return (
		<Box
			height="auto"
			m={.5}>
			<Paper>
				<Box p={3}>
					<Typography
						variant="h4"
						pb={2}>
						Editor
					</Typography>
					<Typography pb={2}>
						Grid size ({gridSize})
					</Typography>
					<Box>
						<ButtonGroup size="small" fullWidth>
							<Button onClick={() => setGridSize(gridSize - 1)} variant="outlined">
								Decrease
							</Button>
							<Button onClick={() => setGridSize(gridSize + 1)} variant="outlined">
								Increase
							</Button>
						</ButtonGroup>
					</Box>
					<Typography py={2}>
						Vehicle orientation
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
						Object size
					</Typography>
					<Box>
						<ToggleButtonGroup
							value={placementLength}
							exclusive
							fullWidth
							onChange={(_, value) => value !== null && setPlacementLength(value)}>
							<ToggleButton
								size="small"
								disabled={GameObjectTypes.Wall !== placementType}
								value={GameObjectSizes.Tiny}>
								{GameObjectSizes.Tiny}
							</ToggleButton>
							<ToggleButton
								size="small"
								disabled={GameObjectTypes.Wall === placementType}
								value={GameObjectSizes.Small}>
								{GameObjectSizes.Small}
							</ToggleButton>
							<ToggleButton
								size="small"
								disabled={GameObjectTypes.Wall === placementType}
								value={GameObjectSizes.Medium}>
								{GameObjectSizes.Medium}
							</ToggleButton>
						</ToggleButtonGroup>
					</Box>
					<Typography py={2}>
						Object type
					</Typography>
					<Box>
						<ToggleButtonGroup
							value={placementType}
							exclusive
							fullWidth
							onChange={(e) => setPlacementType(Number(e.target?.value) as GameObjectTypes)}>
							<ToggleButton size="small" value={GameObjectTypes.Player}>
								Player
							</ToggleButton>
							<ToggleButton size="small" value={GameObjectTypes.Default}>
								Default
							</ToggleButton>
							<ToggleButton size="small" value={GameObjectTypes.Wall}>
								Wall
							</ToggleButton>
						</ToggleButtonGroup>
					</Box>
					<Typography py={2}>
						Selected tile
					</Typography>
					{selectedTile && <>
						<Box textAlign="center">
							<Typography
								variant="h5">
								{selectedTile.xPosition}:{selectedTile.yPosition}
							</Typography>
						</Box>
						<Grid
							container
							spacing={2}
							my={1}>
							<Grid
								item
								xs>
								{hasSelectedObject && <Button
									startIcon={<DeleteIcon />}
									onClick={() => removeGameObject(selectedTile)}
									fullWidth
									color="error"
									variant="contained">
									Remove
								</Button>}
								{!hasSelectedObject && <Button
									startIcon={<AddIcon />}
									onClick={() => createObject(selectedTile)}
									fullWidth
									color="success"
									disabled={Boolean(canPlaceTiles)}
									variant="contained">
									Place
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