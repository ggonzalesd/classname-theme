# Classname Theme

`classname-theme` es una librería ligera que te permite configurar y generar temas rápidamente para componentes utilizando clases de Tailwind. Está diseñada para proporcionar una forma flexible de gestionar variantes, tamaños, estados, y más, en la personalización de componentes.

Instalación
Para instalar la librería, utiliza npm:

```bash
npm install classname-theme
```

## Uso básico

La función principal de la librería es defineTheme, que te permite definir un tema y luego generar clases de forma sencilla para tus componentes.

### Ejemplo de uso

1. Define un tema utilizando `defineTheme`:

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

2. Genera clases dinámicamente para tus componentes:

```ts
// Usando la variante 'primary' por defecto
cnt(); // 'bg-blue-500 text-white'

// Especificando una variante
cnt({ variant: 'secondary' }); // 'bg-gray-500 text-white'
```

## Definición de un tema

Los temas son objetos que permiten definir variantes, tamaños, estados, banderas y opciones de manera flexible. Aquí están las claves principales que puedes utilizar:

- **variants**: Define las variantes del componente, como primary o secondary.
- **sizes**: Especifica diferentes tamaños, como small o large.
- **states**: Opcionalmente, define estados como hover o focus.
- **flags**: Añade banderas o modificadores adicionales que puedan combinarse.
- **options**: Define opciones personalizadas para elementos específicos dentro del tema.

## Parámetros de la función cnt

Puedes personalizar las clases generadas utilizando varios parámetros:

- **variant**: Define la variante del componente (ej. primary, secondary).
- **size**: Define el tamaño del componente (ej. small, large).
- **flags**: Especifica una bandera o varias (ej. rounded, shadow).
- **state**: Define el estado actual (ej. hover, focus).
- **options**: Pasa opciones adicionales específicas del componente.

## Ejemplo completo

```ts
// Definiendo un tema más complejo
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
// Genera: 'bg-yellow-500 text-black text-xl rounded-full animate-pulse'
```

## Extensiones del tema

Puedes extender tu tema para añadir más personalización a partes específicas de un componente utilizando la clave extensions:

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

// Genera clases para un botón específico
cnt({ size: 'large', ext: 'button' }); // 'py-4 px-8'
```

# Licencia

Este proyecto está bajo la licencia MIT.
