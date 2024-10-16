import type { CntTheme } from './../src/types';
import { defineTheme } from '../src';

describe('Sizes specific configs', () => {
  const theme: CntTheme<
    'primary' | 'secondary',
    'large' | 'small',
    'rounded' | 'pulse',
    'loading' | 'error' | 'ok',
    string,
    string
  > = {
    variants: {
      primary: 'primary',
      secondary: 'primary',
    },
    sizes: {
      large: {
        default: 'large',
        variants: {
          primary: 'large-primary',
          secondary: 'large-secondary',
        },
        states: {
          error: 'large-error',
          loading: 'large-loading',
          ok: 'large-ok',
        },
        flags: {
          pulse: 'large-pulse',
          rounded: 'large-rounded',
        },
      },
      small: {
        default: 'small',
        variants: {
          primary: 'small-primary',
          secondary: 'small-secondary',
        },
        states: {
          error: 'small-error',
          loading: 'small-loading',
          ok: 'small-ok',
        },
        flags: {
          pulse: 'small-pulse',
          rounded: 'small-rounded',
        },
      },
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

  test('Default Size', () => {
    expect(cnt({ size: 'small' })).toEqual('small');
  });

  describe('Sizes with Variant', () => {
    test('Global Sizes', () => {
      expect(cnt({ variant: 'primary', size: 'large' })).toMatch('primary');
      expect(cnt({ variant: 'primary', size: 'large' })).not.toMatch(
        'secondary',
      );
    });

    test('Specific Variant', () => {
      expect(cnt({ variant: 'primary', size: 'large' })).toMatch('large');
      expect(cnt({ variant: 'primary', size: 'large' })).toMatch(
        'large-primary',
      );
      expect(cnt({ variant: 'secondary', size: 'large' })).not.toMatch(
        'large-primary',
      );
    });

    test('Specific State', () => {
      expect(cnt({ size: 'small', state: 'ok' })).toMatch('ok');
      expect(cnt({ size: 'small', state: 'ok' })).toMatch('small-ok');
      expect(cnt({ size: 'large', state: 'ok' })).not.toMatch('small-ok');
    });

    test('Specific Flags', () => {
      expect(cnt({ size: 'small', flags: 'pulse' })).toMatch('pulse');
      expect(cnt({ size: 'small', flags: 'pulse' })).toMatch('small-pulse');
      expect(cnt({ size: 'large', flags: 'pulse' })).not.toMatch('small-pulse');
    });
  });
});
