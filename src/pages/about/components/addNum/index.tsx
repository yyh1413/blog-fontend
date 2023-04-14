import { useState, useEffect } from 'react';

function NumberCounter({ start, end, duration = 1000 }) {
	const [count, setCount] = useState(start);

	useEffect(() => {
		let startTime = null;
		const increment = (timestamp) => {
			if (!startTime) {
				startTime = timestamp;
			}
			const progress = timestamp - startTime;
			const incrementValue = Math.floor((end - start) * (progress / duration));
			const nextCount = start + incrementValue;
			if (nextCount <= end) {
				setCount(nextCount);
				window.requestAnimationFrame(increment);
			} else {
				setCount(end);
			}
		};
		window.requestAnimationFrame(increment);
	}, [start, end, duration]);

	return (
		<span>{count}</span>
	);
}

export default NumberCounter;