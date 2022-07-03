import LevelSelection from 'Components/app/level_selection/LevelSelection';
import React from 'react';
import { Route } from 'react-router-dom';
import { Pages } from 'Types/pageTypes';
import EditorPage from '../pages/editor/EditorPage';
import PlayLevelPage from '../pages/play_level/PlayLevelPage';

const MainRoutes = () => {
	return (
		<>
			<Route path={Pages.Editor}>
				<EditorPage />
			</Route>
			<Route path={Pages.LevelSelection}>
				<LevelSelection />
			</Route>
			<Route path={Pages.PlayLevel}>
				<PlayLevelPage />
			</Route>
		</>
	);
};

export default MainRoutes;