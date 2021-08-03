import { KeyMap, Data } from '../models';

export interface ICreateKeyMap {
	create<D extends Data>(model: ICreateKeyMap.Model<D>): KeyMap<D>;
}

export declare namespace ICreateKeyMap {
	export type Model<D extends Data> = {
		prefix: D['prefix'];
		aliases: D['aliases'][];
	};
}
