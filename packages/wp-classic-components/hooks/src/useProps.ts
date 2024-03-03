import { GlobalProps } from '@/types';
import { ClassNamesArgs, useClasses } from './useClasses';

interface ComponentPropsArgs extends GlobalProps {}

interface RootPropsArgs {
	classNames?: ClassNamesArgs;
	prefixedNames?: string | string[];
}

export function useProps<T>(name: string, props?: ComponentPropsArgs & T) {
	const {
		className,
		'data-testid': testId,
		id,
		style,
		...componentProps
	} = props || ({} as ComponentPropsArgs & T);
	const { clsx } = useClasses(name);

	return {
		clsx,
		componentProps: {
			...componentProps,
			id,
		},
		rootProps(args?: RootPropsArgs) {
			const { classNames, prefixedNames } = args || {};

			return {
				className: clsx({
					classNames: [classNames, className],
					prefixedNames: prefixedNames || 'root',
				}),
				'data-testid': testId,
				id: id ? `${id}-${name}-root` : undefined,
				style,
			};
		},
	};
}
