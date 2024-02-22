import { useObjectRef } from '@react-aria/utils';
import { useProps } from 'packages/hooks';
import { GlobalProps } from 'packages/types';
import { ReactNode, forwardRef } from 'react';
import { useButton } from 'react-aria';
import * as classes from './Notice.module.scss';

interface NoticeProps extends GlobalProps {
	children: ReactNode;
	/**
	 * Determines whether the notice can be dismissed. You can customize the label
	 * of the dismiss button by passing an object, which is useful for
	 * translating the label.
	 *
	 * @default false
	 */
	dismissable?: { label: string } | boolean;
	/**
	 * Whether the notice should be dismissed.
	 *
	 * @default false
	 */
	isDismissed?: boolean;
	/**
	 * The severity level of the notice.
	 *
	 * @default 'info'
	 */
	level?: 'error' | 'info' | 'success' | 'warning';
	/**
	 * The callback to call when the notice is dismissed.
	 */
	onDismiss?: () => void;
	/**
	 * The notice style variations.
	 *
	 * @default 'default'
	 */
	variant?: 'alt' | 'default';
}

export const Notice = forwardRef<HTMLDivElement, NoticeProps>(
	(props, forwardedRef) => {
		const {
			children,
			dismissable = false,
			isDismissed,
			level = 'info',
			onDismiss,
			variant,
		} = props;
		const ref = useObjectRef(forwardedRef);
		const buttonRef = useObjectRef<HTMLButtonElement>(null);
		const { clsx, rootProps } = useProps('Notice', props);
		const { buttonProps } = useButton(
			{
				onPress: () => onDismiss?.(),
			},
			buttonRef
		);
		const isDismissable =
			dismissable === true ||
			(typeof dismissable === 'object' && dismissable.label);

		return (
			!isDismissed && (
				<div
					{...rootProps({
						classNames: [
							'notice',
							`notice-${level}`,
							classes.root,
							{ 'notice-alt': variant === 'alt' },
						],
					})}
					ref={ref}
				>
					<div
						className={clsx({
							classNames: classes.content,
							prefixedNames: 'content',
						})}
					>
						{children}
					</div>
					{isDismissable && (
						<button
							{...buttonProps}
							aria-label={
								typeof dismissable === 'object' ?
									dismissable.label
								:	'Dismiss notice'
							}
							className="notice-dismiss"
							type="button"
						/>
					)}
				</div>
			)
		);
	}
);

Notice.displayName = 'Notice';
