import { filterDOMProps, mergeProps, useObjectRef } from '@react-aria/utils';
import { ReactNode, forwardRef } from 'react';
import { AriaLinkOptions, HoverProps, useHover, useLink } from 'react-aria';
import * as classes from './LinkButton.module.scss';
import { useClasses } from '../../hooks';
import { GlobalProps } from '../../types';

const DEFAULT_VARIANT = 'primary';

export interface LinkButtonProps
	extends GlobalProps,
		Omit<HoverProps, 'isDisabled'>,
		Omit<
			AriaLinkOptions,
			| 'isDisabled'
			| 'onKeyDown'
			| 'onKeyUp'
			| 'onPress'
			| 'onPressChange'
			| 'onPressEnd'
			| 'onPressStart'
			| 'onPressUp'
		> {
	/**
	 * The content to display inside the link.
	 */
	children: ReactNode;
	/**
	 * Change the link variant.
	 *
	 * @default 'primary'
	 */
	variant?: 'primary' | 'secondary';
	/**
	 * The size of the button.
	 */
	size?: 'small' | 'large' | 'hero';
	/**
	 * The content displayed before the link label.
	 */
	prefix?: ReactNode;
	/**
	 * The content displayed after the link label.
	 */
	suffix?: ReactNode;
}

export const LinkButton = forwardRef<HTMLAnchorElement, LinkButtonProps>(
	(props, forwardedRef) => {
		const {
			children,
			className,
			variant = DEFAULT_VARIANT,
			size,
			prefix,
			suffix,
			style,
		} = props;
		const ref = useObjectRef(forwardedRef);
		const { linkProps } = useLink(props, ref);
		const { hoverProps } = useHover(props);
		const { clsx } = useClasses('Link');
		const hasAffix = !!prefix || !!suffix;

		return (
			<a
				{...filterDOMProps(props, { labelable: true, isLink: true })}
				{...mergeProps(linkProps, hoverProps)}
				ref={ref}
				style={style}
				className={clsx({
					prefixedNames: 'root',
					classNames: [
						'button',
						`button-${variant}`,
						`${size ? `button-${size}` : ''}`,
						classes.root,
						className,
						{
							[classes.hasAffix]: hasAffix,
						},
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
			</a>
		);
	}
);

LinkButton.displayName = 'LinkButton';
