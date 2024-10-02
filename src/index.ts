import type {
  CntTheme,
  CntParameters,
  CntClassItem,
  CntThemeItem,
} from './types';
import * as tools from './tools';

export const mergeclasses = tools.CntMergeClasses;
export const norepeatclasses = tools.CntDoNotRepeat;

export function defineTheme<
  VARIANT extends string,
  SIZE extends string,
  FLAG extends string,
  STATE extends string,
  OPTION extends string,
  EXTENSION extends string,
>(theme: CntTheme<VARIANT, SIZE, FLAG, STATE, OPTION, EXTENSION>) {
  const t = Object.freeze(theme);
  return (
    params?: CntParameters<VARIANT, SIZE, FLAG, STATE, OPTION, EXTENSION>,
    ...className: Array<CntClassItem>
  ) => cnt(t, params, ...className);
}

export default function cnt<
  VARIANT extends string,
  SIZE extends string,
  FLAG extends string,
  STATE extends string,
  OPTION extends string,
  EXTENSION extends string,
>(
  theme: CntTheme<VARIANT, SIZE, FLAG, STATE, OPTION, EXTENSION>,
  params?: CntParameters<VARIANT, SIZE, FLAG, STATE, OPTION, EXTENSION>,
  ...className: Array<CntClassItem>
) {
  const active = params?.active === undefined ? true : params.active;

  // Select default or extension
  let mainTheme: CntThemeItem<VARIANT, SIZE, FLAG, STATE, OPTION> | undefined;
  if (params?.ext !== undefined) {
    if (theme.extensions && theme.extensions[params.ext])
      mainTheme = theme.extensions[params.ext];
  } else {
    mainTheme = theme;
  }

  if (mainTheme === undefined) return;

  // Get Default
  const cDefault = tools.resolveToggle(mainTheme, active);

  // Get Variant
  const kVariant = params?.variant ?? theme.initial?.variant;
  let cVariant: Array<string | undefined | false> | string | undefined;
  if (mainTheme.variants && kVariant) {
    cVariant = tools.resolveToggle(mainTheme.variants[kVariant], active);
  }

  // Get Size
  const kSize = params?.size ?? theme.initial?.size;
  const cSize =
    mainTheme.sizes !== undefined &&
    kSize !== undefined &&
    tools.resolveToggle(mainTheme.sizes[kSize], active);

  // Get State
  const kState = params?.state ?? theme.initial?.state;
  const cState =
    mainTheme.states !== undefined &&
    kState !== undefined &&
    tools.resolveToggle(mainTheme.states[kState], active);

  const kFlags = params?.flags ?? theme.initial?.flags;
  const cFlags: Array<string | undefined | Array<string | false | undefined>> =
    [];
  if (kFlags !== undefined && mainTheme.flags !== undefined) {
    const ks = typeof kFlags === 'string' ? [kFlags] : kFlags;
    for (let i = 0; i < ks.length; i++) {
      cFlags.push(tools.resolveToggle(mainTheme.flags[ks[i]], active));
    }
  }

  const options = params?.options;
  const cOptions: Array<
    string | undefined | Array<string | false | undefined>
  > = [];
  if (options !== undefined && mainTheme.options) {
    const keys = Object.keys(options);
    for (let i = 0; i < keys.length; i++) {
      if (!mainTheme.options) return;
      const paramOption = keys[i] as OPTION;
      const mainOptions = mainTheme.options[paramOption];
      const paramKey = options[paramOption];

      if (mainOptions && paramKey) {
        cOptions.push(tools.resolveToggle(mainOptions[paramKey], active));
      }
    }
  }

  return tools.CntDoNotRepeat(
    tools.CntMergeClasses(
      cDefault,
      cVariant,
      cSize,
      cState,
      cFlags,
      cOptions,
      params?.class,
      className,
    ),
  );
}
