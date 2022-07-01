import { cloneDeep } from 'lodash';
import { getExitYPosition } from 'Scripts/coordinateHelper';
import { AppCarOrientations, CreateGameProperties, GameObject, GameObjectTypes, GameTileCoordinate, GameTileMatrix, MoveTurn } from 'Types/gameTypes';

export interface TraversalNode {
	turn?: MoveTurn;
	parentNode: TraversalNode | null;
	positions: Array<GameTileCoordinate>;
}
export interface NodeList {
	[hash: string]: TraversalNode
}

export default class Solver {

	public debug = false;

	public gridSize: number = 0;
	public solutionLength: number = 0;
	public maxQueueLength: number = 0;

	public gameObjectList: Array<GameObject> = [];
	public walls: Array<GameObject> = [];
	public positions: Array<GameTileCoordinate> = [];
	public winningTurns: Array<MoveTurn>;
	public nodeQueue: Array<TraversalNode>;

	public nodes: NodeList = {};

	public rootNode: TraversalNode;

	constructor(game: CreateGameProperties) {

		const { gridSize, gameObjects } = game;

		this.gridSize = gridSize;

		const objectList = Object.keys(gameObjects).map((coordinate) => ({
			...gameObjects[coordinate]
		}))

		this.walls = objectList.filter((gameObject) => gameObject.type === GameObjectTypes.Wall);

		const gameObjectList = objectList.filter((gameObject) => gameObject.type !== GameObjectTypes.Wall);
		/* Expects player car to be index 0 */
		this.gameObjectList = gameObjectList.sort((a, b) => (
			Number(GameObjectTypes.Player === b.type) -
			Number(GameObjectTypes.Player === a.type)
		));

		this.positions = gameObjectList.map((gameObject: GameObject) => ({
			xPosition: gameObject.xPosition,
			yPosition: gameObject.yPosition,
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

		const [playerObject] = this.gameObjectList;

		const [{ xPosition }] = node.positions;

		return (xPosition === this.gridSize - playerObject.size);
	}

	private printWinningSequence = (node: TraversalNode | null) => {

		if (!node?.turn) {

			return;
		}

		this.solutionLength++;

		// this.printWinningSequence(node.parentNode)
		// console.log("---------------");
		// console.log(node?.turn);
		// console.log("---------------");
		// this.printPosition(node);

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

				for (var gameObjectIndex = 0; gameObjectIndex < this.gameObjectList.length; gameObjectIndex++) {

					var position: GameTileCoordinate = node.positions[gameObjectIndex];

					const { yPosition, xPosition } = position;

					const gameObject = this.gameObjectList[gameObjectIndex];

					if (gameObject.orientation == AppCarOrientations.Horizontal && yPosition === yIndex) { // is horizontal and on this row?

						if (xPosition + gameObject.size - 1 >= xIndex && xPosition <= xIndex) { // does it cover this cell?

							line = line + String.fromCharCode(gameObjectIndex + 65); // put an alphabet character id for the car

							found = true;

							break;
						}
					}
					// same for vertical
					if (gameObject.orientation == AppCarOrientations.Vertical && xPosition === xIndex) {

						if (yPosition + gameObject.size - 1 >= yIndex && yPosition <= yIndex) {

							line = line + String.fromCharCode(gameObjectIndex + 65);

							found = true;

							break;
						}
					}
				}

				if (!found) {

					line = line + "."
				}
			}
			if (yIndex === getExitYPosition(this.gridSize)) {

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
		// for (let yIndex = 0; yIndex < this.gridSize; yIndex++) {

			for (let xIndex = 0; xIndex < this.gridSize; xIndex++) {

				for (let yIndex = 0; yIndex < this.gridSize; yIndex++) {

				let found = false;

				for (let gameObjectIndex = 0; gameObjectIndex < this.gameObjectList.length; gameObjectIndex++) {

					const gameObject = this.gameObjectList[gameObjectIndex];

					var position: GameTileCoordinate = node.positions[gameObjectIndex];

					const { yPosition, xPosition } = position;

					if (gameObject.orientation == AppCarOrientations.Horizontal && yPosition == yIndex) { // is horizontal and on this row?

						if (xPosition + gameObject.size - 1 >= xIndex && xPosition <= xIndex) { // does it cover this cell?

							matrix[yIndex][xIndex] = gameObjectIndex;

							found = true;

							break;
						}
					}

					if (gameObject.orientation == AppCarOrientations.Vertical && xPosition == xIndex) { // is vertical and on this col?

						if (yPosition + gameObject.size - 1 >= yIndex && yPosition <= yIndex) { // does it cover this cell?

							matrix[yIndex][xIndex] = gameObjectIndex;

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

		for (let wallIndex = 0; wallIndex < this.walls.length; wallIndex++) {

			const wall = this.walls[wallIndex];

			const { yPosition, xPosition } = wall;

			matrix[yPosition][xPosition] = wallIndex + this.gameObjectList.length;
		}

		return matrix;
	}

	private getTurnsFromNode = (node: TraversalNode): Array<MoveTurn> => {

		const turns: Array<MoveTurn> = [];

		while (Boolean(node.parentNode)) {

			turns.push(node?.turn as MoveTurn);

			node = node?.parentNode as TraversalNode;
		}

		return turns;
	}

	public getWinningTurns = () => {

		return this.winningTurns;
	}

	/*
		We're not limited to moving less than 1 tile per turn.
		By simply remove turns from tiles in between
		For example: A -> B, B -> C, C -> D, could by simplified as A -> D
	*/
	public optimizeTurns = (turns: Array<MoveTurn>) => {

		const optimizedTurns: Array<MoveTurn> = [];

		turns.forEach((turn, index) => {

			const previousTurn = turns[index - 1];

			// find series of turns with same keys, only keep first and last

			if(!Boolean(index) || turn.gameObject.key !== previousTurn.gameObject.key) {

				optimizedTurns.push(turn);
			}
		})

		console.log({
			optimizedTurns
		})

		return optimizedTurns.reverse();
	}

	public solve = () => {

		this.nodeQueue = [
			this.rootNode
		];

		while (this.nodeQueue.length > 0) {

			if (this.nodeQueue.length > this.maxQueueLength) {

				this.maxQueueLength = this.nodeQueue.length
			}

			const currentNode: TraversalNode = this.nodeQueue.pop() as TraversalNode;

			if (!currentNode) {

				return;
			}

			// is this a winning position?
			if (this.hasWinnerPath(currentNode)) {

				const turns = this.getTurnsFromNode(currentNode);

				this.optimizeTurns(turns);
				this.winningTurns = turns.reverse();

				this.printWinningSequence(currentNode)

				if(this.debug) {

					console.log("               ")
					console.log("---- Stats ----")
					console.log("Max Queue Length : " + this.maxQueueLength)
					console.log("Nodes Examined   : " + Object.keys(this.nodes).length)
					console.log("Solution Length  : " + this.solutionLength)
				}


				return;
			}

			// find a child node (i.e: a car we can move)

			// this populates the 2D matrix so we can easily find empty spaces
			const matrix = this.createSpaceMatrix(currentNode);

			// iterate over gameObjects and for each possible move create a node and put it in the Queue

			this.gameObjectList.forEach((gameObject: GameObject, index) => {

				const currentPosition: GameTileCoordinate | null = currentNode.positions[index];

				const { yPosition, xPosition } = currentPosition;

				if (Boolean(currentPosition) && gameObject.orientation == AppCarOrientations.Vertical) {  // it's vertically oriented
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
									gameObject: {
										...gameObject,
										xPosition,
										yPosition,
									},
									fromX: xPosition,
									fromY: yPosition,
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
					if (yPosition + gameObject.size < this.gridSize) {

						if (matrix[yPosition + gameObject.size][xPosition] < 0) {

							const newNode = this.cloneNode(currentNode);

							newNode.positions[index].yPosition++;

							if (!this.isMarked(newNode)) {

								newNode.parentNode = currentNode;

								const turn: MoveTurn = {
									gameObject: {
										...gameObject,
										xPosition,
										yPosition,
									},
									fromX: xPosition,
									fromY: yPosition,
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
				// all over again but for horizontal gameObjects
				if (gameObject.orientation == AppCarOrientations.Horizontal) {

					if (xPosition - 1 >= 0) {

						if (matrix[yPosition][xPosition - 1] < 0) {

							const newNode = this.cloneNode(currentNode);

							newNode.positions[index].xPosition--;

							if (!this.isMarked(newNode)) {

								newNode.parentNode = currentNode;

								const turn: MoveTurn = {
									gameObject: {
										...gameObject,
										xPosition,
										yPosition,
									},
									fromX: xPosition,
									fromY: yPosition,
									toX: newNode.positions[index].xPosition,
									toY: newNode.positions[index].yPosition,
								}

								newNode.turn = turn;

								this.nodes[this.getNodeHash(newNode)] = newNode;

								this.nodeQueue.unshift(newNode)
							}
						}
					}

					if (xPosition + gameObject.size < this.gridSize) {

						if (matrix[yPosition][xPosition + gameObject.size] < 0) {

							const newNode = this.cloneNode(currentNode);

							newNode.positions[index].xPosition++;

							if (!this.isMarked(newNode)) {

								newNode.parentNode = currentNode;

								const turn: MoveTurn = {
									gameObject: {
										...gameObject,
										xPosition,
										yPosition,
									},
									fromX: xPosition,
									fromY: yPosition,
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