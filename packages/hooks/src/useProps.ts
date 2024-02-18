import { GlobalProps } from 'packages/types';
import { ClassNamesArgs, useClasses } from './useClasses';

interface PropsArgs extends GlobalProps {}

interface RootPropsArgs {
	classNames: ClassNamesArgs;
}

export function useProps<T>(name: string, props?: PropsArgs & T) {
	const {
		id,
		style,
		className,
		'data-testid': testId,
		...componentProps
	} = props || ({} as PropsArgs & T);
	const { clsx } = useClasses(name);

	return {
		clsx,
		componentProps,
		rootProps(args?: RootPropsArgs) {
			const { classNames } = args || {};

			return {
				id,
				style,
				className: clsx({
					classNames: [classNames, className],
					prefixedNames: 'root',
				}),
				'data-testid': testId,
			};
		},
	};
}
