import { filterDOMProps, useObjectRef } from '@react-aria/utils';
import { ReactNode, forwardRef } from 'react';
import { useButton } from 'react-aria';
import { useClasses } from '~/hooks';
import { GlobalAttributes } from '~/types';
import classes from './Notice.module.scss';

interface NoticeProps extends GlobalAttributes {
	children: ReactNode;
	/**
	 * The variant of the notice.
	 *
	 * @default 'info'
	 */
	variant?: 'info' | 'success' | 'warning' | 'error';
	/**
	 * Determines whether the notice can be dismissed. You can customize the label
	 * of the dismiss button by passing an object, which is useful for
	 * translating the label.
	 *
	 * @default false
	 */
	dismissable?: boolean | { label: string };
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
			variant = 'info',
			onDismiss,
		} = props;
		const ref = useObjectRef(forwardedRef);
		const buttonRef = useObjectRef<HTMLButtonElement>(null);
		const { clsx } = useClasses('Notice');
		const { buttonProps } = useButton(
			{
				...props,
				onPress: () => onDismiss?.(),
			},
			buttonRef
		);

		return (
			<div
				{...filterDOMProps(props)}
				ref={ref}
				className={clsx({
					prefixed: 'root',
					classNames: ['notice', `notice-${variant}`, classes.root, className],
				})}
			>
				<div
					className={clsx({
						prefixed: 'content',
						classNames: classes.content,
					})}
				>
					{children}
				</div>
				{dismissable && (
					<button
						{...buttonProps}
						className="notice-dismiss"
						type="button"
						aria-label={
							typeof dismissable === 'object' ?
								dismissable.label
							:	'Dismiss this notice'
						}
					/>
				)}
			</div>
		);
	}
);

Notice.displayName = 'Notice';
