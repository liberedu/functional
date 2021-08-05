import { IJoinFn, IJoinOptions, IJoin, JoinPart } from './make-join-types';

const applyDefaultToOptions = (options?: IJoinOptions): Required<IJoinOptions> => {
	return {
		joinKey: '.',
		filterEmpty: true,
		...options,
	};
};

/**
 * Make Join
 *
 * @param {IJoinOptions|undefined} options
 * @returns {IJoinFn}
 */
export function makeJoin(options?: IJoinOptions): IJoin {
	const opt = applyDefaultToOptions(options);

	const join: IJoinFn = (...parts: JoinPart[]): string => {
		const ps = parts.filter((part) => {
			if (typeof part === 'string') {
				return opt.filterEmpty ? part : true;
			}
			return false;
		});
		return ps.join(opt.joinKey);
	};

	return Object.assign(join, { options: opt });
}

export declare namespace makeJoin {
	export type Options = IJoinOptions;

	export type Join = IJoin;
}
