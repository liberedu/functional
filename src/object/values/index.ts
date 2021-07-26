/**
 * Same behaviour of [Object.values], but properly typped
 */
export const values = <T extends object>(source: T): Array<T[keyof T]> => {
	return Object.values(source) as any;
};
