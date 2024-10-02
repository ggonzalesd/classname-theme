import type { CntTheme } from './../src/types';
import { defineTheme } from '../src';

describe('Validate Defaults', () => {
  type SimpleThemeType = CntTheme<
    'primary' | 'secondary' | 'simple',
    'big' | 'medium' | 'small',
    'rounded' | 'bottom' | 'underline',
    'loading' | 'error' | 'ok',
    string,
    string
  >;
  let simpleTheme: SimpleThemeType = {
    name: 'simple',
    default: 'default',
    on: 'default-on',
    off: 'default-off',
    variants: {
      primary: 'primary',
      secondary: 'secondary',
      simple: 'simple',
    },
    sizes: { big: 'big', medium: 'medium', small: 'small' },
    flags: {
      rounded: 'rounded',
      bottom: 'bottom',
      underline: 'underline',
    },
    states: {
      error: 'error',
      loading: 'loading',
      ok: 'ok',
    },
  };

  test('Theme generator', () => {
    const theme = defineTheme(simpleTheme);

    expect(theme).toBeInstanceOf(Function);
    expect(typeof theme()).toBe('string');
    expect(theme()).toMatch('default');
    expect(theme({ active: false })).toMatch('default-off');
    expect(theme({ active: true })).toMatch('default-on');
    expect(theme({ active: true })).not.toMatch('default-off');
  });

  test('Variant default', () => {
    const cnt = defineTheme({
      ...simpleTheme,
      initial: { variant: 'primary' },
    } as SimpleThemeType);

    expect(cnt()).toMatch('primary');
    expect(cnt({ variant: 'primary' })).toMatch('primary');
    expect(cnt()).not.toMatch('secondary');
    expect(cnt({ variant: 'secondary' })).toMatch('secondary');
    expect(cnt({ variant: 'secondary' })).not.toMatch('primary');
  });
});
