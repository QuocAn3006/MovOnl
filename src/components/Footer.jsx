import { Icon } from '@iconify/react';

const Footer = () => {
	return (
		<footer className='pt-20'>
			<div className='max-w-7xl mx-auto pb-10'>
				<div>
					<h1 className='flex justify-center items-center text-2xl font-extrabold gap-2 select-none px-5'>
						<Icon
							icon='ant-design:thunderbolt-filled'
							className='text-primary'
							height={40}
						/>
						MovOnl
					</h1>
				</div>
				<span className='block h-0.5 bg-white/5 rounded my-8' />
				<div className='flex items-center justify-between flex-col md:flex-row gap-8 px-5'>
					<ul className='flex items-center flex-wrap gap-x-8 gap-y-2 text-xs font-semibold lg:gap-14'>
						<li className='hover:text-primary duration-150 cursor-pointer'>
							FAQ
						</li>
						<li className='hover:text-primary duration-150 cursor-pointer'>
							TRUNG TÂM TRỢ GIÚP
						</li>
						<li className='hover:text-primary duration-150 cursor-pointer'>
							ĐIỀU KHOẢN
						</li>
						<li className='hover:text-primary duration-150 cursor-pointer'>
							CHÍNH SÁCH
						</li>
					</ul>
					<ul className='flex items-center gap-x-2.5 text-xs font-semibold'>
						<a
							href='https://github.com/QuocAn3006'
							className='rounded-full bg-black aspect-square p-2.5 hover:text-primary duration-150'
						>
							<Icon
								icon='mingcute:github-fill'
								height={16}
							/>
						</a>

						<a
							href='https://www.facebook.com/profile.php?id=100027620832757'
							className='rounded-full bg-black aspect-square p-2.5 hover:text-primary duration-150'
						>
							<Icon
								icon='ri:facebook-fill'
								height={16}
							/>
						</a>
					</ul>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
