type AnyFn = (...args: any[]) => any;

export type ProxyStubFn<V> = V extends AnyFn ? jest.Mock<ReturnType<V>, Parameters<V>> : V;

export type ProxyStubObject<S> = { [K in keyof S]: ProxyStubFn<S[K]> };

type GetNonFunctionProps<S> = Exclude<{ [K in keyof S]: S[K] extends AnyFn ? never : K }[keyof S], undefined>;
type PartialSome<S, K extends keyof S> = Omit<S, K> & Partial<Pick<S, K>>;

export interface MakeStub {
	<S extends Record<string, AnyFn>>(append?: Partial<S>): ProxyStubObject<S>;
	<S>(statics: PartialSome<S, GetNonFunctionProps<S>>): ProxyStubObject<S>;
}

export const makeProxyStub: MakeStub = <V>(append: any = {}): ProxyStubObject<V> =>
	new Proxy(append, {
		get: (target, key) => {
			if (!target[key]) {
				target[key] = jest.fn();
			}
			return target[key];
		},
	});
