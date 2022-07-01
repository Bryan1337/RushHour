
export enum Pages {
	Index = '/',
	LevelSelection = '/levels',
	Editor = '/editor',
	PlayLevel = '/play/:levelId'
}

export enum PageParams {
	LevelId = ':levelId',
}

export interface RouteParams {
	levelId: string|undefined;
}