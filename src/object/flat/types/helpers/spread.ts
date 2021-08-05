import { ObjectPropertiesOf } from './simple-flatten';
import { Join } from '../../../../helpers/types/join';

export type Spread<S, Base extends Readonly<string> = never> = {
	[K in keyof S as Join<Base, K>]: K extends keyof ObjectPropertiesOf<S> ? Spread<S[K], Join<Base, K>> : S[K];
};
