import { mergeProps, useObjectRef } from '@react-aria/utils';
import { Icon } from '@wordpress/icons';
import { IconProps } from '@wordpress/icons/build-types/icon';
import { useProps } from 'packages/hooks';
import { GlobalProps } from 'packages/types';
import { ReactElement, forwardRef } from 'react';
import { AriaLinkOptions, HoverProps, useHover, useLink } from 'react-aria';
import * as classes from './IconLinkButton.module.scss';

export interface IconLinkButtonProps
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
	'aria-label': string;
	children: ReactElement<IconProps, typeof Icon>;
	/**
	 * The size of the button.
	 */
	size?: 'large' | 'small';
	/**
	 * The variant of the button.
	 *
	 * @default 'primary'
	 */
	variant?: 'primary' | 'secondary';
}

export const IconLinkButton = forwardRef<
	HTMLAnchorElement,
	IconLinkButtonProps
>((props, forwardedRef) => {
	const { children, size, variant = 'primary' } = props;
	const ref = useObjectRef(forwardedRef);
	const { componentProps, rootProps } = useProps('IconLinkButton', props);
	const { linkProps } = useLink(componentProps, ref);
	const { hoverProps } = useHover(componentProps);

	return (
		<a
			{...rootProps({
				classNames: [
					'button',
					`${size ? `button-${size}` : ''}`,
					`button-${variant}`,
					classes.root,
				],
			})}
			{...mergeProps(linkProps, hoverProps)}
			ref={ref}
		>
			{children}
		</a>
	);
});

IconLinkButton.displayName = 'IconLinkButton';
