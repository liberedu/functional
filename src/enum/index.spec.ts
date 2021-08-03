import { Enum } from './exports';
import { BaseAlias } from './domain/models';

export const makeSut = <K extends BaseAlias>(...aliases: K[]) => {
	const prefix = 'prefix';
	const sut = new Enum<typeof prefix, K>(prefix, aliases);
	return { sut };
};

describe('Enum Tests', () => {
	test('should properly create keyMap', () => {
		const { sut } = makeSut('a', 'b', 'c');

		expect(sut.keyMap).toStrictEqual({
			a: 'prefix/a',
			b: 'prefix/b',
			c: 'prefix/c',
		});
	});

	test('parseAliases: should parse properly', () => {
		const { sut } = makeSut('a', 'b', 'c');

		const parsed = sut.parseAliases({
			a: 2,
			b: 3,
			c: 4,
		});

		expect(parsed.value).toStrictEqual({
			'prefix/a': 2,
			'prefix/b': 3,
			'prefix/c': 4,
		});
	});
});
