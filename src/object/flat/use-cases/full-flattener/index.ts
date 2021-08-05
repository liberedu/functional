import { FlattenFull } from '../../types';
import { makeJoin, commonFlattener, isObject } from '../../helpers';

const join = makeJoin({ filterEmpty: true, joinKey: '.' });

const recursionFn: commonFlattener.RecursionFn = ({ source, add, next }) => {
	Object.entries(source).forEach(([key, value]) => {
		add(key, value);
		if (isObject(value)) {
			next(key, value);
		}
	});
};

export const fullFlattener = <S extends object>(src: S): FlattenFull<S> => {
	return commonFlattener.make(src, {
		join,
		recursionFn,
	});
};
