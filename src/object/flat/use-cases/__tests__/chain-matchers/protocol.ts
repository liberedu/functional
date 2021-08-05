type JestMatchersShape<TNonPromise extends {} = {}, TPromise extends {} = {}> = {
	/**
	 * Use resolves to unwrap the value of a fulfilled promise so any other
	 * matcher can be chained. If the promise is rejected the assertion fails.
	 */
	resolves: AndNot<TPromise>;
	/**
	 * Unwraps the reason of a rejected promise so any other matcher can be chained.
	 * If the promise is fulfilled the assertion fails.
	 */
	rejects: AndNot<TPromise>;
} & AndNot<TNonPromise>;
type AndNot<T> = T & {
	not: T;
};

type JestMatchers<T = any, V = any> = JestMatchersShape<jest.Matchers<V, T>, jest.Matchers<Promise<V>, T>>;

type MatchKeys = {
	[K in keyof JestMatchers]: JestMatchers[K] extends (...args: any) => any ? K : never;
}[keyof JestMatchers];

export type ChainMatchers<T> = {
	[K in keyof JestMatchers]: K extends 'not'
		? ChainMatchers<T>
		: K extends MatchKeys
		? JestMatchers<T, ChainMatchers<T>>[K]
		: JestMatchers[K];
};
