interface INullableRet<Arg extends any, Ret extends any> {
	(a: Arg): Ret;
	(a: Arg | undefined): Ret | null;
	(a?: undefined): null;
}

/**
 * Wraps a function making it's first argument optional.
 *
 * @param {(arg: Arg) => Ret} constructor the constructor function
 *
 * @return {INullableRet<Arg, Ret>} overloaded function
 */
export const nullable = <Arg extends any, Ret extends any>(constructor: (arg: Arg) => Ret): INullableRet<Arg, Ret> => {
	return (a?: any): any => {
		return a ? constructor(a) : null;
	};
};
