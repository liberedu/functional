import { Data } from './basic-types';

export type KeyMap<D extends Data> = { [K in D['aliases']]: string };
