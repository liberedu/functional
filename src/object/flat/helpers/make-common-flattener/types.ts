import { makeJoin } from '../../../helpers';

export interface FlattenRecursionFnModel {
	flat: Record<string, any>;
	source: object;
	add(key: string, value: unknown): void;
	next(key: string, nextSource: object): void;
}

export type FlattenRecursionFn = (model: FlattenRecursionFnModel) => void;

export interface ICommonFlattenOptions {
	recursionFn: FlattenRecursionFn;
	join: makeJoin.Join;
}

export type Input = object | undefined | null;
