export const isObject = (value?: unknown): value is object => {
	if (!value) return false;
	if (Array.isArray(value)) return false;
	return typeof value === 'object';
};
