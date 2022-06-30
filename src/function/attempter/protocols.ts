import { AttemptFn } from './types';

export interface IAttemptOptions {
	name?: string;
	onError?(model: { error: any; fn: AttemptFn; args: any[]; name: string }): any;
}
