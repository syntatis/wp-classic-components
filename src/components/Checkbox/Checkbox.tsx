import { filterDOMProps, mergeProps, useObjectRef } from '@react-aria/utils';
import { ReactNode, forwardRef } from 'react';
import { AriaLinkOptions, HoverProps, useHover, useLink } from 'react-aria';
import { HTMLGlobalAttributes } from '~/types';

export interface LinkProps
	extends HTMLGlobalAttributes,
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
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
	(props, forwardedRef) => {
		const { children } = props;
		const ref = useObjectRef(forwardedRef);
		const { linkProps } = useLink(props, ref);
		const { hoverProps } = useHover(props);

		return (
			<a
				{...filterDOMProps(props, { labelable: true })}
				{...mergeProps(linkProps, hoverProps)}
				ref={ref}
			>
				{children}
			</a>
		);
	}
);

Link.displayName = 'Link';
