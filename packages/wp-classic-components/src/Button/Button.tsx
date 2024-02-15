import { mergeProps, useObjectRef } from '@react-aria/utils';
import { useProps } from 'modules/hooks';
import { Affixable, GlobalProps } from 'modules/types';
import { ReactNode, forwardRef } from 'react';
import {
	AriaButtonProps,
	HoverProps,
	useButton,
	useFocusRing,
	useHover,
} from 'react-aria';
import * as classes from './Button.module.scss';

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
			prefix,
			suffix,
			autoFocus,
			size,
			role,
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
						`${variant === 'link-danger' ? 'button-link' : `button-${variant}`}`,
						{
							[classes.hasAffix]: hasAffix,
							'button-link-delete': variant === 'link-danger',
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
