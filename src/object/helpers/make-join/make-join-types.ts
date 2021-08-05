export type JoinPart = string | null | undefined;

export interface IJoinFn {
	(...parts: JoinPart[]): string;
}

export interface IJoin extends IJoinFn {
	options: Required<IJoinOptions>;
}

export interface IJoinOptions {
	/**
	 * Key to be used between each joined part
	 *
	 * @default {'.'}
	 */
	joinKey?: string;

	/**
	 * Should filter empty-string parts before joining
	 *
	 * @default {true}
	 */
	filterEmpty?: boolean;
}
