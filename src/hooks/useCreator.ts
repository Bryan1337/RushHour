import * as createActions from 'Actions/createActions';
import { useDispatch } from 'react-redux';

export const useCreator = () => {

	const dispatch = useDispatch();

	const setCreatorModeEnabled = (isEnabled: boolean) => {

		dispatch(createActions.setCreatorModeEnabled(isEnabled));
	}

	return {
		setCreatorModeEnabled,
	}
}