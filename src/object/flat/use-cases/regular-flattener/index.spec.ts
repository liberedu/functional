import { regularFlattener } from './index';
import { makePropertyChecker } from '../__tests__/make-property-checker';

describe('Regular Flattener Test', () => {
	test('should flatten properly', () => {
		const model = {
			a: 2,
			b: {
				c: 3,
			},
			d: {
				d2: {
					d3: [0, 1, 2],
				},
				x: {
					a: 2,
					b: 3,
					d: 4,
				},
			},
		};

		const flat = regularFlattener(model);

		const propChecker = makePropertyChecker(flat);

		propChecker.check('a').toBe(2);
		propChecker.check('b.c').toBe(3);
		propChecker.check('d.d2.d3').toStrictEqual([0, 1, 2]);
		propChecker.check('d.x.a').toBe(2);
		propChecker.check('d.x.b').toBe(3);
		propChecker.check('d.x.d').toBe(4);

		propChecker.missing('b', 'd', 'd.d2');

		expect(flat).toStrictEqual({
			a: 2,
			'b.c': 3,
			'd.d2.d3': [0, 1, 2],
			'd.x.a': 2,
			'd.x.b': 3,
			'd.x.d': 4,
		});
	});
});
