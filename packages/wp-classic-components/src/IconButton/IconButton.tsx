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
		Omit<AriaButtonProps, 'elementType' | 'target' | 'aria-label'> {
	'aria-label': string;
	children: ReactElement<IconProps, typeof Icon>;
	/**
	 * The variant of the button.
	 *
	 * @default 'primary'
	 */
	variant?: 'primary' | 'secondary';
	/**
	 * The size of the button.
	 */
	size?: 'small' | 'large';
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
	(props, forwardedRef) => {
		const { children, variant = 'primary', autoFocus, size, role } = props;
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
