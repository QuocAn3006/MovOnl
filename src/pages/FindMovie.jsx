import axios from 'axios';
import MovieCard from '../components/movies/MovieCard';
import { useEffect, useState } from 'react';

const FindMovie = () => {
	const searchParams = new URLSearchParams(window.location.search).get('q');
	const [data, setData] = useState([]);
	const [images, setImages] = useState([]);
	const [src, setSrc] = useState('');
	console.log(searchParams);
	const fetchSearchMovies = async () => {
		const res = await axios.get(`/tim-kiem?keyword=${searchParams}`);
		console.log(res?.data);
		setData(res?.data?.data?.items);
		setImages(res?.data?.data?.seoOnPage?.og_image);
		setSrc(res?.data?.data?.APP_DOMAIN_CDN_IMAGE);
	};

	useEffect(() => {
		fetchSearchMovies();
	}, [searchParams]);
	console.log(data);

	return (
		<div className='mx-auto max-w-7xl px-5'>
			<h2 className='pt-20 capitalize text-3xl font-bold mb-6 md:text-4xl'>
				<span className='text-primary pr-2'>Tìm kiếm phim:</span>
				{searchParams}
			</h2>
			{data?.length > 0 ? (
				<>
					<div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4'>
						{data?.map(movie => (
							<MovieCard
								movies={movie}
								key={movie?._id}
								images={images}
								pathImage={src}
							/>
						))}
					</div>
				</>
			) : (
				<h5 className='font-bold text-2xl text-center min-h-screen'>
					Không tìm thấy phim phù hợp
				</h5>
			)}
		</div>
	);
};

export default FindMovie;
