import { filterDOMProps, mergeProps, useObjectRef } from '@react-aria/utils';
import { ReactNode, forwardRef } from 'react';
import {
	AriaButtonProps,
	HoverProps,
	useButton,
	useFocusRing,
	useHover,
} from 'react-aria';
import classes from './Button.module.scss';
import { useClasses } from '../../hooks';
import { Affixable, GlobalProps } from '../../types';

interface ButtonProps
	extends GlobalProps,
		Affixable,
		HoverProps,
		Omit<AriaButtonProps, 'elementType' | 'target'> {
	children?: ReactNode;
	/**
	 * The variant of the button.
	 *
	 * @default 'primary'
	 */
	variant?: 'primary' | 'secondary' | 'link' | 'link-danger';
	/**
	 * The size of the button.
	 */
	size?: 'small' | 'large' | 'hero';
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
			size,
			role,
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
				role={role}
				className={clsx({
					prefixedNames: 'root',
					classNames: [
						`${size ? `button-${size}` : ''}`,
						'button',
						`button-${variant}`,
						{
							[classes.hasAffix]: hasAffix,
							'button-link-delete': variant === 'link-danger',
						},
						className,
						classes.root,
					],
				})}
			>
				{prefix && (
					<span
						className={clsx({
							prefixedNames: ['affix', 'prefix'],
							classNames: [classes.prefix, classes.affix],
						})}
					>
						{prefix}
					</span>
				)}
				{hasAffix ?
					<span
						className={clsx({
							prefixedNames: ['affix', 'infix'],
							classNames: [classes.infix, classes.affix],
						})}
					>
						{children}
					</span>
				:	children}
				{suffix && (
					<span
						className={clsx({
							prefixedNames: ['affix', 'suffix'],
							classNames: [classes.suffix, classes.affix],
						})}
					>
						{suffix}
					</span>
				)}
			</button>
		);
	}
);

Button.displayName = 'Button';
