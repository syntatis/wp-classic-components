import { filterDOMProps, mergeProps, useObjectRef } from '@react-aria/utils';
import { ReactNode, forwardRef } from 'react';
import { AriaLinkOptions, HoverProps, useHover, useLink } from 'react-aria';
import classes from './Link.module.scss';
import { useClasses } from '../../hooks';
import { GlobalProps } from '../../types';

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
	 * Specify the level or severity that the link will carry out.
	 */
	severity?: 'warning' | 'danger';
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
		const { children, className, severity, prefix, suffix } = props;
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
						{
							[classes.severityWarning]: severity === 'warning',
							[classes.severityDanger]: severity === 'danger',
							[classes.hasAffix]: hasAffix,
						},
						className,
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

Link.displayName = 'Link';
