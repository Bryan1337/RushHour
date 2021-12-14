import { useEffect, useRef } from "react";

export const useInterval = (callback: () => void, delay: number | null) => {

	const savedCallback = useRef<null | (() => void)>();

	// Remember the latest function.
	useEffect(() => {

		savedCallback.current = callback;

	}, [callback]);

	// Set up the interval.
	useEffect(() => {

		const tick = () => {

			savedCallback.current();
		}

		if (delay !== null) {

			let id = setInterval(tick, delay);

			return () => clearInterval(id);
		}

	}, [delay]);
}