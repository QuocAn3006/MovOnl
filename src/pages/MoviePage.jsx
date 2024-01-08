/* eslint-disable no-mixed-spaces-and-tabs */
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Image from '../components/Image';
import { Icon } from '@iconify/react';

const MoviePage = () => {
	const { id } = useParams();
	const [src, setSrc] = useState('');
	const [selectedEpisode, setSelectedEpisode] = useState({});
	const [serverType, setServerType] = useState('art-player');
	const iframeRef = useRef(null);
	const fetchDetailMovie = async () => {
		const res = await axios.get(`/phim/${id}`);
		return res.data;
	};
	const queryMovieDetail = useQuery({
		queryKey: ['movieDetail'],
		queryFn: fetchDetailMovie
	});
	const { data: movieDetail } = queryMovieDetail;

	useEffect(() => {
		setSrc(
			movieDetail?.movie?.thumb_url
				? movieDetail?.movie?.thumb_url
				: movieDetail?.movie?.poster_url
		);
		if (
			!['Tập 0', 'Trailer'].includes(
				movieDetail?.movie?.episode_current
			) &&
			movieDetail?.episodes[0]?.server_data[0]?.name
		) {
			setSelectedEpisode(movieDetail?.episodes[0]?.server_data[0]);
		}
	}, []);
	useEffect(() => {
		fetchDetailMovie();
	}, [id]);
	useEffect(() => {
		if (!iframeRef.current) return;
		iframeRef.current.src += '';
	}, [serverType]);
	return (
		<>
			<div
				className='bg-cover w-full aspect-video relative bg-center lg:max-h-[800px]'
				style={{
					backgroundImage: `url(${
						movieDetail?.movie?.poster_url
							? movieDetail?.movie?.poster_url
							: movieDetail?.movie?.thumb_url
					})`
				}}
			>
				<div className='inset-0 bg-black/90 px-4 pb-10 pt-24 flex items-center lg:absolute'>
					<div className='w-full max-w-7xl mx-auto flex flex-col items-center gap-8 md:flex-row'>
						<Image
							src={src}
							alt={movieDetail?.movie?.name}
							className='aspect-[2/3] rounded w-full max-w-[300px]'
						/>
						<div className='w-full'>
							<h2 className='text-4xl font-extrabold lg:text-5xl'>
								{movieDetail?.movie?.name}
							</h2>
							<span className='text-primary font-bold'>
								{movieDetail?.movie?.origin_name}
							</span>
							<div className='font-medium flex flex-col gap-5 my-4 lg:flex-row lg:items-center'>
								<div className='flex items-center gap-2 text-xs font-bold'>
									<span className='bg-white px-2.5 py-1 text-black'>
										{movieDetail?.movie?.episode_current !==
										'Full'
											? '1'
											: 'Full'}
									</span>
									<span className='border-2 border-white px-2.5 py-0.5'>
										{movieDetail?.movie?.quality}
									</span>
								</div>
								<ul className='flex items-center flex-wrap gap-x-2 cursor-pointer'>
									{movieDetail?.movie?.category.map(
										(g, idx) => (
											<div
												key={g.id}
												className='hover:text-primary'
											>
												{g.name}
												{idx + 1 !==
												movieDetail?.movie?.category
													? ','
													: '.'}
											</div>
										)
									)}
								</ul>
							</div>
							<div className='flex items-center gap-5'>
								<span className='flex items-center gap-2'>
									<Icon
										icon='bx:calendar'
										className='text-primary'
										height={16}
									/>
									{movieDetail?.movie?.year}
								</span>
								<span className='flex items-center gap-2'>
									<Icon
										icon='akar-icons:clock'
										className='text-primary'
										height={16}
									/>
									{movieDetail?.movie?.time.replace(
										'undefined',
										'???'
									) || 'Đang cập nhật'}
								</span>
								<span className='flex items-center gap-2'>
									<Icon
										icon='tdesign:subtitle'
										className='text-primary'
										height={16}
									/>
									{movieDetail?.movie?.lang}
								</span>
							</div>
							<div className='flex items-center gap-5'>
								<span className='flex items-center gap-2'>
									<Icon
										icon='jam:movie'
										className='text-primary'
										height={16}
									/>
									{movieDetail?.movie?.episode_current ===
									'Full'
										? '1'
										: movieDetail?.movie?.episode_current.match(
												/\d+/
												// eslint-disable-next-line no-mixed-spaces-and-tabs
										  ) ?? 0}{' '}
									/
									{movieDetail?.movie?.episode_total ===
									'Full'
										? '1'
										: movieDetail?.movie?.episode_total}
								</span>
								<div className='flex items-center gap-2 my-2'>
									<Icon
										icon='grommet-icons:language'
										className='text-primary'
										height={16}
									/>
									<ul className='flex items-center gap-2'>
										{movieDetail?.movie?.country.map(
											(c, idx) => (
												<div
													className='hover:text-primary'
													key={c.id}
												>
													{c.name}
													{idx + 1 !==
													movieDetail?.movie?.country
														.length
														? ','
														: ''}
												</div>
											)
										)}
									</ul>
								</div>
							</div>
							<div
								dangerouslySetInnerHTML={{
									__html: movieDetail?.movie?.content
								}}
								className='text-sm'
							/>
							<div className='border border-white/5 bg-white/5 px-4 py-4 flex items-center w-max rounded-lg mt-8 gap-1.5 md:gap-5 md:px-7'>
								<button className='flex-col justify-center items-center gap-1 text-sm flex hover:text-primary'>
									<Icon
										icon='solar:share-bold'
										height={18}
									/>
									Share
								</button>
								<span className='h-12 w-0.5 bg-white/10 md:block'></span>
								<div className='flex items-center gap-3 text-sm font-bold'>
									<button className='rounded-full bg-primary text-black px-8 py-3 disabled:bg-zinc-600 disabled:hover:bg-zinc-600 disabled:text-white'>
										Trailer
									</button>

									<button className='bg-black/70 border-primary hover:bg-primary hover:text-black flex items-center gap-2 rounded-full border-2 px-5 py-2.5 duration-300'>
										<Icon
											icon={'solar:heart-linear'}
											height={20}
										/>
										Yêu thích
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			{selectedEpisode && (
				<div className='mx-auto max-w-7xl'>
					<div className='text-sm px-5'>
						{movieDetail?.episodes?.map(server => (
							<ul key={server?.server_name}>
								<p className='text-base font-bold mb-4 mt-8'>
									{server.server_name}
								</p>
								<li className='grid grid-cols-3 sm:grid-cols-5 md:grid-cols-8 lg:grid-cols-12 text-center gap-2'>
									{server?.server_data?.map(ep => (
										<button
											key={ep?.slug}
											onClick={() => {
												setSelectedEpisode(ep);
												iframeRef.current?.scrollIntoView(
													{
														behavior: 'smooth'
													}
												);
											}}
											className={`${
												selectedEpisode?.link_embed ===
												ep?.link_embed
													? 'bg-primary text-black'
													: 'bg-white/5'
											} rounded hover:bg-primary duration-200 py-1 hover:text-black `}
										>
											{ep?.name}
										</button>
									))}
								</li>
							</ul>
						))}
					</div>
					{selectedEpisode && (
						<div className='max-w-5xl mx-auto mt-16'>
							<div className='flex items-center justify-center gap-2'>
								<button
									className={`rounded px-4 py-0.5 ${
										serverType === 'art-player'
											? 'bg-blue-500'
											: 'bg-white/5'
									}`}
									onClick={() => setServerType('art-player')}
								>
									Server 1
								</button>
								<button
									className={`rounded px-4 py-0.5 ${
										serverType === 'plyr'
											? 'bg-blue-500'
											: 'bg-white/5'
									}`}
									onClick={() => setServerType('plyr')}
								>
									Server 2
								</button>
								<button
									className={`rounded px-4 py-0.5 ${
										serverType === 'videojs'
											? 'bg-blue-500'
											: 'bg-white/5'
									}`}
									onClick={() => setServerType('videojs')}
								>
									Server 3
								</button>
							</div>
							<p className='text-red-500 text-center text-sm mt-2 mb-5'>
								Vui lòng đổi server nếu không xem được
							</p>
							<iframe
								ref={iframeRef}
								className='w-full aspect-video overflow-hidden bg-stone-900'
								src={
									serverType === 'art-player'
										? selectedEpisode.link_embed
										: `https://www.hls-player.net/search?q=player${
												serverType === 'plyr'
													? '1'
													: '3'
										  }&video_links=${
												selectedEpisode.link_m3u8
										  }`
								}
								allowFullScreen
								referrerPolicy='no-referrer'
								sandbox={
									serverType === 'art-player'
										? undefined
										: 'allow-scripts'
								}
							></iframe>
						</div>
					)}
				</div>
			)}
			<div
				id='disqus_thread'
				className='max-w-5xl mx-auto my-16 px-5'
			></div>
			<script>
				{`
				(function() { // DON'T EDIT BELOW THIS LINE
					var d = document, s = d.createElement('script');
					s.src = 'https://movonl.disqus.com/embed.js';
					s.setAttribute('data-timestamp', +new Date());
					(d.head || d.body).appendChild(s);
					})();
				`}
			</script>
		</>
	);
};

export default MoviePage;
