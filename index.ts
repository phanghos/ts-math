type Concat<T extends unknown[], U extends unknown[]> = U extends [
  unknown,
  ...infer Tail,
]
  ? Concat<[...T, U[0]], Tail>
  : T;

type Pop<T extends unknown[]> = T extends [...infer Head, unknown] ? Head : T;

type PopN<
  T extends unknown[],
  U extends number = 1,
  V extends unknown[] = [],
> = V['length'] extends U ? T : PopN<Pop<T>, U, [...V, 0]>;

type CreateArrayOfLength<
  T extends number,
  U extends unknown[] = [],
> = U['length'] extends T ? U : CreateArrayOfLength<T, [...U, 0]>;

type LengthOfArray<T extends readonly unknown[]> = T['length'];

type Add<T extends number, U extends number> = LengthOfArray<
  Concat<CreateArrayOfLength<T>, CreateArrayOfLength<U>>
>;

type Subtract<T extends number, U extends number> = LengthOfArray<
  PopN<CreateArrayOfLength<T>, U>
>;

type Multiply<
  T extends number,
  U extends number,
  V extends number[] = [T],
> = U extends 0
  ? 0
  : V['length'] extends U
  ? T
  : // @ts-ignore
    Multiply<Add<T, V[0]>, U, [...V, 0]>;

type Divide<
  T extends number,
  U extends number,
  V extends unknown[] = [],
> = U extends 0
  ? 1
  : T extends 0
  ? V['length']
  : // @ts-ignore
    Divide<Subtract<T, U>, U, [...V, 0]>;
