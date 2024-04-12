/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom';
import Image from '../Image';
import { useDispatch, useSelector } from 'react-redux';
import { addFavMovies, removeFavMovies } from '../../redux/slide/favMovieSlide';
import { Icon } from '@iconify/react';

const MovieCard = props => {
	const { pathImage, movies } = props;
	const dispatch = useDispatch();

	const favMovies = useSelector(state => state.favMovies.favMovies);
	const isFavorite = favMovies.some(m => m.slug === movies.slug);
	const navigate = useNavigate();
	const handleNavigate = id => {
		navigate(`/movie/${id}`);
	};

	const handleFavorite = type => {
		const movieData = {
			slug: movies.slug,
			name: movies.name,
			thumb_url: `${pathImage}/uploads/movies/${movies?.thumb_url}`
		};
		switch (type) {
			case 'ADD':
				return dispatch(addFavMovies({ favMovie: movieData }));

			case 'REMOVE':
				return dispatch(removeFavMovies({ favMovie: movieData }));

			default:
				break;
		}
	};
	return (
		<>
			<div className='select-none group cursor-pointer'>
				<div className='relative rounded-lg overflow-hidden'>
					{isFavorite && (
						<Icon
							icon='ph:heart-fill'
							className='absolute top-2.5 right-2.5 z-20'
							color='red'
							height={28}
						/>
					)}
					<span className='absolute top-2.5 left-2.5 rounded z-20 px-2.5 py-0.5 text-xs text-black bg-primary font-bold'>
						0/1
					</span>

					<Image
						src={`${pathImage}/uploads/movies/${movies?.thumb_url}`}
						alt={movies}
						className='aspect-[2/3]'
					/>

					<div className='absolute inset-0 bg-black/60 none flex-col items-center justify-center gap-4 text-sm font-bold opacity-0 group-hover:opacity-100 duration-300 text-center hidden md:flex'>
						<button
							className={`bg-primary text-black rounded-full w-36 px-6 py-2.5 -translate-y-3 group-hover:translate-y-0 duration-300`}
							onClick={() =>
								handleFavorite(isFavorite ? 'REMOVE' : 'ADD')
							}
						>
							{isFavorite ? 'Bỏ Thích' : 'Yêu Thích'}
						</button>
						<div
							onClick={() => handleNavigate(movies.slug)}
							className='rounded-full border-2 bg- border-primary w-36 px-6 py-2.5 bg-black/70 translate-y-3 group-hover:translate-y-0 duration-300 hover:bg-primary hover:text-black'
						>
							Chi tiết
						</div>
					</div>
				</div>

				<h3 className='flex items-center justify-between my-1.5 gap-5 md:my-3'>
					<div
						className='hover:text-primary duration-150 text-lg font-bold truncate'
						onClick={() => handleNavigate(movies.slug)}
					>
						<abbr
							title={movies.name}
							className='no-underline'
						>
							{movies.name}
						</abbr>
					</div>
					<span className='text-primary text-sm font-medium hidden md:block'>
						{movies.year}
					</span>
				</h3>

				<div className='flex flex-col gap-1.5 justify-between text-xs md:items-center md:flex-row'>
					<div className='flex items-center gap-2'>
						<span className='border-2 border-white px-2 py-0.5'>
							<strong className='text-primary'>HD</strong>
						</span>
						<span className='bg-white px-2 py-1'>
							<strong className='text-black'>Vietsub</strong>
						</span>
					</div>
				</div>
			</div>
		</>
	);
};

export default MovieCard;
