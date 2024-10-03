# Classname Theme

`classname-theme` is a lightweight library that allows you to configure and generate themes for components using Tailwind classes quickly. It’s designed to provide flexibility in managing variants, sizes, states, and more for component customization.

Installation
To install the library, use npm:

```bash
npm install classname-theme
```

## Basic Usage

The main function of the library is defineTheme, which lets you define a theme and then generate classes easily for your components.

### Example

1. Define a theme using `defineTheme`:

```ts
import { defineTheme } from 'classname-theme';

const simpleTheme = {
  initial: { variant: 'primary' },
  variants: {
    primary: 'bg-blue-500 text-white',
    secondary: 'bg-gray-500 text-white',
  },
  sizes: {
    small: 'text-sm',
    large: 'text-lg',
  },
};

const cnt = defineTheme(simpleTheme);
```

2. Generate dynamic classes for your components:

```ts
// Using the default 'primary' variant
cnt(); // 'bg-blue-500 text-white'

// Specifying a variant
cnt({ variant: 'secondary' }); // 'bg-gray-500 text-white'
```

## Theme definition

Themes are objects that allow you to define variants, sizes, states, flags, and options in a flexible way. Here are the main keys you can use:

- **variants**: Define component variants, such as primary or secondary.
- **sizes**: Specify different sizes, like small or large.
- **states**: Optionally define states like hover or focus.
- **flags**: Add additional flags or modifiers that can be combined.
- **options**: Define custom options for specific elements within the theme.

## Parameters of the cnt Function

You can customize the generated classes using several parameters:

- **variant**: Defines the component’s variant (e.g., primary, secondary).
- **size**: Specifies the component’s size (e.g., small, large).
- **flags**: Sets one or more flags (e.g., rounded, shadow).
- **state**: Defines the current state (e.g., hover, focus).
- **options**: Pass additional options specific to the component.

## Full Example

```ts
// Defining a more complex theme
const myTheme = defineTheme({
  variants: {
    primary: 'bg-green-500 text-white',
    secondary: 'bg-yellow-500 text-black',
  },
  sizes: {
    medium: 'text-md',
    large: 'text-xl',
  },
  states: {
    loading: 'animate-pulse',
    ok: '',
  },
  flags: {
    rounded: 'rounded-full',
  },
});

// Uso
cnt({
  variant: 'secondary',
  size: 'large',
  flags: ['rounded'],
  state: 'loading',
});
// Generates: 'bg-yellow-500 text-black text-xl rounded-full animate-pulse'
```

## Theme Extensions

You can extend your theme to add more customization for specific parts of a component using the extensions key:

```ts
const complexTheme = defineTheme({
  variants: {
    primary: 'bg-blue-600',
  },
  extensions: {
    button: {
      sizes: {
        small: 'py-2 px-4',
        large: 'py-4 px-8',
      },
    },
  },
});

// Generate classes for a specific button
cnt({ size: 'large', ext: 'button' }); // 'py-4 px-8'
```

# License

This project is licensed under the MIT License.
