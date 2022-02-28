export type RemoveKeysThatMapToValuesOfType<S extends Record<string, any>, V> = Pick<
	S,
	{ [K in keyof S]-?: S[K] extends V ? never : K }[keyof S]
>;

export type ObjectFilterAccessorFunction<V, Key extends PropertyKey = string> = (value: any, key: Key) => boolean;

export interface ObjectFilterAccessorTypes {
	undefined: undefined;
	string: string;
	boolean: boolean;
	number: number;
	null: null;
	object: Record<string, any>;
	falsy: false | 0 | '' | null | undefined;
	nullOrUndef: null | undefined;
}

export type ObjectFilterAccessor<S = Record<string, any>> =
	| keyof ObjectFilterAccessorTypes
	| ObjectFilterAccessorFunction<any, keyof S>;

export type ObjectFilterAccessors = {
	[K in keyof ObjectFilterAccessorTypes]: ObjectFilterAccessorFunction<ObjectFilterAccessorTypes[K]>;
};
