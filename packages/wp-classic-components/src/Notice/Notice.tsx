import { useObjectRef } from '@react-aria/utils';
import { useProps } from '@syntatis/react-hooks';
import { GlobalProps } from '@syntatis/types';
import { ReactNode, forwardRef } from 'react';
import { useButton } from 'react-aria';
import * as classes from './Notice.module.scss';

interface NoticeProps extends GlobalProps {
	children: ReactNode;
	/**
	 * The severity level of the notice.
	 *
	 * @default 'info'
	 */
	level?: 'info' | 'success' | 'warning' | 'error';
	/**
	 * The notice style variations.
	 *
	 * @default 'default'
	 */
	variant?: 'default' | 'alt';
	/**
	 * Determines whether the notice can be dismissed. You can customize the label
	 * of the dismiss button by passing an object, which is useful for
	 * translating the label.
	 *
	 * @default false
	 */
	dismissable?: boolean | { label: string };
	/**
	 * Whether the notice should be dismissed.
	 *
	 * @default false
	 */
	isDismissed?: boolean;
	/**
	 * The callback to call when the notice is dismissed.
	 */
	onDismiss?: () => void;
}

export const Notice = forwardRef<HTMLDivElement, NoticeProps>(
	(props, forwardedRef) => {
		const {
			children,
			dismissable = false,
			level = 'info',
			variant,
			isDismissed,
			onDismiss,
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
							prefixedNames: 'content',
							classNames: classes.content,
						})}
					>
						{children}
					</div>
					{isDismissable && (
						<button
							{...buttonProps}
							className="notice-dismiss"
							type="button"
							aria-label={
								typeof dismissable === 'object' ?
									dismissable.label
								:	'Dismiss notice'
							}
						/>
					)}
				</div>
			)
		);
	}
);

Notice.displayName = 'Notice';
