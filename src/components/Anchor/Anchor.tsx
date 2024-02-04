import { filterDOMProps, mergeProps, useObjectRef } from '@react-aria/utils';
import { ReactNode, forwardRef } from 'react';
import { AriaLinkOptions, HoverProps, useHover, useLink } from 'react-aria';
import classes from './Anchor.module.scss';
import { useClasses } from '../../hooks';
import { GlobalProps } from '../../types';

export interface AnchorProps
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

export const Anchor = forwardRef<HTMLAnchorElement, AnchorProps>(
	(props, forwardedRef) => {
		const { children, className, variant, prefix, suffix } = props;
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
				className={clsx({
					prefixedNames: 'root',
					classNames: [
						classes.root,
						className,
						{
							[classes.hasAffix]: hasAffix,
							[classes.variantDanger]: variant === 'danger',
							[classes.variantWarning]: variant === 'warning',
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

Anchor.displayName = 'Anchor';
