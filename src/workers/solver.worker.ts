import Solver from "Classes/solver/Solver";
import { CreateGameProperties } from "Types/gameTypes";

self.onmessage = (e: MessageEvent) => {

	const game = e.data as CreateGameProperties;

	const solver = new Solver(game);

	solver.solve();

	const turns = solver.getWinningTurns();

	self.postMessage(turns);
}