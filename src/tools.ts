import type { CntThemeToggle, CntClassItem } from './types';

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
