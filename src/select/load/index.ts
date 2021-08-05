import { ValOrFn } from '../types';
import { BaseSelect } from './create-base-select';
import { IMakeBaseSelect } from './protocol';

class MakeBaseSelectAdapter implements IMakeBaseSelect {
	make = (valOrFn: ValOrFn) => {
		const selection = new BaseSelect(valOrFn);

		const select = (source: any, dft?: any) => selection.select(source, dft);

		return {
			select: Object.assign(select, {
				multiValue: select,
				default: select,
			}),
		};
	};
}

export function makeBaseSelector(): IMakeBaseSelect {
	return new MakeBaseSelectAdapter();
}
