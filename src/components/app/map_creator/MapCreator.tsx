import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import TextsmsIcon from '@mui/icons-material/Textsms';
import ViewComfyIcon from '@mui/icons-material/ViewComfy';
import { Button, ButtonGroup, Grid, Paper, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { Box } from '@mui/system';
import { useAppTiles } from 'Hooks/useAppTiles';
import { useCreator } from 'Hooks/useCreator';
import { useGame } from 'Hooks/useGame';
import { useGameObject } from 'Hooks/useGameObject';
import { usePlacement } from 'Hooks/usePlacement';
import { AppCarOrientations, CreateGameProperties, GameObjectSizes, GameObjectTypes, GameState, GameTileCoordinate } from 'Types/gameTypes';
import React, { useEffect } from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';

const MapCreator = () => {

	const gridSize = useSelector((state: RootStateOrAny) => (state.gameReducer as GameState).gridSize);

	const gameObjects = useSelector((state: RootStateOrAny) => (state.gameReducer as GameState).gameObjects);

	const selectedTile = useSelector((state: RootStateOrAny) => (state.gameReducer as GameState).selectedTile);

	const placementLength = useSelector((state: RootStateOrAny) => (state.gameReducer as GameState).placementLength);

	const placementType = useSelector((state: RootStateOrAny) => (state.gameReducer as GameState).placementType);

	const placementDirection = useSelector((state: RootStateOrAny) => (state.gameReducer as GameState).placementDirection);

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
		setSelectedTile,
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

	enum KeyboardArrowKeys {
		ArrowDown = 'ArrowDown',
		ArrowUp = 'ArrowUp',
		ArrowLeft = 'ArrowLeft',
		ArrowRight = 'ArrowRight',
	}

	const handleKeyboardMove = (e: KeyboardEvent) => {

		if (!selectedTile) {
			return;
		}

		const { xPosition, yPosition } = selectedTile as GameTileCoordinate;

		switch (e.key) {
			case KeyboardArrowKeys.ArrowUp:
				setSelectedTile({
					xPosition,
					yPosition: yPosition - 1,
				});
				break;
			case KeyboardArrowKeys.ArrowDown:
				setSelectedTile({
					xPosition,
					yPosition: yPosition + 1,
				});
				break;
			case KeyboardArrowKeys.ArrowLeft:
				setSelectedTile({
					xPosition: xPosition - 1,
					yPosition,
				});
				break;
			case KeyboardArrowKeys.ArrowRight:
				setSelectedTile({
					xPosition: xPosition + 1,
					yPosition,
				});
				break;
		}
	}

	useEffect(() => {

		window.addEventListener("keydown", handleKeyboardMove);

		return () => {

			window.removeEventListener("keydown", handleKeyboardMove);
		}

	}, [selectedTile])


	return (
		<Box pr={3}>
			<Paper>
				<Box p={3}>
					<p
						variant="h5"
						pb={2}>
						Editor
					</p>
					<p pb={2}>
						Grid size ({gridSize})
					</p>
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
					<p py={2}>
						Vehicle orientation
					</p>
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
					<p py={2}>
						Object size
					</p>
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
					<p py={2}>
						Object type
					</p>
					<Box>
						<ToggleButtonGroup
							value={placementType}
							exclusive
							fullWidth
							onChange={(e) => setPlacementType(Number(e.target?.value) as GameObjectTypes)}>
							<ToggleButton size="small" value={GameObjectTypes.Player}>
								Player
							</ToggleButton>
							<ToggleButton size="small" value={GameObjectTypes.Vehicle}>
								Vehicle
							</ToggleButton>
							<ToggleButton size="small" value={GameObjectTypes.Wall}>
								Wall
							</ToggleButton>
						</ToggleButtonGroup>
					</Box>
					<p py={2}>
						Selected tile
					</p>
					{selectedTile && <>
						<Box textAlign="center">
							<p
								variant="h5">
								{selectedTile.xPosition}:{selectedTile.yPosition}
							</p>
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