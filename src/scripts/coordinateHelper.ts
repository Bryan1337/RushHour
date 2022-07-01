import { AppCarOrientations } from 'Types/gameTypes';
import { TileDimensions } from './../__types/gameTypes';

export const getExitYPosition = (gridSize: number) => {

	return Math.floor(gridSize / 2) - 1;
}

export const getDimension = (orientation: AppCarOrientations) : TileDimensions => {

	if(orientation === AppCarOrientations.Horizontal) {

		return TileDimensions.x;
	}

	if(orientation === AppCarOrientations.Vertical) {

		return TileDimensions.y;
	}

	throw new Error(`Wrong orientation defined (${orientation}`);
}

export const getCoordinateTileKey = (xPosition: number, yPosition: number) => {

	return `${xPosition}x${yPosition}`;
}