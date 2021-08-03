import { Data, KeyMap } from '../../../domain/models';
import { IParseAlias } from '../../../domain/protocols';

export class ParseAliasAdapter<D extends Data> implements IParseAlias<D> {
	parseAliases = (handler: Record<D['aliases'], unknown>, keyMap: KeyMap<D>): Record<string, any> => {
		const out: any = {};
		const keys = Object.keys(handler) as Array<D['aliases']>;
		keys.forEach((key) => {
			const longKey = keyMap[key];
			out[longKey] = handler[key];
		});
		return out;
	};
}
