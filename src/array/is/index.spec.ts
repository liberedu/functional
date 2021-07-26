import { is } from './index';
import { IMatcher, Option } from './types';

type Value = 'a' | 'b' | 'c' | 'd' | 'e' | 'batata';

const makeSut = () => {
	return { sut: (value: Value) => is(value) };
};

const title = (value: Value, options: Option<Value>[]) => {
	return `[ value = ${value} ], [ options = [${options.join(', ')}] ]`;
};

const match = (matcher: IMatcher<Value>, options: Option<Value>[], expected: boolean) => {
	test(`matcher.in should return [${expected}]`, () => {
		expect(matcher.in(...options)).toBe(expected);
	});

	test(`matcher.not.in should return [${!expected}]`, () => {
		expect(matcher.not.in(...options)).toBe(!expected);
	});
};

describe('Array > is - Test', () => {
	const matchingCases: Array<[Value, Option<Value>[]]> = [
		['batata', ['b', /^b.+a$/]],
		['batata', [/^\w{6}$/]],
		['a', ['b', 'a']],
		['a', [/a/]],
	];

	const notMatchingCases: Array<[Value, Option<Value>[]]> = [
		['batata', ['b', /^.+b$/]],
		['batata', [/^\w$/]],
		['c', ['a', 'b']],
		['a', ['b']],
		['a', []],
	];

	matchingCases.forEach(([value, options]) => {
		const matchingResult = true;

		const name = title(value, options);

		describe(name, () => {
			const { sut } = makeSut();

			match(sut(value), options, matchingResult);
		});
	});

	notMatchingCases.forEach(([value, options]) => {
		const matchingResult = false;

		const name = title(value, options);

		describe(name, () => {
			const { sut } = makeSut();

			match(sut(value), options, matchingResult);
		});
	});
});
