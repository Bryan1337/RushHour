export enum VehicleSizes {
	Small = 2,
	Medium = 3,
	Large = 4,
}
export interface GameVehicle extends GameTileCoordinate {
	orientation: AppCarOrientations;
	size: VehicleSizes;
	key: string;
	isPlayerCar?: boolean;
	color?: string;
}

export interface GameTileCoordinate {
	xPosition: number;
	yPosition: number;
}

export interface GameTileProperties extends GameTileCoordinate {
	vehicle: GameVehicle | null;
	isWinTile: boolean;
	isSelected: boolean;
}

export enum AppCarOrientations {
	Horizontal,
	Vertical,
}
export interface GameTileMatrix<T> {
	[xKey: number]: {
		[yKey: number]: T;
	}
}

export interface CreateGameProperties {
	gridSize: number;
	vehicles: Array<GameVehicle>
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
	moveCounter: number;
	undoQueue: Array<GameTileMatrix<GameTileProperties>>;
	redoQueue: Array<GameTileMatrix<GameTileProperties>>;
	turnQueue: Array<MoveTurn>;
	vehicles: Array<GameVehicle>;
}