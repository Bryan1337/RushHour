import Vehicle from 'Components/entities/vehicle/Vehicle';
import Wall from 'Components/entities/wall/Wall';
import React from 'react';
import { GameObject, GameObjectTypes, GameVehicle } from 'Types/gameTypes';

interface GameObjectTileProperties {
	object: GameObject;
}

const GameObjectTile = ({ object }: GameObjectTileProperties) => {
	return (
		<>
			{object.type === GameObjectTypes.Wall && <Wall />}
			{object.type !== GameObjectTypes.Wall && <Vehicle vehicle={object as GameVehicle} />}
		</>
	);
};

export default GameObjectTile;