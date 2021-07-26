import { prepend } from '../prepend';

export const mergePrepend = <A extends object, B extends Object, K extends string>(key: K, a: A, b: B) => {
	return { ...prepend(key, a), ...prepend(key, b) };
};
