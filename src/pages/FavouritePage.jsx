import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Image from '../components/Image';
import { useNavigate } from 'react-router-dom';
import { removeFavMovies } from '../redux/slide/favMovieSlide';

const FavouritePage = () => {
	const favMovies = useSelector(state => state.favMovies.favMovies);
	const [movies, setMovies] = useState([]);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleFavorite = slug => {
		const movieData = {
			slug: slug
		};
		const isFav = favMovies.some(m => m.slug === slug);
		if (isFav) {
			dispatch(removeFavMovies({ favMovie: movieData }));
		}
	};
	console.log(favMovies);
	useEffect(() => {
		setMovies(favMovies);
	}, [favMovies]);

	if (!movies.length) {
		return (
			<h5 className='font-bold text-2xl text-center min-h-screen relative top-24'>
				Chưa có phim yêu thích nào
			</h5>
		);
	}
	return (
		<div className='max-w-7xl mx-auto px-5 relative top-24 mb-24'>
			<h2 className=' capitalize text-3xl font-bold mb-6 md:text-4xl'>
				Yêu Thích
			</h2>
			<div className='grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 md:gap-x-6 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-14'>
				{movies.map(movie => (
					<div key={movie.slug}>
						<div className='relative rounded-lg overflow-hidden group'>
							<Icon
								icon='ph:heart-fill'
								className='absolute top-2.5 right-2.5'
								color='red'
								height={28}
							/>
							<Image
								src={movie.thumb_url}
								alt={movie.name}
								className='aspect-[2/3]'
							/>
							<div
								onClick={() => navigate(`/movie/${movie.slug}`)}
								className='absolute inset-0 z-10 md:hidden'
							/>
							<div className='absolute inset-0 bg-black/60 none flex-col items-center justify-center gap-4 text-sm font-bold opacity-0 group-hover:opacity-100 duration-300 text-center hidden md:flex'>
								<button
									onClick={() => {
										handleFavorite(movie.slug);
									}}
									className='rounded-full w-36 px-6 py-2.5 -translate-y-3 group-hover:translate-y-0 duration-300 bg-[#f00]'
								>
									Bỏ Thích
								</button>
								<div
									onClick={() =>
										navigate(`/movie/${movie.slug}`)
									}
									className='rounded-full border-2 bg- border-primary w-36 px-6 py-2.5 bg-black/70 translate-y-3 group-hover:translate-y-0 duration-300 hover:bg-primary hover:text-black'
								>
									Chi Tiết
								</div>
							</div>
						</div>
						<div
							onClick={() => navigate(`/movie/${movie.slug}`)}
							className='hover:text-primary duration-150 text-lg font-bold mt-1.5 block'
						>
							<abbr
								title={movie.name}
								className='no-underline line-clamp-2'
							>
								{movie.name}
							</abbr>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default FavouritePage;
