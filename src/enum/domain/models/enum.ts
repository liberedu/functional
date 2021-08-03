import { Data } from './basic-types';
import { KeyMap } from './key-map';
import { IEnumParsedAliases } from './parsed-aliases';

export interface IEnum<D extends Data> {
	readonly keyMap: KeyMap<D>;
	readonly prefix: D['prefix'];

	parseAliases<Handler extends IEnumParsedAliases.Handler<D>>(handler: Handler): IEnumParsedAliases<D, Handler>;
}
