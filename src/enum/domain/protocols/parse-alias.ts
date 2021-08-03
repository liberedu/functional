import { Data, KeyMap } from '../models';

export interface IParseAlias<D extends Data> {
	parseAliases(handler: Record<D['aliases'], unknown>, keyMap: KeyMap<D>): Record<string, any>;
}

export declare namespace IParseAlias {
	export type Model<D extends Data> = {
		handler: Record<D['aliases'], unknown>;
		aliases: Record<string, any>;
		keyMap: KeyMap<D>;
	};
}
