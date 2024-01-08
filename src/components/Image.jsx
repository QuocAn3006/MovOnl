/* eslint-disable react/prop-types */

import { useState } from 'react';

const Image = props => {
	const { src, alt = '', className = '', height = 450, width = 300 } = props;
	const [isComplete, setIsComplete] = useState(false);

	return (
		<div
			className={`bg-stone-900 overflow-hidden ${
				isComplete ? 'animate-none' : 'animate-pulse'
			} ${className}`}
		>
			<img
				className={`duration-300 object-cover h-full w-full ${
					isComplete ? 'opacity-100 blur-none' : 'opacity-0 blur-lg'
				} `}
				src={src}
				alt={alt}
				width={width}
				height={height}
				onLoad={() => setIsComplete(true)}
				loading='lazy'
				draggable={false}
			/>
		</div>
	);
};

export default Image;
