import { fn } from './';

describe('fn test', () => {
	const props = ['Object', 'Array', 'Func'] as const;

	props.forEach((prop) => {
		test(`fn.${prop} should be defined`, () => {
			expect(fn[prop]).toBeDefined();
		});
	});
});
