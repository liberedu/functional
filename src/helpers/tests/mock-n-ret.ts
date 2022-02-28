type AnyFn = (...args: any[]) => any;

export type MockFn<V extends AnyFn> = jest.Mock<ReturnType<V>, Parameters<V>>;

export const mockNRet = <V extends AnyFn>(foo: V | MockFn<V>, rets: ReturnType<V>[]): MockFn<V> => {
	const mock = 'mock' in foo ? foo : (jest.fn(foo) as MockFn<V>);

	rets.forEach((ret) => {
		mock.mockReturnValueOnce(ret);
	});

	return mock;
};

export const mockWithNRet = <V extends AnyFn>(rets: ReturnType<V>[]): MockFn<V> => {
	const mock = jest.fn() as MockFn<V>;

	rets.forEach((ret) => {
		mock.mockReturnValueOnce(ret);
	});

	return mock;
};
