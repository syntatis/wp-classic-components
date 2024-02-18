import { mergeProps, useObjectRef } from '@react-aria/utils';
import { useProps } from 'packages/hooks';
import { GlobalProps } from 'packages/types';
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
	 * The content displayed before the link label.
	 */
	prefix?: ReactNode;
	/**
	 * The content displayed after the link label.
	 */
	suffix?: ReactNode;
	/**
	 * Change the link variant.
	 */
	variant?: 'danger' | 'warning';
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
	(props, forwardedRef) => {
		const { children, prefix, suffix, variant } = props;
		const ref = useObjectRef(forwardedRef);
		const { clsx, componentProps, rootProps } = useProps('Link', props);
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
			</a>
		);
	}
);

Link.displayName = 'Link';
