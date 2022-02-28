import { filter } from './index';

describe('Object filter integration test', () => {
	describe('undefined', () => {
		const source = { a: 2, b: undefined, c: null };
		test('should return a copy of source object without undefined properties', () => {
			expect(filter.undefined(source)).toStrictEqual({ a: 2, c: null });
		});
	});

	describe('null or undefined', () => {
		const source = { a: 2, b: undefined, c: null };
		test('should return a copy of source object without null or undefined properties', () => {
			expect(filter.nullOrUndef(source)).toStrictEqual({ a: 2 });
		});
	});
});
