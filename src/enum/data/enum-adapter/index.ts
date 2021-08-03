import { IEnum, Data, KeyMap, IEnumParsedAliases } from '../../domain/models';
import { ICreateKeyMap, IParseAlias } from '../../domain/protocols';
import { EnumParsedAdapter } from '../enum-parsed-adapter';

export class EnumAdapter<D extends Data> implements IEnum<Data> {
	public readonly keyMap: KeyMap<D>;

	constructor(
		public readonly prefix: D['prefix'],
		aliases: D['aliases'][],
		createKeyMap: ICreateKeyMap,
		private readonly aliasParser: IParseAlias<D>,
	) {
		this.keyMap = createKeyMap.create({ prefix, aliases });
	}

	parseAliases = <Handler extends IEnumParsedAliases.Handler<D>>(
		handler: Handler,
	): IEnumParsedAliases<D, Handler> => {
		return new EnumParsedAdapter(handler, this.keyMap, this.aliasParser);
	};
}
