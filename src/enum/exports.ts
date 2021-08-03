import { BaseAlias, IEnum, Data } from './domain/models';
import { CreateKeyMapAdapter, EnumAdapter, ParseAliasAdapter } from './data';

export class Enum<Prefix extends BaseAlias, Alias extends BaseAlias>
	extends EnumAdapter<Data<Prefix, Alias>>
	implements IEnum<Data<Prefix, Alias>>
{
	constructor(public readonly prefix: Prefix, aliases: Alias[]) {
		super(prefix, aliases, new CreateKeyMapAdapter(), new ParseAliasAdapter());
	}
}
