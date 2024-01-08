import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react';

import { mobileSubMenu, movieTypes } from '../constants';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const MobileMenu = props => {
	// eslint-disable-next-line react/prop-types
	const { genresData, country } = props;
	const [menuType, setMenuType] = useState(null);
	const [openMenu, setOpenMenu] = useState(false);

	const handleOpenSubMenu = type => {
		if (menuType === type) {
			setMenuType(null);
		} else {
			setMenuType(type);
		}
	};

	return (
		<>
			<button className='lg:hidden'>
				<Icon
					icon='nimbus:menu'
					height={28}
					onClick={() => setOpenMenu(true)}
				/>
			</button>

			<div
				className={`fixed inset-0 z-40 duration-300 ${
					openMenu
						? 'pointer-events-auto bg-black/90 overflow-y-auto overflow-x-hidden'
						: 'pointer-events-none'
				}`}
				onClick={e => {
					if (e.target !== e.currentTarget) return;
					setOpenMenu(false);
				}}
			>
				<div
					className={`absolute min-h-screen right-0 w-full max-w-xs bg-zinc-950 font-bold text-xl duration-300 overflow-auto ${
						openMenu ? 'translate-x-0' : 'translate-x-full'
					}`}
				>
					<Icon
						icon='ic:round-close'
						height={28}
						className='ml-auto cursor-pointer m-3'
						onClick={() => setOpenMenu(false)}
					/>
					{mobileSubMenu.map(type => {
						return (
							<div key={type.key}>
								<button
									className={`flex items-center w-full gap-0.5 p-2.5 ${
										menuType === type.key
											? 'text-primary'
											: ''
									}`}
									onClick={() => handleOpenSubMenu(type.key)}
								>
									<Icon
										icon={type.icon}
										height={18}
										className='mr-2'
									/>
									{type.title}
									<Icon
										icon='icon-park-outline:right'
										height={24}
										className={`duration-300 ${
											menuType === type.key
												? 'rotate-90'
												: ''
										}`}
									/>
								</button>
								<ul
									className='grid grid-cols-2 gap-x-2.5 gap-y-1 font-normal text-base overflow-hidden px-2 duration-300'
									style={{
										maxHeight:
											menuType === type.key ? '50rem' : 0
									}}
								>
									{menuType === 'movie' &&
										movieTypes.map(item => (
											<li
												key={item.title}
												className='hover:text-primary duration-100'
											>
												{item.title}
											</li>
										))}
									{menuType === 'genres' &&
										// eslint-disable-next-line react/prop-types
										genresData.map(item => (
											<li
												key={item._id}
												className='hover:text-primary duration-100'
											>
												{item.name}
											</li>
										))}

									{menuType === 'country' &&
										// eslint-disable-next-line react/prop-types
										country.map(item => (
											<li
												key={item._id}
												className='hover:text-primary duration-100'
											>
												{item.name}
											</li>
										))}
								</ul>
							</div>
						);
					})}
				</div>
			</div>
		</>
	);
};

const Navbar = () => {
	const [displayBgColor, setDisplayBgColor] = useState(false);
	const [genresData, setGenresData] = useState([]);
	const [country, setCountry] = useState([]);
	const navigate = useNavigate();
	const fetchGenres = async () => {
		const res = await axios.get(`/the-loai`);
		setGenresData(res.data);
	};

	const fetchCountry = async () => {
		const res = await axios.get(`/quoc-gia`);
		setCountry(res.data);
	};

	useEffect(() => {
		function checkPositionHandler() {
			if (window.scrollY == 0) setDisplayBgColor(false);
			else setDisplayBgColor(true);
		}
		checkPositionHandler();
		window.addEventListener('scroll', checkPositionHandler);
		return () => window.removeEventListener('scroll', checkPositionHandler);
	}, []);

	useEffect(() => {
		fetchGenres();
		fetchCountry();
	}, []);
	return (
		<header
			className={`${
				displayBgColor ? 'bg-black' : 'bg-transparent'
			} py-3 fixed inset-x-0 z-40 duration-300`}
		>
			<nav className='max-w-7xl mx-auto flex items-center justify-between px-4'>
				<div
					className='cursor-pointer'
					onClick={() => navigate('/')}
				>
					<h1 className='flex items-center text-2xl font-extrabold gap-2 select-none'>
						<Icon
							icon='ant-design:thunderbolt-filled'
							className='text-[#e4d804]'
							height={40}
						/>
						MovOnl
					</h1>
				</div>

				<div className='uppercase font-bold text-sm items-center gap-12 hidden lg:flex'>
					<span className='relative group hover:text-primary cursor-pointer'>
						Loại phim
						<ul className='dropdown-menu grid-cols-2 '>
							{movieTypes.map(item => (
								<li
									key={item.title}
									className='hover:text-primary duration-100'
								>
									{item.title}
								</li>
							))}
						</ul>
					</span>

					<span className='relative group hover:text-primary cursor-pointer'>
						Thể loại
						<ul className='dropdown-menu grid-cols-2 '>
							{genresData.map(item => (
								<li
									key={item._id}
									className='hover:text-primary duration-100'
								>
									{item.name}
								</li>
							))}
						</ul>
					</span>

					<span className='relative group hover:text-primary cursor-pointer'>
						Quốc gia
						<ul className='dropdown-menu grid-cols-2 '>
							{country.map(item => (
								<li
									key={item._id}
									className='hover:text-primary duration-100'
								>
									{item.name}
								</li>
							))}
						</ul>
					</span>

					<span className='relative group hover:text-primary cursor-pointer'>
						Sắp chiếu
					</span>
				</div>

				<div className='flex items-center gap-5'>
					<abbr title='Tìm kiếm'>
						<Icon
							icon='iconamoon:search-bold'
							className='text-primary cursor-pointer'
							height={24}
						/>
					</abbr>

					<div>
						<abbr title='Yêu thích'>
							<Icon
								icon='mdi:heart-box'
								height={26}
							/>
						</abbr>
					</div>

					{/* mobile */}
					<MobileMenu
						country={[...country]}
						genresData={[...genresData]}
					/>
				</div>
			</nav>
		</header>
	);
};

export default Navbar;
