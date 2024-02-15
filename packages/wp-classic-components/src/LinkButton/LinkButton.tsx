import { mergeProps, useObjectRef } from '@react-aria/utils';
import { useProps } from 'modules/hooks';
import { GlobalProps } from 'modules/types';
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
	children: ReactNode;
	/**
	 * Change the link variant.
	 *
	 * @default 'primary'
	 */
	variant?: 'primary' | 'secondary';
	/**
	 * The size of the button.
	 */
	size?: 'small' | 'large' | 'hero';
	/**
	 * The content displayed before the link label.
	 */
	prefix?: ReactNode;
	/**
	 * The content displayed after the link label.
	 */
	suffix?: ReactNode;
}

export const LinkButton = forwardRef<HTMLAnchorElement, LinkButtonProps>(
	(props, forwardedRef) => {
		const { children, variant = DEFAULT_VARIANT, size } = props;
		const ref = useObjectRef(forwardedRef);
		const { clsx, rootProps, componentProps } = useProps('LinkButton', props);
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

LinkButton.displayName = 'LinkButton';
