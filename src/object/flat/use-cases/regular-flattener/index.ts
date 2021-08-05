import { FlattenShallow as FlattenRegular } from '../../types';
import { makeJoin, commonFlattener, isObject } from '../../helpers';

const join = makeJoin({ filterEmpty: true, joinKey: '.' });

const recursionFn: commonFlattener.RecursionFn = ({ source, add, next }) => {
	Object.entries(source).forEach(([key, value]) => {
		const fn = isObject(value) ? next : add;
		fn(key, value);
	});
};

export const regularFlattener = <S extends object>(src: S): FlattenRegular<S> => {
	return commonFlattener.make(src, {
		join,
		recursionFn,
	});
};
