import { filterDOMProps, useObjectRef } from '@react-aria/utils';
import { ReactNode, forwardRef } from 'react';
import { useButton } from 'react-aria';
import classes from './Notice.module.scss';
import { useClasses } from '../../hooks';
import { GlobalProps } from '../../types';

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
			className,
			dismissable = false,
			level = 'info',
			variant,
			style,
			isDismissed,
			onDismiss,
		} = props;
		const ref = useObjectRef(forwardedRef);
		const buttonRef = useObjectRef<HTMLButtonElement>(null);
		const { clsx } = useClasses('Notice');
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
					{...filterDOMProps(props, { labelable: true })}
					ref={ref}
					style={style}
					className={clsx({
						prefixedNames: 'root',
						classNames: [
							'notice',
							`notice-${level}`,
							classes.root,
							className,
							{ 'notice-alt': variant === 'alt' },
						],
					})}
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
