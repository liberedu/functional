import { Value, ValOrFn } from '../../types';

export interface IBaseSelect {
	select: IBaseSelectFn;
}

export interface IBaseSelectFn {
	(source: Record<string, any>, defaultValue?: any): any;
}
