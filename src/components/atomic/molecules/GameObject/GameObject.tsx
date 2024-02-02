import { Box } from '@mui/system';
import PlayerVehicle from 'Components/atomic/atoms/PlayerVehicle/PlayerVehicle';
import Vehicle from 'Components/atomic/atoms/Vehicle/Vehicle';
import Wall from 'Components/atomic/atoms/Wall/Wall';
import { GameObject, GameObjectTypes } from 'Types/gameTypes';
import React from 'react';
import useStyles from './Styles';

interface Props {
	gameObject: GameObject;
	isSelected: Boolean;
	onClick: (gameObject: GameObject) => void;
}

export const OBJECT_ID_PREFIX = "object_id";

const GameObject = ({ gameObject, isSelected, onClick }: Props) => {

	const classes = useStyles({ gameObject, isSelected });

	return (
		<Box className={classes.objectContainer}>
			<Box
				className={classes.objectBox}
				id={`${OBJECT_ID_PREFIX}_${gameObject.key}`}
				onClick={() => onClick(gameObject)}>
				<Box className={classes.object} >
					{gameObject.type === GameObjectTypes.Player && <PlayerVehicle />}
					{gameObject.type === GameObjectTypes.Vehicle && <Vehicle />}
					{gameObject.type === GameObjectTypes.Wall && <Wall />}
				</Box>
			</Box>
		</Box>
	)
}

export default GameObject;