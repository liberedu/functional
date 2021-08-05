export type Value<K extends RdStr = RdStr> = K | null | undefined;

export type ValOrFn<K extends RdStr = RdStr> = Value<K> | (() => Value<K>);

export type Def<V = unknown> = { default: V };

export type Source<K extends RdStr, V = unknown> = { [SK in K]?: V };

export type RdStr = Readonly<string | number>;
