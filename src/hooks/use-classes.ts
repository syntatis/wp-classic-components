import cx from 'clsx';

type Value = string | number | boolean | undefined | null;
type Mapping = Record<string, unknown>;
type Argument = Value | Mapping | ArgumentArray;
type ArgumentArray = Argument[];

interface ClassesReturn {
  /**
   * The `cx` function is used to generate class names for a component.
   *
   * It takes a name as the first argument and a list of classes.
   * The first argument is prefixed with the component name.
   * For example, if the component name is `Link` and you
   * pass `root` as the first argument, the resulting
   * class name will be wp-classic-Link-root.
   */
  clsx: (name: string, classes: ArgumentArray) => string;
}

export function useClasses(component: string): ClassesReturn {
  const prefix = `wp-classic-${component}-`;

  return {
    clsx: (name: string, classes: ArgumentArray) => {
      return cx(`${prefix}${name}`, ...classes);
    },
  };
}
