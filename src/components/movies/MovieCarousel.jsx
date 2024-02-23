/* eslint-disable react/prop-types */
import { SwiperSlide, Swiper } from 'swiper/react';
import { EffectFade, Autoplay } from 'swiper/modules';
import { Icon } from '@iconify/react';
import Image from '../Image';
import { useNavigate } from 'react-router-dom';
const MovieCarousel = props => {
	// eslint-disable-next-line react/prop-types
	const { movies } = props;
	const navigate = useNavigate();

	return (
		<Swiper
			modules={[EffectFade, Autoplay]}
			effect={'fade'}
			loop={true}
			autoplay={{
				delay: 5000,
				disableOnInteraction: false
			}}
		>
			{
				// eslint-disable-next-line react/prop-types
				movies?.items?.slice(0, 6)?.map(item => (
					<SwiperSlide key={item?._id}>
						<div
							className='bg-cover min-h-screen w-full relative bg-center max-h-[800px] lg:min-h-0 lg:aspect-video bg-black'
							style={{
								backgroundImage: `url(${
									// eslint-disable-next-line react/prop-types
									movies?.pathImage + item.thumb_url ||
									import.meta.env.VITE_CDN_IMAGE +
										item.thumb_url
								}
							)`
							}}
						>
							<div className='absolute inset-0 bg-black/80 md:bg-black/90 flex items-center'>
								<div className='w-full max-w-7xl px-4 mx-auto flex items-center justify-between gap-8'>
									<div>
										<h2 className='text-4xl lg:text-5xl font-extrabold leading-snug'>
											{item.name}
										</h2>
										<h3 className='text-primary font-bold md:text-lg'>
											{item.origin_name}
										</h3>
										<div className='font-medium flex flex-col gap-2.5 my-5 lg:my-10 lg:gap-5 lg:items-center lg:flex-row'>
											<div className='flex items-center gap-2 text-xs font-bold'>
												<span className='bg-white px-2.5 py-1 text-black'>
													{item?.year}
												</span>
												<span className='border-2 border-white px-2.5 py-0.5'>
													HD
												</span>
												<span className='flex item-center gap-2'>
													<Icon
														icon='grommet-icons:language'
														className='text-primary'
														height={16}
													/>
													Vietsub
												</span>
											</div>
										</div>
										<div
											onClick={() =>
												navigate(`/movie/${item.slug}`)
											}
											className='cursor-pointer border-2 gap-2 border-primary flex items-center px-8 py-4 rounded-full w-max hover:bg-primary duration-150 hover:text-black'
										>
											<Icon
												icon='ion:play'
												height={18}
											/>
											<span className='text-xs font-extrabold'>
												XEM NGAY
											</span>
										</div>
									</div>
									<Image
										src={`${
											movies?.pathImage +
												item.thumb_url ||
											import.meta.env.VITE_CDN_IMAGE +
												item.thumb_url
										}`}
										alt={item.origin_name}
										className='hidden aspect-[2/3] w-full max-w-[320px] rounded-lg border-[14px] border-primary md:block'
										width={320}
										height={480}
									/>
								</div>
							</div>
						</div>
					</SwiperSlide>
				))
			}
		</Swiper>
	);
};

export default MovieCarousel;
