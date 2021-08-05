interface MinusDeclaration {
	5: 4;
	4: 3;
	3: 2;
	2: 1;
	1: 0;
	0: 0;
}

export type MaxDepth = 5;

export type RecursiveCount = 5 | 4 | 3 | 2 | 1 | 0;
export type Minus<Value extends RecursiveCount> = MinusDeclaration[Value];
export type Intersect<A, B, enabled extends boolean> = enabled extends true ? A & B : A;
