import { useState } from 'react';
import { CreateGameProperties, MoveTurn } from 'Types/gameTypes';
import Worker from 'Workers/solver.worker';

export const useSolverWorker = () => {

	const [ isSolving, setIsSolving ] = useState<Boolean>(false);

	const solveGame = (game: CreateGameProperties) : Promise<Array<MoveTurn>> => {

		setIsSolving(true);

		return new Promise((resolve, reject) => {

			const timeoutMs = 15000;

			const startTime = new Date();

			const timeout = setTimeout(() => {

				clearTimeout(timeout);

				setIsSolving(false);

				reject({ error: `It's taking over ${timeoutMs*.001} seconds to complete the request. Aborting.`});

			}, timeoutMs)

			const newWorker = new Worker();

			newWorker.postMessage(game);

			newWorker.onmessage = (e: MessageEvent) => {

				const turns = e.data as Array<MoveTurn>;

				clearTimeout(timeout);

				const endTime = new Date();

				console.log(`Worker solved game in ${endTime.getTime() - startTime.getTime()}ms.`);

				setIsSolving(false);

				resolve(turns);
			}
		})
	}

	return {
		solveGame,
		isSolving,
	}
}