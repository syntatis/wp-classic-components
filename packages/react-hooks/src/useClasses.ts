// eslint-disable-next-line import/no-named-as-default
import clsx from 'clsx';

type Value = string | number | boolean | undefined | null;
type Mapping = Record<string, unknown>;
type Argument = Value | Mapping | ArgumentArray;
type ArgumentArray = Argument[];

export type ClassNamesArgs = Argument | ArgumentArray;

interface ClsxArgs {
	classNames?: ClassNamesArgs;
	prefixedNames?: string | string[];
}

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
	clsx: (args: ClsxArgs) => string;
}

export function parsePrefixedNames(names: string | string[]): string[] {
	if (typeof names === 'string') {
		return names.split(' ');
	}

	return names.map((name) => name.split(' ')).flat();
}

export function useClasses(component: string): ClassesReturn {
	const prefix = `wp-classic-${component}-`;

	return {
		clsx: (args: ClsxArgs) => {
			const { prefixedNames = '', classNames = '' } = args;
			const prefixed = parsePrefixedNames(prefixedNames).map(
				(name) => `${prefix}${name}`
			);

			return clsx(prefixed, classNames);
		},
	};
}
