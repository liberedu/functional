import { Value, ValOrFn } from '../../types';
import { IBaseSelect } from './protocol';

export class BaseSelect implements IBaseSelect {
	constructor(private readonly valOrFn: ValOrFn) {}

	private getTargetKey = (): Value => {
		if (typeof this.valOrFn === 'function') {
			return this.valOrFn();
		}
		return this.valOrFn;
	};

	select = (source: Record<string, any>, defaultValue?: any): any => {
		const key = this.getTargetKey();

		if (key) {
			if (key in source) return source[key];
		}
		return defaultValue || source.default || null;
	};
}
