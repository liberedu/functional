import { ValOrFn } from '../types';
import { IBaseSelectFn } from './create-base-select/protocol';

export interface IBaseFullSelect extends IBaseSelectFn {
	multiValue: IBaseSelectFn;

	default: IBaseSelectFn;
}

export interface IMakeBaseSelect {
	make(value: ValOrFn): {
		select: IBaseFullSelect;
	};
}
