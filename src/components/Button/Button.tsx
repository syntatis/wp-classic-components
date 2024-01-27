import { filterDOMProps, mergeProps, useObjectRef } from '@react-aria/utils';
import { ReactNode, forwardRef } from 'react';
import {
	AriaButtonProps,
	HoverProps,
	useButton,
	useFocusRing,
	useHover,
} from 'react-aria';
import { useClasses } from '~/hooks';
import { Affixable, Styleable } from '~/types';
import classes from './Button.module.scss';

interface ButtonProps
	extends HoverProps,
		Styleable,
		Affixable,
		Omit<AriaButtonProps, 'elementType' | 'target'> {
	children?: ReactNode;
	/**
	 * The variant of the button.
	 *
	 * @default 'primary'
	 */
	variant?: 'primary' | 'secondary';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	(props, forwardedRef) => {
		const {
			children,
			variant = 'primary',
			className,
			prefix,
			suffix,
			autoFocus,
			style,
		} = props;
		const ref = useObjectRef(forwardedRef);
		const { buttonProps } = useButton(props, ref);
		const { hoverProps } = useHover(props);
		const { focusProps } = useFocusRing({ autoFocus });
		const { clsx } = useClasses('Button');
		const hasAffix = !!prefix || !!suffix;

		return (
			<button
				{...filterDOMProps(props, { labelable: true })}
				{...mergeProps(buttonProps, hoverProps, focusProps)}
				style={style}
				className={clsx('root', [
					classes.root,
					`button button-${variant}`,
					className,
				])}
				data-has-affix={hasAffix || undefined}
			>
				{prefix && (
					<span
						className={clsx('affix', [
							clsx('prefix', [classes.prefix]),
							classes.affix,
						])}
					>
						{prefix}
					</span>
				)}
				{hasAffix ?
					<span
						className={clsx('affix', [
							clsx('infix', [classes.infix]),
							classes.affix,
						])}
					>
						{children}
					</span>
				:	children}
				{suffix && (
					<span
						className={clsx('affix', [
							clsx('suffix', [classes.suffix]),
							classes.affix,
						])}
					>
						{suffix}
					</span>
				)}
			</button>
		);
	}
);

Button.displayName = 'Button';
