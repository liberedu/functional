import { IAttemptOptions } from './protocols';
import { LoadAttempter } from './load';

export class Attempter extends LoadAttempter {
	public child = (options: IAttemptOptions = {}) => new Attempter({ ...this.options, ...options });
}

export declare namespace Attempter {
	export type Options = IAttemptOptions;
}
