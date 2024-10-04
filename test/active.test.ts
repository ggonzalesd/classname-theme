import type { CntTheme } from './../src/types';
import { defineTheme } from '../src';

describe('Basic Testing', () => {
  const theme: CntTheme<
    'primary' | 'secondary',
    'large' | 'small',
    'rounded' | 'pulse',
    'loading' | 'error' | 'ok',
    string,
    string
  > = {
    default: 'default',
    on: 'on',
    off: 'off',
    variants: {
      primary: {
        default: 'primary-default',
        on: 'primary-on',
        off: 'primary-off',
      },
      secondary: 'secondary',
    },
    sizes: {
      large: 'large',
      small: {
        default: 'small-default',
        off: 'small-off',
        on: 'small-on',
      },
    },
    flags: {
      pulse: {
        default: 'pulse-default',
        off: 'pulse-off',
        on: 'pulse-on',
      },
      rounded: 'rounded',
    },
    states: {
      error: 'error',
      loading: {
        default: 'loading-default',
        off: 'loading-off',
        on: 'loading-on',
      },
      ok: {
        default: 'ok-default',
        off: 'ok-off',
        on: 'ok-on',
      },
    },
  };

  const cnt = defineTheme(theme);

  describe('Testing Active Default', () => {
    test('Active on default', () => {
      expect(cnt()).toMatch('default on');
      expect(cnt({ active: true })).toMatch('default on');
      expect(cnt({ active: true })).not.toMatch('off');
    });

    test('Active off', () => {
      expect(cnt({ active: false })).toMatch('default off');
      expect(cnt({ active: false })).not.toMatch('on');
    });
  });

  describe('Testing Active Variants', () => {
    test('Active ON variants', () => {
      expect(cnt({ active: true, variant: 'primary' })).toMatch(
        'primary-default primary-on',
      );
      expect(cnt({ active: true, variant: 'primary' })).not.toMatch(
        'primary-off',
      );
    });

    test('Active OFF variants', () => {
      expect(cnt({ active: false, variant: 'primary' })).toMatch(
        'primary-default primary-off',
      );
      expect(cnt({ active: false, variant: 'primary' })).not.toMatch(
        'primary-on',
      );
    });

    test('Active with no ON and OFF', () => {
      expect(cnt({ active: true, variant: 'secondary' })).toMatch('secondary');
      expect(cnt({ active: false, variant: 'secondary' })).toMatch('secondary');
    });
  });

  describe('Testing Active Sizes', () => {
    test('Active ON Sizes', () => {
      expect(cnt({ active: true, size: 'small' })).toMatch(
        'small-default small-on',
      );
      expect(cnt({ active: true, size: 'small' })).not.toMatch('small-off');
    });

    test('Active OFF Sizes', () => {
      expect(cnt({ active: false, size: 'small' })).toMatch(
        'small-default small-off',
      );
      expect(cnt({ active: false, size: 'small' })).not.toMatch('small-on');
    });

    test('Active with no ON and OFF', () => {
      expect(cnt({ active: true, size: 'large' })).toMatch('large');
      expect(cnt({ active: false, size: 'large' })).toMatch('large');
    });
  });

  describe('Testing Active States', () => {
    test('Active ON States', () => {
      expect(cnt({ active: true, state: 'ok' })).toMatch('ok-default ok-on');
      expect(cnt({ active: true, state: 'ok' })).not.toMatch('ok-off');
    });

    test('Active OFF State', () => {
      expect(cnt({ active: false, state: 'ok' })).toMatch('ok-default ok-off');
      expect(cnt({ active: false, state: 'ok' })).not.toMatch('ok-on');
    });

    test('Active with no ON and OFF', () => {
      expect(cnt({ active: true, state: 'error' })).toMatch('error');
      expect(cnt({ active: false, state: 'error' })).toMatch('error');
    });
  });

  describe('Testing Active Flags', () => {
    test('Active ON Flags', () => {
      expect(cnt({ active: true, flags: ['pulse'] })).toMatch(
        'pulse-default pulse-on',
      );
      expect(cnt({ active: true, flags: 'pulse' })).not.toMatch('pulse-off');
    });

    test('Active OFF Flags', () => {
      expect(cnt({ active: false, flags: 'pulse' })).toMatch(
        'pulse-default pulse-off',
      );
      expect(cnt({ active: false, flags: 'pulse' })).not.toMatch('pulse-on');
    });

    test('Active with no ON and OFF', () => {
      expect(cnt({ active: true, flags: 'rounded' })).toMatch('rounded');
      expect(cnt({ active: false, flags: 'rounded' })).toMatch('rounded');
    });
  });
});
