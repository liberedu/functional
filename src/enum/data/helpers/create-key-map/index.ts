import { BaseAlias, KeyMap, Data } from '../../../domain/models';
import { ICreateKeyMap } from '../../../domain/protocols';

const join = <A extends BaseAlias, B extends BaseAlias>(a: A, b: B) => [a, b].join('/');

export class CreateKeyMapAdapter implements ICreateKeyMap {
	create = <D extends Data>(model: ICreateKeyMap.Model<D>): KeyMap<D> => {
		const { aliases, prefix } = model;

		const enums: KeyMap<D> = {} as any;
		aliases.forEach((alias) => {
			enums[alias] = join(prefix, alias);
		});

		return enums;
	};
}
