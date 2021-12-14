import { RootStateOrAny, useSelector } from 'react-redux';
import { GameTileProperties } from 'Types/gameTypes';
import { GameState } from './../__types/gameTypes';

export const useVehicle = () => {

	const {
		vehicles
	}: GameState = useSelector((state: RootStateOrAny) => state.gameReducer);

	const getVehicle = (tileProperties: GameTileProperties) => {

		const { xPosition, yPosition } = tileProperties;

		for(let index in vehicles) {

			const vehicle = vehicles[index];

			if((
				vehicle.xPosition === xPosition &&
				vehicle.yPosition === yPosition
			)) {

				return vehicle;
			}
		}

		return null;
	}

	return {
		getVehicle,
	}
}