import R from 'ramda';

type K<OBJECT extends any> = keyof OBJECT;

interface Path {
	<T, A extends K<T>>(obj: T, k1: A): T[A];
	<T, A extends K<T>, B extends K<T[A]>>(obj: T, k1: A, k2: B): T[A][B];
	<T, A extends K<T>, B extends K<T[A]>, C extends K<T[A][B]>>(obj: T, k1: A, k2: B, k3: C): T[A][B][C];
	<T, A extends K<T>, B extends K<T[A]>, C extends K<T[A][B]>, D extends K<T[A][B][C]>>(
		obj: T,
		k1: A,
		k2: B,
		k3: C,
		k4: D,
	): T[A][B][C][D];
	<T, A extends K<T>, B extends K<T[A]>, C extends K<T[A][B]>, D extends K<T[A][B][C]>, E extends K<T[A][B][C][D]>>(
		obj: T,
		k1: A,
		k2: B,
		k3: C,
		k4: D,
		k5: E,
	): T[A][B][C][D][E];
	<
		T,
		A extends K<T>,
		B extends K<T[A]>,
		C extends K<T[A][B]>,
		D extends K<T[A][B][C]>,
		E extends K<T[A][B][C][D]>,
		F extends K<T[A][B][C][D][E]>,
	>(
		obj: T,
		k1: A,
		k2: B,
		k3: C,
		k4: D,
		k5: E,
		k6: F,
	): T[A][B][C][D][E][F];
	<T>(obj: T, k1: string, k2?: string, k3?: string, k4?: string, k5?: string, k6?: string, ...rest: string[]): any;
}

export const path: Path = <T>(obj: T, ...args: any[]) => {
	if (!obj) {
		return;
	}
	const keys = Array.from(args).slice(1);
	return R.path<T>(keys, obj);
};
