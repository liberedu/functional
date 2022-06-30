export type AttemptFn<A extends any[] = [], R = any> = (...args: A) => R;

export interface WrapFnWithTryCatchModel<A extends any[] = [], R = any> {
	fn: AttemptFn<A, R>;
	onError: ErrorHandler;
}

export type ErrorHandler<R = any> = (model: ErrorHandler.Model) => R;
export declare namespace ErrorHandler {
	export type Model = {
		error: any;
		args: any[];
	};
}
