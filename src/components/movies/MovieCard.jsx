/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom';
import Image from '../Image';

const MovieCard = props => {
	const { item, pathImage } = props;
	const navigate = useNavigate();
	const handleNavigate = id => {
		navigate(`/movie/${id}`);
	};

	return (
		<>
			<div className='select-none group cursor-pointer'>
				<div className='relative rounded-lg overflow-hidden'>
					<span className='absolute top-2.5 left-2.5 rounded z-20 px-2.5 py-0.5 text-xs text-black bg-primary font-bold'>
						0/1
					</span>
					<Image
						src={
							item.thumb_url
								? pathImage + item.thumb_url
								: pathImage + item.poster_url
						}
						alt={item.origin_name}
						className='aspect-[2/3]'
					/>

					<div className='absolute inset-0 bg-black/60 none flex-col items-center justify-center gap-4 text-sm font-bold opacity-0 group-hover:opacity-100 duration-300 text-center hidden md:flex'>
						<button
							className={`bg-primary text-black rounded-full w-36 px-6 py-2.5 -translate-y-3 group-hover:translate-y-0 duration-300`}
						>
							Yêu thích
						</button>
						<div
							onClick={() => handleNavigate(item.slug)}
							className='rounded-full border-2 bg- border-primary w-36 px-6 py-2.5 bg-black/70 translate-y-3 group-hover:translate-y-0 duration-300 hover:bg-primary hover:text-black'
						>
							Chi tiết
						</div>
					</div>
				</div>

				<h3 className='flex items-center justify-between my-1.5 gap-5 md:my-3'>
					<div
						className='hover:text-primary duration-150 text-lg font-bold truncate'
						onClick={() => handleNavigate(item.slug)}
					>
						<abbr
							title={item.name}
							className='no-underline'
						>
							{item.name}
						</abbr>
					</div>
					<span className='text-primary text-sm font-medium hidden md:block'>
						{item.year}
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
