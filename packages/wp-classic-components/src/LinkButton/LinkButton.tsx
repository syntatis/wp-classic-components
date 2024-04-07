import { useProps } from '@/hooks';
import { GlobalProps } from '@/types';
import { mergeProps, useObjectRef } from '@react-aria/utils';
import { ReactNode, forwardRef } from 'react';
import { AriaLinkOptions, HoverProps, useHover, useLink } from 'react-aria';
import * as classes from './LinkButton.module.scss';

const DEFAULT_VARIANT = 'primary';

export interface LinkButtonProps
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
	children?: ReactNode;
	/**
	 * The content displayed before the link label.
	 */
	prefix?: ReactNode;
	/**
	 * The size of the button.
	 */
	size?: 'hero' | 'large' | 'small';
	/**
	 * The content displayed after the link label.
	 */
	suffix?: ReactNode;
	/**
	 * Change the link variant.
	 *
	 * @default 'primary'
	 */
	variant?: 'primary' | 'secondary';
}

/**
 * ```jsx
 * import { LinkButton } from '@syntatis/wp-classic-components';
 * ```
 *
 * The `LinkButton` component is similar to the `Link` component. It creates an
 * anchor element that functions as a button. It has the same styles, variants,
 * and sizes as the `Button` component. You can also add a prefix or suffix to
 * provide additional context, such as an icon.
 */
export const LinkButton = forwardRef<HTMLAnchorElement, LinkButtonProps>(
	(props, forwardedRef) => {
		const { children, size, variant = DEFAULT_VARIANT } = props;
		const ref = useObjectRef(forwardedRef);
		const { clsx, componentProps, rootProps } = useProps('LinkButton', props);
		const { linkProps } = useLink(componentProps, ref);
		const { hoverProps } = useHover(componentProps);
		const { prefix, suffix } = props;
		const hasAffix = !!prefix || !!suffix;

		return (
			<a
				{...rootProps({
					classNames: [
						'button',
						`${size ? `button-${size}` : ''}`,
						`button-${variant}`,
						classes.root,
						{
							[classes.hasAffix]: hasAffix,
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

LinkButton.displayName = 'LinkButton';
