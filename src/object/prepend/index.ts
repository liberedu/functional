type Str<S> = Extract<S, string>;
type Preprend<S, Key extends string, JoinKey extends string> = {
	[K in keyof S as `${Key}${JoinKey}${Str<keyof S>}`]: S[K];
};

const prependFn = <Src extends { [K in string]: any }, K extends string, JoinKey extends string = '.'>(
	key: K,
	src: Src,
	joinKey?: JoinKey,
): Preprend<Src, K, JoinKey> => {
	const prepended: any = {};
	Object.keys(src).forEach((innerKey) => {
		const newKey = [key, innerKey].join(joinKey || '.');
		prepended[newKey] = src[innerKey];
	});
	return prepended;
};

export const prepend = prependFn;

Object.assign(prependFn, {
	with: <J extends string>(joinKey: J) => {
		return <Src extends { [K in string]: any }, K extends string>(key: K, src: Src) => {
			return prependFn(key, src, joinKey);
		};
	},
});
