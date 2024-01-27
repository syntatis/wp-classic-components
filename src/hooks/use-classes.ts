import cx from 'clsx';

type Value = string | number | boolean | undefined | null;
type Mapping = Record<string, unknown>;
type Argument = Value | Mapping | ArgumentArray;
type ArgumentArray = Argument[];

interface ClsxArgs {
	prefixed: string | string[];
	classNames: Argument | ArgumentArray;
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

export function useClasses(component: string): ClassesReturn {
	const prefix = `wp-classic-${component}-`;

	return {
		clsx: (args: ClsxArgs) => {
			const { prefixed, classNames } = args;
			const prefixedNames = (
				typeof prefixed === 'string' ?
					prefixed.split(' ')
				:	prefixed).map((name) => `${prefix}${name}`);

			return cx(prefixedNames, classNames);
		},
	};
}
