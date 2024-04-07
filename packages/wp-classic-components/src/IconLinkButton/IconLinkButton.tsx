import { mergeProps, useObjectRef } from '@react-aria/utils';
import { Icon } from '@wordpress/icons';
import { IconProps } from '@wordpress/icons/build-types/icon';
import { ReactElement, forwardRef } from 'react';
import { AriaLinkOptions, HoverProps, useHover, useLink } from 'react-aria';
import { useProps } from '../../hooks';
import { GlobalProps } from '../../types';
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
	/**
	 * The button label.
	 *
	 * Since the button will only display an icon, it is required to provide the `aria-label`.
	 * This label will be used to give the button an accessible label.  Similar to a regular
	 * button It is highly recommended to provide the label that describes the action that
	 * the button will perform, such as 'Close dialog' or 'Download'.
	 * See [MDN](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label).
	 */
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

/**
 * ```jsx
 * import { IconLinkButton } from '@syntatis/wp-classic-components';
 * ```
 *
 * The `IconLinkButton` component is a link that looks like a button. It is a combination
 * of the LinkButton` component that it inherits similar styles, sizes, variants, and
 * props like the href, target, and rel. One difference is that it will maintain a
 * it will maintain 1:1 ratio of its size.
 *
 * For the icon, checkout the official WordPress icon component [@wordpress/icons](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-icons/).
 */
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
