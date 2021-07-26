/**
 * Adds a fallback return value to the function when the parameter of the constructor
 * function is undefined.
 *
 * @param {(arg: Arg) => Ret} constructor the constructor function
 * @param {Ret} defaultValue the default value of the constructor's return
 *
 * @return {*} returns a function that when the parameter received is undefined, returns the
 * value set at the default value parameter
 */
export const withDefault = <Arg extends any, Ret extends any>(constructor: (arg: Arg) => Ret, defaultValue: Ret) => {
	return (a?: Arg): Ret => (a ? constructor(a) : defaultValue!);
};
