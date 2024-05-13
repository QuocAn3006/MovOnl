import HomePage from '../pages/HomePage';
import NotFoundPage from '../pages/NotFoundPage';
import MoviePage from '../pages/MoviePage';
import FavouritePage from '../pages/FavouritePage';
import MovieType from '../pages/MovieType';
import GenresMoviePage from '../pages/GenresMoviePage';
import CountryMoviePage from '../pages/CountryMoviePage';
import UpcomingMoviePage from '../pages/UpcomingMoviePage';
import FindMovie from '../pages/FindMovie';

export const routes = [
	{
		path: '/',
		page: HomePage
	},

	{
		path: '/movie/:id',
		page: MoviePage
	},

	{
		path: '/favourite',
		page: FavouritePage
	},

	{
		path: '/loai-phim/:id',
		page: MovieType
	},
	{
		path: '/the-loai/:id',
		page: GenresMoviePage
	},

	{
		path: '/quoc-gia/:id',
		page: CountryMoviePage
	},

	{
		path: '/phim-sap-chieu',
		page: UpcomingMoviePage
	},

	{
		path: '/tim-kiem',
		page: FindMovie
	},

	{ path: '*', page: NotFoundPage }
];
