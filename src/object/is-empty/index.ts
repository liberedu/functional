/**
 * Check if an object is empty, i.e. has no keys
 *
 * [INFO] According to StackOverflow: [https://stackoverflow.com/a/59787784/7050326]
 * This is the fastest method.
 *
 * @param {object} obj
 *
 * @return {boolean}
 */
export const isEmpty = (obj: object): boolean => {
	for (const _ in obj) {
		return false;
	}
	return true;
};
