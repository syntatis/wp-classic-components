import { useProps } from '@/hooks';
import { GlobalProps } from '@/types';
import { useObjectRef } from '@react-aria/utils';
import { ReactNode, forwardRef } from 'react';
import { useButton } from 'react-aria';
import * as classes from './Notice.module.scss';

const DEFAULT_LEVEL = 'info';
const DEFAULT_VARIANT = 'default';

interface NoticeProps extends GlobalProps {
	/**
	 * The content to display inside the notice.
	 */
	children: ReactNode;
	/**
	 * Determines whether the notice can be dismissed. You can customize the label
	 * of the dismiss button by passing an object, which is useful for
	 * translating the label.
	 *
	 * @default false
	 */
	isDismissable?: { label: string } | boolean;
	/**
	 * Whether the notice should be dismissed. When it is set to `true`, the notice
	 * will be hidden. This is useful when the notice "dismissed" state should be
	 * controlled by an external source like a parent component, global state,
	 * or a context.
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
			isDismissable = false,
			isDismissed,
			level = DEFAULT_LEVEL,
			onDismiss,
			variant = DEFAULT_VARIANT,
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
								typeof isDismissable === 'object' ?
									isDismissable.label
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
