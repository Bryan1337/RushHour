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

export type WallKey = "_";

export type PlayerVehicleKey = "X";

export enum GameObjectKeys {
	Player = "X",
	Wall = "_",
	Separator = ":",
	EmptyTile = ".",
}

export type VehicleKey =
	"A" |
	"B" |
	"C" |
	"D" |
	"E" |
	"F" |
	"G" |
	"H" |
	"I" |
	"J" |
	"K" |
	"L" |
	"M" |
	"N" |
	"O" |
	"P" |
	"Q" |
	"R" |
	"S" |
	"T" |
	"U" |
	"V" |
	"W" |
	PlayerVehicleKey;


export type GameObjectKey = VehicleKey | WallKey | PlayerVehicleKey;

export interface GameObject extends GameTileCoordinate {
	size: GameObjectSizes;
	orientation: AppCarOrientations;
	key: string;
	type?: GameObjectTypes;
	color?: string;
}

export interface GameObjectMap {
	[tileKey: string]: GameObject;
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

export interface GameTileMatrix2<T> {
	[tileKey: string]: T
}

export interface CreateGameProperties {
	gridSize: number;
	gameObjects: GameObjectMap;
}

export interface MoveTurn {
	gameObject: GameObject;
	fromX: number;
	fromY: number;
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
	gameTiles: {
		[tileKey: string]: GameTileCoordinate;
	};
	selectedObject: GameObject | null;
	selectedTile: GameTileCoordinate | null;
	placementDirection: AppCarOrientations;
	placementLength: number;
	placementType: GameObjectTypes;
	turnQueue: Array<MoveTurn>;
	gameObjects: GameObjectMap,
	levelData: LevelData | {};
	undoQueue: Array<MoveTurn>;
	redoQueue: Array<MoveTurn>;
}