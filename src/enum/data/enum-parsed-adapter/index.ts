import { IEnumParsedAliases, KeyMap, Data } from '../../domain/models';
import { IParseAlias } from '../../domain/protocols';

export class EnumParsedAdapter<D extends Data, H extends IEnumParsedAliases.Handler<D>>
	implements IEnumParsedAliases<D, H>
{
	public readonly value: IEnumParsedAliases.Value<D, H>;

	constructor(private readonly handler: H, private readonly keyMap: KeyMap<D>, aliasParser: IParseAlias<D>) {
		this.value = aliasParser.parseAliases(this.handler, this.keyMap) as any;
	}

	get = <K extends keyof H>(key: K): H[K] => {
		return this.handler[key];
	};
}
