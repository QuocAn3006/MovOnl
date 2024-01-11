import HomePage from '../pages/HomePage';
import NotFoundPage from '../pages/NotFoundPage';
import MoviePage from '../pages/MoviePage';
import FavouritePage from '../pages/FavouritePage';

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

	{ path: '*', page: NotFoundPage }
	// { title: 'Phim mới', path: 'phim-moi' },
	// { title: 'Phim bộ', path: 'phim-bo' },
	// { title: 'Phim lẻ', path: 'phim-le' },
	// { title: 'Phim Vietsub', path: 'phim-vietsub' },
	// { title: 'Phim thuyết minh', path: 'phim-thuyet-minh' },
	// { title: 'Phim lồng tiếng', path: 'phim-long-tieng' },
	// { title: 'Phim hoàn thành', path: 'phim-bo-hoan-thanh' },
	// { title: 'Phim đang chiếu', path: 'phim-bo-dang-chieu' },
	// { title: 'Phim độc quyền', path: 'subteam' },
	// { title: 'Phim hoạt hình', path: 'hoat-hinh' },
	// { title: 'Tìm kiếm', path: 'tim-kiem' }
];
