import { AttemptFn, ErrorHandler, WrapFnWithTryCatchModel } from '../types';

type Awaited<R> = R extends Promise<infer T> ? Awaited<T> : R;

type AsyncWrapModel<R> = {
	promise: Promise<Awaited<R>>;
	onError: ErrorHandler;
	args: any[];
};

const wrapFnPromiseResult = async <R extends Promise<any>>(model: AsyncWrapModel<R>): Promise<Awaited<R>> => {
	const { promise, onError, args } = model;
	try {
		const ret = await promise;
		return ret;
	} catch (error) {
		return onError({ error, args });
	}
};

export const wrapFn = <A extends any[], R>(model: WrapFnWithTryCatchModel<A, R>) => {
	const { fn, onError } = model;
	const wrap: AttemptFn<A, R> = (...args: A): R => {
		try {
			const ret = fn(...args);
			if (ret instanceof Promise) {
				const asyncRet = wrapFnPromiseResult({ promise: ret, onError, args });
				return asyncRet as any;
			}
			return ret;
		} catch (error) {
			return onError({ error, args });
		}
	};

	if (fn.name) {
		const nextName = `${fn.name}_tryCatch`;
		return { [nextName]: (...args: A): R => wrap(...args) }[nextName];
	}

	return wrap as AttemptFn<A, any>;
};
