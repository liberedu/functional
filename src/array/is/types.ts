export type BaseType = string;

export type Option<T extends BaseType> = T | RegExp;
export type Comparator<T extends BaseType> = (a: T, b: Option<T>) => boolean;

export interface IMatcher<T extends BaseType> {
	in(...options: Array<Option<T>>): boolean;

	not: IMatcher<T>;
}
