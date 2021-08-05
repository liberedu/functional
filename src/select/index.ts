import { IMakeSelect } from './protocol';
import { makeBaseSelector } from './load';

const makeSelect = makeBaseSelector() as IMakeSelect;

export const Select = {
	make: makeSelect.make,
};
