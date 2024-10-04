import type { CntTheme } from './../src/types';
import { defineTheme } from '../src';

describe('Variant specific configs', () => {
  const theme: CntTheme<
    'primary' | 'secondary',
    'large' | 'small',
    'rounded' | 'pulse',
    'loading' | 'error' | 'ok',
    string,
    string
  > = {
    variants: {
      primary: {
        default: 'primary',
        sizes: {
          large: 'primary-large',
          small: 'primary-small',
        },
        flags: {
          pulse: 'primary-pulse',
          rounded: 'primary-rounded',
        },
        states: {
          error: 'primary-error',
          loading: 'primary-loading',
          ok: 'primary-ok',
        },
      },
      secondary: {
        default: 'secondary',
        sizes: {
          large: 'secondary-large',
          small: 'secondary-small',
        },
        flags: {
          pulse: 'secondary-pulse',
          rounded: 'secondary-rounded',
        },
        states: {
          error: 'secondary-error',
          loading: 'secondary-loading',
          ok: 'secondary-ok',
        },
      },
    },
    sizes: {
      large: 'large',
      small: 'small',
    },
    flags: {
      pulse: 'pulse',
      rounded: 'rounded',
    },
    states: {
      error: 'error',
      loading: 'loading',
      ok: 'ok',
    },
  };

  const cnt = defineTheme(theme);

  test('Default Variant', () => {
    expect(cnt({ variant: 'primary' })).toEqual('primary');
  });

  describe('Variant with Sizes', () => {
    test('Global Sizes', () => {
      expect(cnt({ variant: 'primary', size: 'large' })).toMatch('large');
      expect(cnt({ variant: 'primary', size: 'large' })).not.toMatch('small');
    });

    test('Specific Size', () => {
      expect(cnt({ variant: 'primary', size: 'large' })).toMatch('large');
      expect(cnt({ variant: 'primary', size: 'large' })).toMatch(
        'primary-large',
      );
      expect(cnt({ variant: 'secondary', size: 'large' })).not.toMatch(
        'primary-large',
      );
    });

    test('Specific State', () => {
      expect(cnt({ variant: 'primary', state: 'ok' })).toMatch('ok');
      expect(cnt({ variant: 'primary', state: 'ok' })).toMatch('primary-ok');
      expect(cnt({ variant: 'secondary', state: 'ok' })).not.toMatch(
        'primary-ok',
      );
    });

    test('Specific Flags', () => {
      expect(cnt({ variant: 'primary', flags: 'pulse' })).toMatch('pulse');
      expect(cnt({ variant: 'primary', flags: 'pulse' })).toMatch(
        'primary-pulse',
      );
      expect(cnt({ variant: 'secondary', flags: 'pulse' })).not.toMatch(
        'primary-pulse',
      );
    });
  });
});
