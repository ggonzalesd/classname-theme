import type {
  CntThemeToggle,
  CntClassItem,
  CntThemeModule,
  CntParameters,
} from './types';

export function resolveToggle(
  config: string | CntThemeToggle | undefined,
  active: boolean,
) {
  if (config === undefined) return;
  if (typeof config === 'string') {
    return config;
  } else {
    return [config.default, active && config.on, !active && config.off];
  }
}

export function resolveToggleComplex<
  V extends string,
  S extends string,
  F extends string,
  SS extends string,
>(
  config: string | CntThemeModule<V, S, F, SS> | undefined,
  omit: keyof Omit<
    CntThemeModule<V, S, F, SS>,
    keyof Pick<CntThemeModule<V, S, F, SS>, 'default' | 'off' | 'on'>
  >,
  params?: CntParameters<V, S, F, SS, string, string>,
) {
  if (config === undefined) return;
  if (typeof config === 'string') {
    return config;
  } else {
    const active = params?.active === undefined ? true : params.active;

    const classes = [
      config.default,
      active && config.on,
      !active && config.off,
      omit !== 'variants' &&
        config.variants &&
        params?.variant &&
        config.variants[params.variant],
      omit !== 'sizes' &&
        config.sizes &&
        params?.size &&
        config.sizes[params.size],
      omit !== 'states' &&
        config.states &&
        params?.state &&
        config.states[params.state],
      omit !== 'flags' &&
        config.flags &&
        params?.flags &&
        (Object.entries(config.flags)
          .filter(([k, _]) =>
            Array.isArray(params.flags)
              ? params.flags.includes(k as F)
              : params.flags === k,
          )
          .map(([_, v]) => v) as string[]),
    ];
    return classes;
  }
}

export function CntMergeClasses(...values: Array<CntClassItem>): string {
  let final = '';
  for (let i = 0; i < values.length; i++) {
    const value = values[i];

    if (value === undefined || value === null || value === false) {
      continue;
    }

    if (typeof value === 'number' || typeof value === 'string') {
      final += ' ' + value;
      continue;
    }

    if (Array.isArray(value)) {
      const finalValue = CntMergeClasses(...value);
      if (finalValue.length > 0) final += ' ' + finalValue;
      continue;
    }

    if (typeof value === 'object') {
      Object.entries(value).forEach(([c, t]) => {
        if (!!t) final += ' ' + c;
      });
    }
  }
  return final.replace(/\s\s+/g, ' ').trim();
}

export function CntDoNotRepeat(classes: string) {
  if (typeof classes === 'string') {
    return Array.from(new Set(classes.split(' '))).join(' ');
  }
  return classes;
}
