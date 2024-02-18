import { mergeProps, useObjectRef } from '@react-aria/utils';
import { useProps } from '@syntatis/react-hooks';
import { GlobalProps } from '@syntatis/types';
import { ReactNode, forwardRef } from 'react';
import { AriaLinkOptions, HoverProps, useHover, useLink } from 'react-aria';
import * as classes from './Link.module.scss';

export interface LinkProps
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
	 */
	variant?: 'warning' | 'danger';
	/**
	 * The content displayed before the link label.
	 */
	prefix?: ReactNode;
	/**
	 * The content displayed after the link label.
	 */
	suffix?: ReactNode;
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
	(props, forwardedRef) => {
		const { children, variant, prefix, suffix } = props;
		const ref = useObjectRef(forwardedRef);
		const { clsx, rootProps, componentProps } = useProps('Link', props);
		const { linkProps } = useLink(componentProps, ref);
		const { hoverProps } = useHover(componentProps);
		const hasAffix = !!prefix || !!suffix;

		return (
			<a
				{...rootProps({
					classNames: [
						classes.root,
						{
							[classes.hasAffix]: hasAffix,
							[classes.variantDanger]: variant === 'danger',
							[classes.variantWarning]: variant === 'warning',
						},
					],
				})}
				{...mergeProps(linkProps, hoverProps)}
				ref={ref}
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

Link.displayName = 'Link';
