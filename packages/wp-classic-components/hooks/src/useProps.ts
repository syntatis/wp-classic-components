import { GlobalProps } from '@/types';
import { ClassNamesArgs, useClasses } from './useClasses';

interface PropsArgs extends GlobalProps {}

interface RootPropsArgs {
	classNames: ClassNamesArgs;
}

export function useProps<T>(name: string, props?: PropsArgs & T) {
	const {
		className,
		'data-testid': testId,
		id,
		style,
		...componentProps
	} = props || ({} as PropsArgs & T);
	const { clsx } = useClasses(name);

	return {
		clsx,
		componentProps,
		rootProps(args?: RootPropsArgs) {
			const { classNames } = args || {};

			return {
				className: clsx({
					classNames: [classNames, className],
					prefixedNames: 'root',
				}),
				'data-testid': testId,
				id,
				style,
			};
		},
	};
}
