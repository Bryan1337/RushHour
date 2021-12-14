import { cloneDeep } from 'lodash';
import { AppCarOrientations, CreateGameProperties, GameTileCoordinate, GameTileMatrix, GameVehicle, MoveTurn } from 'Types/gameTypes';



export interface TraversalNode {
	turn?: MoveTurn;
	parentNode: TraversalNode | null;
	positions: Array<GameTileCoordinate>;
}
export interface NodeList {
	[hash: string]: TraversalNode
}

export default class Solver {

	public gridSize: number = 0;
	public solutionLength: number = 0;
	public maxQueueLength: number = 0;

	public vehicles: Array<GameVehicle> = [];
	public positions: Array<GameTileCoordinate> = [];
	public winningTurns: Array<MoveTurn>;
	public nodeQueue: Array<TraversalNode>;

	public nodes: NodeList = {};

	public rootNode: TraversalNode;


	constructor(game: CreateGameProperties) {

		const { gridSize, vehicles } = game;

		this.gridSize = gridSize;

		/* Expects player car to be index 0 */
		this.vehicles = vehicles.sort((a, b) => Number(b.isPlayerCar) - Number(a.isPlayerCar));

		this.positions = vehicles.map(vehicle => ({
			xPosition: vehicle.xPosition,
			yPosition: vehicle.yPosition,
		}));

		this.rootNode = {
			positions: this.positions,
			parentNode: null,
		}
	}

	private hasWinnerPath = (node: TraversalNode | null) => {

		if (!node) {

			return false;
		}

		const [playerVehicle] = this.vehicles;

		const [{ xPosition }] = node.positions;

		return (xPosition === this.gridSize - playerVehicle.size);
	}

	private printWinningSequence = (node: TraversalNode | null) => {

		this.solutionLength++;

		if (!node) {

			return;
		}

		this.printWinningSequence(node.parentNode)
		console.log("---------------");
		console.log(node.turn);
		console.log("---------------");
		this.printPosition(node);

		return;
	}

	// function that prints out a position/state in human readable form
	private printPosition = (node: TraversalNode) => {

		if (!node) {

			console.log("No node?")
			return
		}

		for (let yIndex = 0; yIndex < this.gridSize; yIndex++) {

			var line = "";

			for (let xIndex = 0; xIndex < this.gridSize; xIndex++) {

				let found = false;

				for (var vehicleIndex = 0; vehicleIndex < this.vehicles.length; vehicleIndex++) {

					var position: GameTileCoordinate = node.positions[vehicleIndex];

					const { yPosition, xPosition } = position;

					const vehicle = this.vehicles[vehicleIndex];

					if (vehicle.orientation == AppCarOrientations.Horizontal && yPosition === yIndex) { // is horizontal and on this row?

						if (xPosition + vehicle.size - 1 >= xIndex && xPosition <= xIndex) { // does it cover this cell?

							line = line + String.fromCharCode(vehicleIndex + 65); // put an alphabet character id for the car

							found = true;

							break;
						}
					}
					// same for vertical
					if (vehicle.orientation == AppCarOrientations.Vertical && xPosition === xIndex) {

						if (yPosition + vehicle.size - 1 >= yIndex && yPosition <= yIndex) {

							line = line + String.fromCharCode(vehicleIndex + 65);

							found = true;

							break;
						}
					}
				}

				if (!found) {

					line = line + "."
				}
			}
			if (yIndex == 2) {

				line = line + " -> exit"

			}

			console.log(line);
		}
	}



	// clone a node and link it to its parentNode
	private cloneNode = (node: TraversalNode): TraversalNode => {

		return {
			parentNode: node.parentNode,
			positions: cloneDeep(node.positions),
		}
	}

	// Check if node is isMarked (visited)
	private isMarked = (node: TraversalNode): boolean => {

		return Boolean(this.nodes[this.getNodeHash(node)]);
	}

	// Create a hash that id's node. Simply a string of all car positions in order.
	private getNodeHash = (node: TraversalNode) => {

		return (node.positions || []).map((position) => {

			const { yPosition, xPosition } = position;

			return `${yPosition}x${xPosition}-`;

		}).join('');
	}

	// Fills 2D matrix to make finding empty spaces easier
	private createSpaceMatrix = (node: TraversalNode | null) => {

		if (!node) {

			return false;
		}

		let matrix: GameTileMatrix<Number | null> = {}

		Array.from({ length: this.gridSize }).map((_, yIndex) => {

			matrix[yIndex] = {};

			Array.from({ length: this.gridSize }).map((_, xIndex) => {

				matrix[yIndex][xIndex] = null;
			})
		})

		// iterate over cells
		for (let yIndex = 0; yIndex < this.gridSize; yIndex++) {

			for (let xIndex = 0; xIndex < this.gridSize; xIndex++) {

				let found = false;

				for (var vehicleIndex = 0; vehicleIndex < this.vehicles.length; vehicleIndex++) {

					const vehicle = this.vehicles[vehicleIndex];

					var position: GameTileCoordinate = node.positions[vehicleIndex];

					const { yPosition, xPosition } = position;

					if (vehicle.orientation == AppCarOrientations.Horizontal && yPosition == yIndex) { // is horizontal and on this row?

						if (xPosition + vehicle.size - 1 >= xIndex && xPosition <= xIndex) { // does it cover this cell?

							matrix[yIndex][xIndex] = vehicleIndex;

							found = true;

							break;
						}
					}

					if (vehicle.orientation == AppCarOrientations.Vertical && xPosition == xIndex) { // is vertical and on this col?

						if (yPosition + vehicle.size - 1 >= yIndex && yPosition <= yIndex) { // does it cover this cell?

							matrix[yIndex][xIndex] = vehicleIndex;

							found = true;

							break;
						}
					}
				}

				if (!found) {

					matrix[yIndex][xIndex] = -1;
				}
			}
		}

		return matrix;
	}

	private getTurnsFromNode = (node: TraversalNode): Array<MoveTurn> => {

		const turns: Array<MoveTurn> = [];

		while (Boolean(node.parentNode)) {

			turns.push(node?.turn);

			node = node?.parentNode;

		}

		return turns;
	}

	public getWinningTurns = () => {

		return this.winningTurns;
	}

	public solve = () => {

		this.nodeQueue = [
			this.rootNode
		];

		while (this.nodeQueue.length > 0) {

			if (this.nodeQueue.length > this.maxQueueLength) {

				this.maxQueueLength = this.nodeQueue.length
			}

			const currentNode: TraversalNode = this.nodeQueue.pop();

			if (!currentNode) {

				return;
			}

			// is this a winning position?
			if (this.hasWinnerPath(currentNode)) {

				this.winningTurns = this.getTurnsFromNode(currentNode);

				this.printWinningSequence(currentNode)

				console.log("               ")
				console.log("---- Stats ----")
				console.log("Max Queue Length : " + this.maxQueueLength)
				console.log("Nodes Examined   : " + Object.keys(this.nodes).length)
				console.log("Solution Length  : " + this.solutionLength)

				return;
			}

			// find a child node (i.e: a car we can move)

			// this populates the 2D matrix so we can easily find empty spaces
			const matrix = this.createSpaceMatrix(currentNode);

			// iterate over vehicles and for each possible move create a node and put it in the Queue

			this.vehicles.forEach((vehicle: GameVehicle, index) => {

				const currentPosition: GameTileCoordinate | null = currentNode.positions[index];

				const { yPosition, xPosition } = currentPosition;

				if (Boolean(currentPosition) && vehicle.orientation == AppCarOrientations.Vertical) {  // it's vertically oriented
					// can we move it up?
					if (yPosition - 1 >= 0) { // there's no wall blocking

						if (matrix[yPosition - 1][xPosition] < 0) { // there's no car blocking

							// great! create new child node by cloning currentNode one and moving car up 1 square
							const newNode = this.cloneNode(currentNode);

							newNode.positions[index].yPosition--;

							// check if we already visited this node before putting in queue
							if (!this.isMarked(newNode)) {

								newNode.parentNode = currentNode;

								const turn: MoveTurn = {
									vehicle,
									toX: newNode.positions[index].xPosition,
									toY: newNode.positions[index].yPosition,
								}

								newNode.turn = turn;

								this.nodes[this.getNodeHash(newNode)] = newNode;

								this.nodeQueue.unshift(newNode) // queue it
							}
						}
					}
					// same thing but for downwards movement
					if (yPosition + vehicle.size < this.gridSize) {

						if (matrix[yPosition + vehicle.size][xPosition] < 0) {

							const newNode = this.cloneNode(currentNode);

							newNode.positions[index].yPosition++;

							if (!this.isMarked(newNode)) {

								newNode.parentNode = currentNode;

								const turn: MoveTurn = {
									vehicle,
									toX: newNode.positions[index].xPosition,
									toY: newNode.positions[index].yPosition,
								}

								newNode.turn = turn;

								this.nodes[this.getNodeHash(newNode)] = newNode;

								this.nodeQueue.unshift(newNode)
							}
						}
					}
				}
				// all over again but for horizontal vehicles
				else if (vehicle.orientation == AppCarOrientations.Horizontal) {

					if (xPosition - 1 >= 0) {

						if (matrix[yPosition][xPosition - 1] < 0) {

							const newNode = this.cloneNode(currentNode);

							newNode.positions[index].xPosition--;

							if (!this.isMarked(newNode)) {

								newNode.parentNode = currentNode;

								const turn: MoveTurn = {
									vehicle,
									toX: newNode.positions[index].xPosition,
									toY: newNode.positions[index].yPosition,
								}

								newNode.turn = turn;

								this.nodes[this.getNodeHash(newNode)] = newNode;

								this.nodeQueue.unshift(newNode)
							}
						}
					}

					if (xPosition + vehicle.size < this.gridSize) {

						if (matrix[yPosition][xPosition + vehicle.size] < 0) {

							const newNode = this.cloneNode(currentNode);

							newNode.positions[index].xPosition++;

							if (!this.isMarked(newNode)) {

								newNode.parentNode = currentNode;

								const turn: MoveTurn = {
									vehicle,
									toX: newNode.positions[index].xPosition,
									toY: newNode.positions[index].yPosition,
								}

								newNode.turn = turn;

								this.nodes[this.getNodeHash(newNode)] = newNode;

								this.nodeQueue.unshift(newNode)
							}
						}
					}
				}
			})
		}
	}
}