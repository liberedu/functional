export interface HasSizeFn {
	<L extends number, Arr extends any[]>(size: L, array: Arr): array is ExtractOfSize<Arr, L>;
	<L extends number>(size: L): <Arr extends any[]>(array: Arr) => array is ExtractOfSize<Arr, L>;
}

export interface HasSizeProtocol {
	hasSize(size: number): (array: any[]) => boolean;
	hasSize(size: number, array: any[]): boolean;
}

export type ExtractOfSize<Arr extends any[], L extends number> = Extract<Arr, { length: L }>;
