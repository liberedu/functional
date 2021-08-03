import { Data } from './basic-types';
import { Prepend } from '../../../object/prepend';

export interface IEnumParsedAliases<D extends Data, H extends IEnumParsedAliases.Handler<D>> {
	readonly value: IEnumParsedAliases.Value<D, H>;

	get<K extends keyof H>(key: K): H[K];
}

export declare namespace IEnumParsedAliases {
	export type Handler<D extends Data> = { [K in D['aliases']]: unknown };

	export type Model<D extends Data = Data, H extends Handler<D> = Handler<D>> = {
		prefix: D['prefix'];
		aliases: D['aliases'][];
		handler: H;
	};

	export type Value<D extends Data, H extends IEnumParsedAliases.Handler<D>> = Prepend<H, D['prefix'], '/'>;
}
