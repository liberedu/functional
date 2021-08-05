import { SimpleFlatten } from './helpers/simple-flatten';
import { Spread } from './helpers/spread';
import { Intersect } from './utilities';
import { IFlattenOptions } from './options';

// ---------------------------

type Intsct<S, Full extends boolean> = Intersect<SimpleFlatten<S>, S, Full>;
type DeepIntersect<S, Full extends boolean> = Intsct<Intsct<S, Full>, Full>;

export type FlattenShallow<S> = DeepIntersect<Spread<S>, false>;
export type FlattenFull<S> = DeepIntersect<Spread<S>, true>;

export type Flatten<S, Opt extends IFlattenOptions> = DeepIntersect<Spread<S>, Opt['deep']>;
