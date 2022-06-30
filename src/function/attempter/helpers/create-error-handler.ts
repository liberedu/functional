import { IAttemptOptions } from '../protocols';
import { AttemptFn, ErrorHandler } from '../types';

const createDefaultErrorHandler = (_: AttemptFn, name: string, __: IAttemptOptions) => {
	const errorHandler: ErrorHandler<never> = ({ error }): never => {
		console.error(`${name}: threw ${error.message}`);
		throw error;
	};

	return errorHandler;
};

const createCustomErrorHandler = <R>(fn: AttemptFn, name: string, options: IAttemptOptions) => {
	const errorHandler: ErrorHandler<R> = ({ error, args }): R => {
		return options.onError!({
			error,
			fn,
			args,
			name,
		});
	};

	return errorHandler;
};

export const createAnyErrorHandler = <R>(fn: AttemptFn, name: string, options: IAttemptOptions) => {
	const { onError } = options;
	if (onError) return createDefaultErrorHandler(fn, name, options);
	return createCustomErrorHandler<R>(fn, name, options);
};

export const createErrorHandler = {
	default: createDefaultErrorHandler,
	any: createAnyErrorHandler,
};
