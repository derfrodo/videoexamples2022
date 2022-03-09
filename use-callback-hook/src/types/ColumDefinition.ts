export type ColumDefinition<T = any, TKey = keyof T> = {
  header: string;
  property: TKey;
  alignCenter: boolean;
  width?: (() => number) | number;
};
