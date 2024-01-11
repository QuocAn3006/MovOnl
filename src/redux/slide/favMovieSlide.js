import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	favMovies: []
};

export const favMovieSlide = createSlice({
	name: 'favMovie',
	initialState,
	reducers: {
		addFavMovies: (state, action) => {
			const { slug, name, thumb_url } = action.payload.favMovie;
			state.favMovies.push({ slug, name, thumb_url });
			localStorage.setItem('fav-movies', JSON.stringify(state.favMovies));
		},
		removeFavMovies: (state, action) => {
			const { slug } = action.payload.favMovie;
			state.favMovies = state.favMovies.filter(m => m.slug !== slug);
			localStorage.setItem('fav-movies', JSON.stringify(state.favMovies));
		}
	}
});
export const { addFavMovies, removeFavMovies } = favMovieSlide.actions;
export default favMovieSlide.reducer;
