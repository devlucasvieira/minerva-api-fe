import { useCallback, useEffect, useState } from 'react';

export const useHome = () => {
	const [random, setRandom] = useState<number>(0);

	const randomNumber = useCallback((min: number, max: number): number => {
		const byteArray = new Uint8Array(1);
		window.crypto.getRandomValues(byteArray);

		const range = max - min + 1;
		const max_range = 256;
		if (byteArray[0] >= Math.floor(max_range / range) * range)
			return randomNumber(min, max);
		return min + (byteArray[0] % range);
	}, []);

	useEffect(() => {
		setRandom(randomNumber(0, 2));
	}, [setRandom, randomNumber]);

	return { random };
};
