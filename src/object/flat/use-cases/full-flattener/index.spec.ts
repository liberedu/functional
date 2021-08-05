import { fullFlattener } from './index';
import { makePropertyChecker } from '../__tests__/make-property-checker';

describe('Full Flattener Test', () => {
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
			},
		};

		const flat = fullFlattener(model);

		const propChecker = makePropertyChecker(flat);

		propChecker.check('a').toBe(2);
		propChecker.check('b.c').toBe(3);
		propChecker.check('d.d2.d3').toStrictEqual([0, 1, 2]);

		propChecker.check('b').toStrictEqual({ c: 3 });
		propChecker.check('d').toStrictEqual({ d2: { d3: [0, 1, 2] } });
		propChecker.check('d.d2').toStrictEqual({ d3: [0, 1, 2] });

		expect(flat).toStrictEqual({
			a: 2,
			b: {
				c: 3,
			},
			d: {
				d2: {
					d3: [0, 1, 2],
				},
			},
			'b.c': 3,
			'd.d2': {
				d3: [0, 1, 2],
			},
			'd.d2.d3': [0, 1, 2],
		});
	});
});
