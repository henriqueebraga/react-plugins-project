import PluginsContainer from '@/containers/PluginsContainer';
import NotFoundContainer from '@/containers/NotFoundContainer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const App = () => (
	<>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<PluginsContainer />}>
					<Route path="/:tab_id" element={<PluginsContainer />} />
				</Route>
				<Route path="*" element={<NotFoundContainer />} />
			</Routes>
		</BrowserRouter>
	</>
);

export default App;
