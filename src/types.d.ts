export type CntClassItem =
  | string
  | undefined
  | number
  | null
  | false
  | Record<string | number, any>
  | Array<CntClassItem>;

export interface CntThemeToggle {
  default?: string;
  off?: string;
  on?: string;
}

type CntRecord<K extends string, V> = Partial<Record<K, V>>;

export interface CntThemeModule<
  V extends string,
  S extends string,
  F extends string,
  SS extends string,
> extends CntThemeToggle {
  variants?: CntRecord<V, string>;
  sizes?: CntRecord<S, string>;
  flags?: CntRecord<F, string>;
  states?: CntRecord<SS, string>;
}

export interface CntThemeItem<
  V extends string,
  S extends string,
  F extends string,
  SS extends string,
  OP extends string,
> extends CntThemeToggle {
  variants?: CntRecord<
    V,
    string | Omit<CntThemeModule<V, S, F, SS>, 'variants'>
  >;
  sizes?: Partial<Record<S, string | CntThemeToggle>>;

  states?: Partial<Record<SS, string | CntThemeToggle>>;
  flags?: Partial<Record<F, string | CntThemeToggle>>;

  options?: Partial<Record<OP, Record<string, string | CntThemeToggle>>>;
}

export interface CntParameters<
  V extends string,
  S extends string,
  F extends string,
  SS extends string,
  OP extends string,
  E extends string,
> {
  variant?: V;
  size?: S;
  flags?: F | Array<F>;
  state?: SS;

  options?: Partial<Record<OP, string>>;

  class?: string;
  active?: boolean;
  ext?: E;
}

export interface CntTheme<
  VARIANT extends string,
  SIZE extends string,
  FLAG extends string,
  STATE extends string,
  OPTION extends string,
  EXTENSION extends string,
> extends CntThemeItem<VARIANT, SIZE, FLAG, STATE, OPTION> {
  name?: string;
  initial?: {
    variant?: VARIANT;
    size?: SIZE;
    flags?: FLAG | Array<FLAG>;
    state?: STATE;
  };
  extensions?: Record<
    EXTENSION,
    CntThemeItem<VARIANT, SIZE, FLAG, STATE, OPTION>
  >;
}
