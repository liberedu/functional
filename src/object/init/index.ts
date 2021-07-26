/**
 * Initializes an object setting a default value to the receiving keys
 *
 * @param keys the keys in the object
 *
 * @return {{with: Function}} a function defining the default value on each key
 *
 * example:
 *
 * const x = init('a', 'b', 'c').with('batata');
 *
 * [ x ] would be equal to:
 * 	{
 * 		a: 'batata',
 * 		b: 'batata',
 * 		c: 'batata',
 * 	}
 */
export function init<K extends Readonly<string>>(...keys: K[]) {
	return {
		with: <T>(data: T): { [key in K]: T } => {
			const out: any = {};
			keys.forEach((key) => {
				out[key] = data;
			});
			return out;
		},
	};
}
