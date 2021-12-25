import { LevelData } from './../components/app/level_selection/LevelSelection';
export enum GameObjectSizes {
	Tiny = 1,
	Small = 2,
	Medium = 3,
	Large = 4,
}

export enum GameObjectTypes {
	Player,
	Default,
	Wall,
}
export interface GameVehicle extends GameObject {
	orientation: AppCarOrientations;
	size: GameObjectSizes;
	type?: GameObjectTypes;
	color?: string;
}

export enum TileDimensions {
	x = 'xPosition',
	y ='yPosition',
}

export interface GameTileCoordinate {
	xPosition: number;
	yPosition: number;
}

export interface GameTileProperties extends GameTileCoordinate {
	isWinTile: boolean;
}

export interface GameObject extends GameTileCoordinate {
	key: string;
	type: GameObjectTypes;
}

export enum AppCarOrientations {
	Horizontal,
	Vertical,
}
export interface GameTileMatrix<T> {
	[xKey: number | string]: {
		[yKey: number | string]: T;
	}
}

export interface CreateGameProperties {
	gridSize: number;
	vehicles: Array<GameVehicle>;
	walls?: Array<GameObject>;
}

export interface MoveTurn {
	vehicle: GameVehicle;
	toX: number;
	toY: number;
}

export enum VehicleColors {
	A = '#8FCB83',
	B = '#F08535',
	C = '#26BCEF',
	D = '#F07EA2',
	E = '#6763AD',
	F = '#0F986C',
	G = '#D8D9DB',
	H = '#FBE6BB',
	I = '#FEF457',
	J = '#906555',
	K = '#8A8D0A',
	L = '#F7D305',
	M = '#A37FBC',
	N = '#097EC1',
	O = '#0CB098',
	P = '#FFF5C5',
	Q = '#9D747A',
	X = '#EE2128',
}

export enum AppTileIndices {
	A,
	B,
	C,
	D,
	E,
	F,
	G,
	H,
	I,
	J,
	K,
	L,
	M,
	N,
	O,
	P,
	Q,
	R,
	S,
	T,
	U,
	V,
	W,
	X,
	Y,
	Z,
}

export interface GameState {
	gridSize: number;
	gameAppTiles: GameTileMatrix<GameTileProperties>;
	selectedVehicle: GameVehicle | null;
	selectedTile: GameTileProperties | null;
	placementDirection: AppCarOrientations;
	placementLength: number;
	placementType: GameObjectTypes;
	moveCounter: number;
	turnQueue: Array<MoveTurn>;
	vehicles: Array<GameVehicle>;
	levelData: LevelData | null;
	undoQueue: Array<Array<GameVehicle>>; // use creategameprops
	redoQueue: Array<Array<GameVehicle>>;
	walls: Array<GameObject>;
}