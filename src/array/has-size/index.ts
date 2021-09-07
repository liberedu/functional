import { LoadHasSize } from './load';
import { HasSizeFn } from './types';

export { ExtractOfSize } from './types';
export const hasSize: HasSizeFn = new LoadHasSize().hasSize as any;
