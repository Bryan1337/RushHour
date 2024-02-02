import { Box } from '@mui/system';
import AppTooltip from 'Components/atomic/atoms/Tooltip/AppTooltip';
import { GameObject, GameObjectTypes, GameState, GameTileCoordinate } from 'Types/gameTypes';
import { RouteParams } from 'Types/pageTypes';
import React, { useEffect, useRef } from 'react';
import { RootStateOrAny, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import useStyles from './Styles';

interface WinTileProperties {
	tileProperties: GameTileCoordinate
}

const WinTile = ({
	tileProperties
}: WinTileProperties) => {

	const classes = useStyles();

	const winTileRef = useRef<HTMLDivElement>(null);

	const gameObjects = useSelector((state: RootStateOrAny) => (state.gameReducer as GameState).gameObjects);

	const hasReachedFinish = () => {

		const { yPosition, xPosition } = tileProperties;

		const playerObjectCoordinate = Object.keys(gameObjects).find((coordinate) => {

			const gameObject = gameObjects[coordinate];

			return gameObject.type === GameObjectTypes.Player;

		}) as string;

		const playerObject = gameObjects[playerObjectCoordinate] as GameObject;

		if (Boolean(playerObject)) {

			const playerVehicleIsAdjacentToFinish = (
				playerObject.xPosition === (xPosition - Number(playerObject.size)) &&
				playerObject.yPosition === yPosition
			)

			return playerVehicleIsAdjacentToFinish;
		}

		return false;
	}

	const {
		levelId
	} = useParams() as RouteParams;

	const addWinToLocalStorage = () => {

		const level = Number(levelId) + 1;

		const wins = localStorage.getItem('completedLevels') || '[]';

		const winsArray = JSON.parse(wins);

		const levelIsAlreadyCompleted = winsArray.includes(level);

		if (!levelIsAlreadyCompleted) {

			winsArray.push(level);

			localStorage.setItem('completedLevels', JSON.stringify(winsArray));
		}
	}

	const levelIsComplete = hasReachedFinish();

	useEffect(() => {

		if (levelIsComplete) {

			addWinToLocalStorage()
		}

	}, [levelIsComplete])

	return (

		<AppTooltip title="Finish" placement="top">
			<Box
				ref={winTileRef}
				position="relative">
				🏁
				{levelIsComplete && <Box className={classes.finishReached}>
					✔️
				</Box>}

			</Box>
			{/* <Confetti
				width={window.innerWidth}
				height={window.innerHeight}
				run={playConfetti}
				numberOfPieces={25}
				recycle={false}
				onConfettiComplete={() => setPlayConfetti(false)}
				confettiSource={{
					x: winTileRef.current?.offsetLeft || 0,
					y: winTileRef.current?.offsetTop || 0,
					w: winTileRef.current?.offsetWidth || 0,
					h: winTileRef.current?.offsetHeight || 0,
				}}
			/> */}
		</AppTooltip>
	);
};

export default WinTile;