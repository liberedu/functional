import { ObjectFilterAccessorFunction, ObjectFilterAccessors as Accessors } from '../types';

export const makeFilterAccessor = <V>(
	compare: (value: any, key: string) => boolean,
): ObjectFilterAccessorFunction<V> => {
	return compare;
};

const filterAccessors: Accessors = {
	undefined: makeFilterAccessor((value) => !(value === undefined)),
	null: makeFilterAccessor((value) => !(value === null)),
	string: makeFilterAccessor((value) => !(typeof value === 'string')),
	boolean: makeFilterAccessor((value) => !(typeof value === 'boolean')),
	number: makeFilterAccessor((value) => !(typeof value === 'number')),
	object: makeFilterAccessor((value) => !(value && typeof value === 'object' && !Array.isArray(value))),
	falsy: makeFilterAccessor((value) => !!value),
	nullOrUndef: makeFilterAccessor((value) => ![null, undefined].includes(value)),
};
export default filterAccessors;
