import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import MovieCard from '../components/movies/MovieCard';
import { Icon } from '@iconify/react';

const UpcomingMoviePage = () => {
	const [movies, setMovies] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);

	const movieListRef = useRef(null);
	const fetchMovie = async page => {
		const res = await axios.get(
			`v1/api/danh-sach/phim-sap-chieu?page=${page}`
		);

		setMovies(res.data);
	};
	const handlePageChange = newPage => {
		setCurrentPage(newPage);
		fetchMovie(newPage);
	};

	useEffect(() => {
		fetchMovie(currentPage);
	}, [currentPage]);
	useEffect(() => {
		if (movieListRef.current) {
			movieListRef.current.scrollIntoView({
				behavior: 'smooth',
				block: 'start'
			});
		}
	}, [currentPage]);
	return (
		<>
			<div className='pt-20'></div>
			<div
				className='mx-auto max-w-7xl px-5'
				ref={movieListRef}
			>
				<h2 className='capitalize text-3xl font-bold mb-6 md:text-4xl'>
					{movies?.data?.titlePage}
				</h2>

				<div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4'>
					{movies?.data?.items?.map(item => (
						<div key={item._id}>
							<MovieCard
								item={item}
								pathImage={
									'https://img.hiephanhthienha.com/uploads/movies/'
								}
							/>
						</div>
					))}
				</div>
			</div>
			<ul className='flex mt-20 font-medium justify-center cursor-pointer'>
				{currentPage !== 1 && (
					<div
						onClick={() => handlePageChange(currentPage - 1)}
						className='px-2 py-1.5 flex items-center justify-center text-white border border-collapse duration-300 border-r-0 hover:bg-primary hover:text-black hover:border-primary'
					>
						<Icon
							icon='icon-park-outline:left'
							height={24}
						/>
					</div>
				)}

				{new Array(5).fill('').map((_, idx) => {
					const page = currentPage + idx - 2;
					return (
						<div
							className='flex'
							key={idx}
						>
							{page > 0 &&
								page <=
									movies?.data?.params?.pagination
										?.totalItems && (
									<div
										onClick={() => handlePageChange(page)}
										className={`px-4 py-1.5 border border-r-0 border-collapse duration-300 hover:bg-primary hover:text-black hover:border-primary ${
											movies?.data?.params?.pagination
												.currentPage === page
												? 'bg-primary text-black border-primary'
												: ''
										}`}
									>
										{page}
									</div>
								)}
						</div>
					);
				})}

				{movies?.data?.params?.pagination?.currentPage !==
					movies?.pagination?.totalPages && (
					<div
						onClick={() => handlePageChange(currentPage + 1)}
						className='px-2 py-1.5 items-center justify-center text-white border border-collapse duration-300 hover:bg-primary hover:text-black hover:border-primary'
					>
						<Icon
							icon='icon-park-outline:right'
							height={24}
						/>
					</div>
				)}
			</ul>
		</>
	);
};

export default UpcomingMoviePage;
