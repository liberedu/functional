import { fn } from './';

describe('fn test', () => {
	const props = ['Object', 'Array', 'Func'] as const;

	props.forEach((prop) => {
		test(`fn.${prop} should be defined`, () => {
			expect(fn[prop]).toBeDefined();
		});
	});

	describe('Object', () => {
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
				expect(fn.Object[prop]).toBeDefined();

				expect(typeof fn.Object[prop]).toBe('function');
			});
		});
	});
});
