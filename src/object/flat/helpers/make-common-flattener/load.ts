import { isObject } from '../is-object';
import { ICommonFlattenOptions, Input } from './types';

export function makeCommonFlattener(input: Input, options: ICommonFlattenOptions): any {
	if (!input) return {};

	const { join, recursionFn } = options;

	const flat: Record<string, any> = {};

	const recFn = (source: object, prefix?: string): void => {
		const getFullKey = (key: string) => join(prefix, key);

		recursionFn({
			flat,
			source,
			add: (key: string, value: unknown): void => {
				const fullKey = getFullKey(key);
				flat[fullKey] = value;
			},
			next: (key: string, nextSource: object) => {
				const fullKey = getFullKey(key);
				recFn(nextSource, fullKey);
			},
		});
	};

	if (isObject(input)) {
		recFn(input);
	}
	return flat;
}
