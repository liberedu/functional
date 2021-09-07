import { HasSizeProtocol } from './types';

export class LoadHasSize implements HasSizeProtocol {
	hasSize = (...args: [size: number, array: any[]] | [size: number]): any => {
		if (this.hasSize2(args)) {
			return this.hasSizeFn(...args);
		}
		return (array: any[]): boolean => {
			const [size] = args;
			return this.hasSizeFn(size, array);
		};
	};

	private hasSize2 = <A, B>(args: [A, B] | [A]): args is [A, B] => {
		return args.length === 2;
	};

	private hasSizeFn = (size: number, array: any[]): boolean => {
		return array.length === size;
	};
}
