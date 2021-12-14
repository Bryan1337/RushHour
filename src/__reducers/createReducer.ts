import { AnyAction } from 'redux';
import { CreateState } from 'Types/createTypes';



export const initialCreateState: CreateState = {
	creatorModeEnabled: true,
}

// ADd creatortiles
export const createReducer = (state: CreateState = initialCreateState, action: AnyAction) => {
	switch (action.type) {
		case 'SET_CREATOR_MODE_ENABLED': {
			return {
				...state,
				creatorModeEnabled: action.isEnabled,
			}
		}

		default:
			return state
	}
}
