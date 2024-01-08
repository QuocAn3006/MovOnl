import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

// eslint-disable-next-line react/prop-types
const DefaultLayout = ({ children }) => {
	return (
		<div className=''>
			<Navbar />
			{children}
			<Footer />
		</div>
	);
};

export default DefaultLayout;
