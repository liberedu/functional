import { Object as fnObject } from './';

describe('Object Test', () => {
	const props = [
		'entries',
		'init',
		'isEmpty',
		'keys',
		'mergePrepend',
		'omit',
		'path',
		'pick',
		'prepend',
		'split',
		'values',
	] as const;

	props.forEach((prop) => {
		test(`fn.${prop} should be defined`, () => {
			expect(fnObject[prop]).toBeDefined();

			expect(typeof fnObject[prop]).toBe('function');
		});
	});
});
