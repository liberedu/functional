import { ChainMatchers } from './protocol';

export const chainMatchers = <V>(value: V, not: boolean = false): ChainMatchers<V> => {
	const e = expect(value);
	const exp = not ? e.not : e;

	const proxy = new Proxy({} as any, {
		get: (...handlerArgs) => {
			const key = handlerArgs[1];
			if (typeof key === 'string') {
				if (key === 'value') {
					return value;
				}
				if (key === 'not') {
					return chainMatchers(value, !not);
				}
				return (...args) => {
					exp[key](...args);
					return proxy;
				};
			}
			return Reflect.get(...handlerArgs);
		},
	});

	return proxy;
};

export namespace chainMatchers {
	export type Matchers<V> = ChainMatchers<V>;
}
