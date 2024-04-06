import { useProps } from '@/hooks';
import { GlobalProps } from '@/types';
import { mergeProps, useObjectRef } from '@react-aria/utils';
import { Icon } from '@wordpress/icons';
import { IconProps } from '@wordpress/icons/build-types/icon';
import { ReactElement, forwardRef } from 'react';
import {
	AriaButtonProps,
	HoverProps,
	useButton,
	useFocusRing,
	useHover,
} from 'react-aria';
import * as classes from './IconButton.module.scss';

interface IconButtonProps
	extends GlobalProps,
		HoverProps,
		Omit<AriaButtonProps, 'aria-label' | 'elementType' | 'target'> {
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
 * import { IconButton } from '@syntatis/wp-classic-components';
 * ```
 *
 * The `IconButton` component is used to render a button with an icon. It is similar
 * to the `Button` component. It has the variations and sizes, except that the
 * size will always has a 1:1 ratio. It is typically used space is or may be
 * limited such as in a toolbar, a dialog, or a navigation.
 *
 * For the icon, checkout the official WordPress icon component [@wordpress/icons](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-icons/).
 */
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
	(props, forwardedRef) => {
		const { autoFocus, children, role, size, variant = 'primary' } = props;
		const ref = useObjectRef(forwardedRef);
		const { buttonProps } = useButton(props, ref);
		const { hoverProps } = useHover(props);
		const { focusProps } = useFocusRing({ autoFocus });
		const { rootProps } = useProps('IconButton', props);

		return (
			<button
				{...rootProps({
					classNames: [
						'button',
						`${size ? `button-${size}` : ''}`,
						`button-${variant}`,
						classes.root,
					],
				})}
				{...mergeProps(buttonProps, hoverProps, focusProps)}
				role={role}
			>
				{children}
			</button>
		);
	}
);

IconButton.displayName = 'IconButton';
