import {
	RemoveKeysThatMapToValuesOfType as RmvType,
	ObjectFilterAccessorFunction as AccessorFn,
	ObjectFilterAccessor as Accessor,
	ObjectFilterAccessors as Accessors,
} from '../types';

export interface IObjectFilterLoad<S> {
	(): RmvType<S, undefined>;
	<V>(accessor: Accessor<S>): RmvType<S, V>;
}

export class LoadObjectFilter<S> {
	constructor(private readonly source: S, private readonly accessors: Accessors) {}

	public getAccessor = (accessor: undefined | Accessor<S>): AccessorFn<any, any> => {
		if (!accessor) return this.accessors.undefined;
		if (typeof accessor === 'string') return this.accessors[accessor];
		return accessor;
	};

	public nonRecursiveFilter: IObjectFilterLoad<S> = (accessor?: Accessor<S>) => {
		const accessorFn = this.getAccessor(accessor);
		const object = this.source;
		const keys = Object.keys(object);
		const out: any = {};

		const validKeys = keys.filter((key) => accessorFn(object[key], key));
		validKeys.forEach((key) => {
			out[key] = object[key];
		});
		return out;
	};
}
