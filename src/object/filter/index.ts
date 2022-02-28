import {
	RemoveKeysThatMapToValuesOfType as RmvType,
	ObjectFilterAccessorFunction as AccessorFn,
	ObjectFilterAccessorTypes as AccessorTypes,
	ObjectFilterAccessors as Accessors,
} from './types';
import { LoadObjectFilter } from './load';
import accessors from './accessors';
import { keys as ObjectKeys } from '../keys';

type AccessorValue<S, K extends keyof AccessorTypes> = Accessors[K] extends AccessorFn<infer V, keyof S> ? V : any;

type IObjectFilterFromKnownAccessors = { [K in keyof Accessors]: <S>(source: S) => RmvType<S, AccessorValue<S, K>> };

export interface IObjectFilterFn {
	custom: {
		<V>(accessor: AccessorFn<V>): <S>(source: S) => RmvType<S, V>;
	};
}

export interface IObjectFilter extends IObjectFilterFromKnownAccessors, IObjectFilterFn {}

const makeObjectFilterFromKnownAccessors = (): IObjectFilterFromKnownAccessors => {
	const keys = ObjectKeys(accessors);
	const out: any = {};
	keys.forEach((key) => {
		out[key] = <S>(source: S) => {
			return new LoadObjectFilter(source, accessors).nonRecursiveFilter(key);
		};
	});
	return out;
};

const makeObjectFilterFn = (): IObjectFilterFn => {
	return {
		custom:
			<V>(accessor: AccessorFn<V>) =>
			<S>(source: S): RmvType<S, V> => {
				return new LoadObjectFilter(source, accessors).nonRecursiveFilter(accessor as AccessorFn<V, keyof S>);
			},
	};
};

const makeObjectFilter = (): IObjectFilter => {
	const knownAccessors = makeObjectFilterFromKnownAccessors();
	const fns = makeObjectFilterFn();

	return Object.assign(fns, knownAccessors);
};

export const filter = makeObjectFilter();
