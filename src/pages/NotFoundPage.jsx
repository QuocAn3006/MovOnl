import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
	const navigate = useNavigate();
	return (
		<div className='min-h-screen flex items-center justify-center flex-col px-4'>
			<h2 className='text-5xl font-extrabold md:text-9xl'>
				4<span className='text-primary'>0</span>4
			</h2>
			<h3 className='text-3xl font-bold my-1 text-center'>
				Oops! Trang không tồn tại
			</h3>
			<div
				onClick={() => navigate('/')}
				type='button'
				className='cursor-pointer mt-4 rounded-full px-6 py-2.5 bg-primary text-black font-bold'
			>
				Trang chủ
			</div>
		</div>
	);
};

export default NotFoundPage;
