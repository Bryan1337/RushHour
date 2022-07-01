import LevelSelection from 'Components/app/level_selection/LevelSelection';
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Pages } from 'Types/pageTypes';
import EditorPage from '../pages/editor/EditorPage';
import MainPage from '../pages/main/MainPage';
import PlayLevelPage from '../pages/play_level/PlayLevelPage';

const MainRoutes = () => {
	return (
		<BrowserRouter>
			<Route path={Pages.Index}>
				<MainPage />
			</Route>
			<Route path={Pages.Editor}>
				<EditorPage />
			</Route>
			<Route path={Pages.LevelSelection}>
				<LevelSelection />
			</Route>
			<Route path={Pages.PlayLevel}>
				<PlayLevelPage />
			</Route>
		</BrowserRouter>
	);
};

export default MainRoutes;