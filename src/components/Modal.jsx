import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Modal = () => {
	const [searchValue, setSearchValue] = useState('');
	const navigate = useNavigate();
	const handleSearch = async e => {
		e.preventDefault();
		navigate('/tim-kiem?q=');
	};
	return (
		<div
			className={`fixed z-50 inset-0 bg-black/95 duration-200 flex items-center justify-center opacity-100 pointer-events-auto`}
		>
			<form action=''>
				<form
					className='w-[80vw] max-w-md'
					onSubmit={handleSearch}
				>
					<input
						type='text'
						placeholder='Tìm phim, TV Shows,...'
						className='border-b-2 border-white/10 bg-transparent outline-none w-full px-0.5 py-1'
						value={searchValue}
						onChange={e => setSearchValue(e.target.value)}
					/>
				</form>
			</form>
		</div>
	);
};

export default Modal;
