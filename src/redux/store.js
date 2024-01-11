import { combineReducers, configureStore } from '@reduxjs/toolkit';
import favMovieReducer from './slide/favMovieSlide';
import storage from 'redux-persist/lib/storage';
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER
} from 'redux-persist';
const persistConfig = {
	key: 'root',
	storage
};
const rootReducer = combineReducers({
	favMovies: favMovieReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
	reducer: persistedReducer,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [
					FLUSH,
					REHYDRATE,
					PAUSE,
					PERSIST,
					PURGE,
					REGISTER
				]
			}
		})
});

export let persistor = persistStore(store);
