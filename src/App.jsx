import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { routes } from './routes/index';
import { Fragment } from 'react';
import axios from 'axios';

import DefaultLayout from './Layouts/DefaultLayout';
function App() {
	axios.defaults.baseURL = import.meta.env.VITE_API_URL;
	return (
		<Router>
			<Routes>
				{routes.map(route => {
					const Page = route.page;
					let Layout = DefaultLayout;
					if (route?.layout) {
						Layout = route?.layout;
					} else if (route.layout === null) {
						Layout = Fragment;
					}
					return (
						<Route
							key={route.path}
							path={route.path}
							element={
								<Layout>
									<Page />
								</Layout>
							}
						/>
					);
				})}
			</Routes>
		</Router>
	);
}

export default App;
