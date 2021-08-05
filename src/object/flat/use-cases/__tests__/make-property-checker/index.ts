import { chainMatchers } from '../chain-matchers';

export const makePropertyChecker = <S>(source: S) => {
	const check = <K extends keyof S>(key: K): chainMatchers.Matchers<S[K]> => {
		expect(key in source).toBeTruthy();
		return chainMatchers(source[key]);
	};

	const missing = (...keys: string[]) => {
		keys.forEach((key) => {
			expect(key in source).toBe(false);
		});
	};

	return {
		check,
		missing,
	};
};
