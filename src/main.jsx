import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import 'swiper/swiper-bundle.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient();
import { Provider } from 'react-redux';
import { persistor, store } from './redux/store.js';
import { PersistGate } from 'redux-persist/integration/react';
ReactDOM.createRoot(document.getElementById('root')).render(
	<QueryClientProvider client={queryClient}>
		<Provider store={store}>
			<PersistGate
				persistor={persistor}
				loading={null}
			>
				<App />
			</PersistGate>
		</Provider>
	</QueryClientProvider>
);
