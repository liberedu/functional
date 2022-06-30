import { IAttemptOptions } from './protocols';
import { AttemptFn } from './types';
import { wrapFn } from './helpers/wrap-fn';
import { createErrorHandler } from './helpers/create-error-handler';

export class LoadAttempter {
	constructor(protected readonly options: IAttemptOptions = {}) {}

	public child = (options: IAttemptOptions = {}) => new LoadAttempter({ ...this.options, ...options });

	/**
	 * Creates a custom error handler.
	 * The error handled by options.onError will be passed to the error handler.
	 * But an error will be throw in any case
	 *
	 * @param {AttemptFn} fn
	 * @param {?string} customName
	 *
	 * @returns {AttemptFn}
	 */
	public observe = <A extends any[], R>(fn: AttemptFn<A, R>, customName?: string): AttemptFn<A, R> => {
		const name = this.getName(fn, customName);
		const errorHandler = createErrorHandler.default(fn, name, this.options);

		const observed = wrapFn({
			fn,
			onError: errorHandler,
		});
		return observed as AttemptFn<A, R>;
	};

	public intercept = <A extends any[], R>(fn: AttemptFn<A, R>, customName?: string) => {
		const name = this.getName(fn, customName);
		const errorHandler = createErrorHandler.any(fn, name, this.options);

		const intercepted = wrapFn({
			fn,
			onError: errorHandler,
		});
		return intercepted as AttemptFn<A, R>;
	};

	private getName = (fn: AttemptFn, customName?: string) => {
		const baseName = customName ?? (fn.name || 'anonymous');
		return [this.options.name, baseName].filter(Boolean).join('.');
	};
}
