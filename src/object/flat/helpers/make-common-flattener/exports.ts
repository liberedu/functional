import { FlattenRecursionFnModel } from './types';

export { makeCommonFlattener as make } from './load';
export { FlattenRecursionFn as RecursionFn, ICommonFlattenOptions as Options } from './types';

export declare namespace RecursionFn {
	export type Model = FlattenRecursionFnModel;
}
