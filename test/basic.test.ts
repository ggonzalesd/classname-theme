import type { CntTheme } from './../src/types';
import { defineTheme } from '../src';

describe('Basic Testing', () => {
  const theme: CntTheme<
    'primary' | 'secondary',
    'large' | 'small',
    string,
    string,
    string,
    string
  > = {
    name: 'basic',
    default: 'default',
    on: 'on',
    off: 'off',
    variants: {
      primary: 'primary',
      secondary: 'secondary',
    },
    sizes: {
      large: 'large',
      small: 'small',
    },
  };

  describe('no initialize', () => {
    const cnt = defineTheme(theme);

    test('testing active', () => {
      expect(cnt()).toEqual('default on');
      expect(cnt({ active: false })).toEqual('default off');
    });

    test('testing variant and size', () => {
      expect(cnt({ variant: 'primary' })).toMatch('primary');
      expect(cnt({ variant: 'secondary' })).toMatch('secondary');

      expect(cnt({ size: 'small' })).toMatch('small');
      expect(cnt({ size: 'small' })).not.toMatch('primary');
      expect(cnt({ size: 'large' })).toMatch('large');
      expect(cnt({ size: 'small' })).not.toMatch('secondary');
    });
  });
});
