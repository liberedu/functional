import * as types from './types';
import { Matcher } from './matcher';

/**
 * Checks if a value is inside an array of options
 *
 * @param {T} value
 * @param {(a:T,b:T) => boolean} comparator function to check if two values are equal.
 *
 * example:
 *
 * type Option = 'a' | 'b' | 'c'
 * const value : Option = 'a';
 *
 * is(value).in('a', 'b')
 * is(value).in('c')
 */
export const is = <T extends types.BaseType>(value: T, comparator?: types.Comparator<T>) => {
	return new Matcher(value, false, comparator);
};
