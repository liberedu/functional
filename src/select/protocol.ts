import { RdStr, Def, Source, Value } from './types';

type RequiredSource<K extends RdStr, V = unknown, D = V> = Required<Source<K, V>> | (Source<K, V> & Def<D>);
type PartialSource<K extends RdStr, V = unknown> = Source<K, V> | Source<K, V>;

export interface ISelect<K extends RdStr> {
	<V extends RdStr, S extends RequiredSource<K, V>>(source: Readonly<S>): S[keyof S];
	<S extends RequiredSource<K>>(source: S): S[keyof S];
	<V extends RdStr>(source: { [SK in K]?: V }): V | null;
	<V>(source: { [SK in K]?: V }): V | null;
	<V extends RdStr, S extends PartialSource<K, V>, D extends RdStr>(source: S, defaultValue: D): D | S[keyof S];
	<S extends PartialSource<K>, D extends S[keyof S]>(source: S, defaultValue: D): D | S[keyof S];

	multiValue: {
		<S extends RequiredSource<K>>(source: S): S[keyof S];
		<S extends PartialSource<K>>(source: S): S[keyof S] | null;
		<S extends PartialSource<K>, D extends S[keyof S]>(source: S, defaultValue: D): D | S[keyof S];
	};

	default<DV>(defaultValue: DV): {
		<SV extends RdStr>(source: { [SK in K]?: SV | DV }): DV | SV;
		<SV>(source: { [SK in K]?: SV | DV }): DV | SV;
	};
}

export interface IMakeSelect {
	make<K extends RdStr>(
		value: Value<K> | (() => Value<K>),
	): {
		select: ISelect<K>;
	};
}
