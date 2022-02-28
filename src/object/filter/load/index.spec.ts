import { LoadObjectFilter } from './index';
import { ObjectFilterAccessor as Accessor, ObjectFilterAccessors as Accessors } from '../types';
import { makeProxyStub } from '../../../helpers/tests/make-proxy-stub';

const makeSut = (source: ReturnType<typeof makeSource>) => {
	const accessors = makeProxyStub<Accessors>();
	const sut = new LoadObjectFilter(source, accessors);
	return { sut, stubs: { accessors }, source };
};

const makeSource = () => ({ a: 2, b: undefined, c: false });

describe('Object Filter Unit Test', () => {
	describe('should load accessor properly', () => {
		function doLoadTest(makeSutRet: ReturnType<typeof makeSut>, input: Accessor<any>, accessor: jest.Mock) {
			const shouldCallUndef = input === 'undefined';

			test('getAccessor', () => {
				const { sut } = makeSutRet;
				expect(sut.getAccessor(input)).toBe(accessor);
			});

			test('nonRecursiveFilter', () => {
				const { sut, stubs } = makeSutRet;

				sut.nonRecursiveFilter(input);

				expect(accessor).toHaveBeenCalledTimes(Object.keys(makeSutRet.source).length);
				if (!shouldCallUndef) {
					expect(stubs.accessors.undefined).not.toHaveBeenCalled();
				}
			});
		}

		describe('from undefined', () => {
			const sut = makeSut(makeSource());
			doLoadTest(sut, 'undefined', sut.stubs.accessors.undefined);
		});

		describe('from string', () => {
			const sut = makeSut(makeSource());
			doLoadTest(sut, 'string', sut.stubs.accessors.string);
		});

		describe('from custom accessor', () => {
			const sut = makeSut(makeSource());
			const accessor = jest.fn(() => false);
			doLoadTest(sut, accessor, accessor);
		});
	});

	test('should invoke accessor with proper params', () => {
		const { sut } = makeSut(makeSource());
		const accessor = jest.fn(() => false);

		sut.nonRecursiveFilter(accessor);

		expect(accessor).toHaveBeenCalledTimes(3);
		expect(accessor).toHaveBeenCalledWith(2, 'a');
		expect(accessor).toHaveBeenCalledWith(undefined, 'b');
		expect(accessor).toHaveBeenCalledWith(false, 'c');
	});

	test('should not modify source object', () => {
		const { sut, source } = makeSut(makeSource());
		const target = sut.nonRecursiveFilter<undefined>((_, key) => key !== 'b');

		expect(Object.keys(source).length).toBe(3);
		expect(Object.keys(target).length).toBe(2);

		source.a++;
		expect(target.a).not.toBe(source.a);
	});

	test('should pick only the properties in which accessor returns true', () => {
		const { sut, source } = makeSut(makeSource());
		const pickKeyAorBFilter = (_, key: string) => key === 'a' || key === 'c';

		const target = sut.nonRecursiveFilter<undefined>(pickKeyAorBFilter);

		expect(target).toHaveProperty('a', source.a);
		expect(target).toHaveProperty('c', source.c);
	});

	test('should omit the properties in which accessor returns false', () => {
		const { sut } = makeSut(makeSource());
		const omitBKeyFilter = (_, key: string) => {
			if (key === 'b') return false;
			return true;
		};

		const target = sut.nonRecursiveFilter<undefined>(omitBKeyFilter);

		expect(target).not.toHaveProperty('b');
	});
});
