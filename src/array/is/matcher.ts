import { BaseType, Comparator, IMatcher, Option } from './types';

const defaultComparator: Comparator<BaseType> = <T extends BaseType>(a: T, b: Option<T>): boolean => {
	return b instanceof RegExp ? b.test(a) : a === b;
};

export class Matcher<T extends BaseType> implements IMatcher<T> {
	private readonly comparator: Comparator<T>;

	constructor(private readonly value: T, private readonly _not: boolean, comparator?: Comparator<T>) {
		if (!comparator) {
			this.comparator = defaultComparator;
		} else {
			this.comparator = comparator;
		}
	}

	private reverse = (value: boolean): boolean => {
		if (this._not) {
			return !value;
		}
		return value;
	};

	in = (...options: Array<Option<T>>): boolean => {
		const match = (option: Option<T>) => this.comparator(this.value, option);
		if (options.length === 0) {
			return this.reverse(false);
		}
		return this.reverse(options.some(match));
	};

	get not(): Matcher<T> {
		return new Matcher(this.value, !this._not, this.comparator);
	}
}
