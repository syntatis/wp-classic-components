import { filterDOMProps, mergeProps, useObjectRef } from '@react-aria/utils';
import { ReactNode, forwardRef } from 'react';
import { AriaLinkOptions, HoverProps, useHover, useLink } from 'react-aria';
import { useClasses } from '~/hooks';
import { GlobalAttributes } from '~/types';
import classes from './Link.module.scss';

export interface LinkProps
	extends GlobalAttributes,
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
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
	(props, forwardedRef) => {
		const { children, className, severity } = props;
		const ref = useObjectRef(forwardedRef);
		const { linkProps } = useLink(props, ref);
		const { hoverProps } = useHover(props);
		const { clsx } = useClasses('Link');

		return (
			<a
				{...filterDOMProps(props, { labelable: true, isLink: true })}
				{...mergeProps(linkProps, hoverProps)}
				ref={ref}
				className={clsx({
					prefixed: 'root',
					classNames: [
						classes.root,
						{
							[classes.severityWarning]: severity === 'warning',
							[classes.severityDanger]: severity === 'danger',
						},
						className,
					],
				})}
			>
				{children}
			</a>
		);
	}
);

Link.displayName = 'Link';
