export type BaseAlias = Readonly<string>;

export type Data<Prefix extends BaseAlias = BaseAlias, Alias extends BaseAlias = BaseAlias, T = {}> = {
	prefix: Prefix;
	aliases: Alias;
} & T;
