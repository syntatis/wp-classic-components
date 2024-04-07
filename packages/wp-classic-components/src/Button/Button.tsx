import { mergeProps, useObjectRef } from '@react-aria/utils';
import { ReactNode, forwardRef } from 'react';
import {
	AriaButtonProps,
	HoverProps,
	useButton,
	useFocusRing,
	useHover,
} from 'react-aria';
import { useProps } from '../../hooks';
import { Affixable, GlobalProps } from '../../types';
import * as classes from './Button.module.scss';

interface ButtonProps
	extends AriaButtonProps,
		GlobalProps,
		Affixable,
		HoverProps {
	children?: ReactNode;
	/**
	 * The size of the button.
	 */
	size?: 'hero' | 'large' | 'small';
	/**
	 * The variant of the button.
	 *
	 * @default 'primary'
	 */
	variant?: 'link' | 'link-danger' | 'primary' | 'secondary';
}

/**
 * ```jsx
 * import { Button } from '@syntatis/wp-classic-components';
 * ```
 *
 * The `Button` component represents the HTML button element to trigger an action
 * or event, with mouse, touch, and keyboard interactions. It comes with a set
 * of predefined variants and size options. Additionally, it can be extended
 * with "prefix" and "suffix" to add icons or other elements before or after
 * the button label.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	(props, forwardedRef) => {
		const {
			autoFocus,
			children,
			prefix,
			role,
			size,
			suffix,
			variant = 'primary',
		} = props;
		const ref = useObjectRef(forwardedRef);
		const { buttonProps } = useButton(props, ref);
		const { hoverProps } = useHover(props);
		const { focusProps } = useFocusRing({ autoFocus });
		const { clsx, rootProps } = useProps('Button', props);
		const hasAffix = !!prefix || !!suffix;

		return (
			<button
				{...rootProps({
					classNames: [
						'button',
						`${size ? `button-${size}` : ''}`,
						`button-${variant === 'link-danger' ? 'link' : variant}`,
						{
							'button-link-delete': variant === 'link-danger',
							[classes.hasAffix]: hasAffix,
						},
						classes.root,
					],
				})}
				{...mergeProps(buttonProps, hoverProps, focusProps)}
				role={role}
			>
				{prefix && (
					<span
						className={clsx({
							classNames: [classes.prefix, classes.affix],
							prefixedNames: ['affix', 'prefix'],
						})}
					>
						{prefix}
					</span>
				)}
				{hasAffix ?
					<span
						className={clsx({
							classNames: [classes.infix, classes.affix],
							prefixedNames: ['affix', 'infix'],
						})}
					>
						{children}
					</span>
				:	children}
				{suffix && (
					<span
						className={clsx({
							classNames: [classes.suffix, classes.affix],
							prefixedNames: ['affix', 'suffix'],
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
