import { combineReducers } from 'redux';
import { createReducer } from './createReducer';
import { gameReducer } from './gameReducer';

export default combineReducers({
	gameReducer,
	createReducer,
})