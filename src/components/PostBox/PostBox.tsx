import { filterDOMProps, useObjectRef } from '@react-aria/utils';
import { ReactNode, forwardRef, useId, useRef, useState } from 'react';
import { useButton } from 'react-aria';
import { useClasses } from '~/hooks';
import { GlobalAttributes } from '~/types';
import classes from './PostBox.module.scss';

interface PostBoxProps extends GlobalAttributes {
	/**
	 * The title of the post box.
	 *
	 * @example 'Welcome'
	 */
	title: ReactNode;
	/**
	 * The content to add in the post box. It can be a simple text,
	 * inputs, buttons, etc.
	 */
	children?: ReactNode;
	/**
	 * The content to add in the footer of the content.
	 */
	footer?: ReactNode | ReactNode[];
	/**
	 * Whether the post box should be collapsible or not. If it is
	 * collapsible, a button will be added to the header to toggle
	 * the visibility of the content.
	 */
	collapsible?:
		| boolean
		| { label: string }
		| { label: (isExpanded: boolean) => string };
	defaultExpanded?: boolean;
}

export const PostBox = forwardRef<HTMLDivElement, PostBoxProps>(
	(props, forwardedRef) => {
		const {
			title,
			children,
			collapsible,
			defaultExpanded = true,
			footer,
		} = props;
		const ref = useObjectRef(forwardedRef);
		const buttonRef = useRef<HTMLButtonElement>(null);
		const contentId = useId();
		const [expanded, setExpanded] = useState(defaultExpanded);
		const { clsx } = useClasses('PostBox');
		const { buttonProps } = useButton(
			{
				...props,
				onPress: () => setExpanded((prev) => !prev),
			},
			buttonRef
		);
		const isCollapsible =
			collapsible === true ||
			(typeof collapsible === 'object' && collapsible.label);

		let toggleLabel = `Toggle panel: ${title}`;

		if (typeof collapsible === 'object') {
			if (typeof collapsible.label === 'function') {
				toggleLabel = collapsible.label(expanded);
			} else {
				toggleLabel = collapsible.label;
			}
		}

		return (
			<div
				{...filterDOMProps(props)}
				ref={ref}
				className={clsx({
					prefixed: 'root',
					classNames: [
						classes.root,
						{
							[classes.collapsed]: !expanded,
						},
						'postbox',
					],
				})}
			>
				<div
					className={clsx({
						prefixed: 'header',
						classNames: [classes.header, 'postbox-header'],
					})}
				>
					<h2
						className={clsx({
							prefixed: 'heading',
							classNames: classes.heading,
						})}
					>
						{title}
					</h2>
					{isCollapsible && (
						<button
							{...buttonProps}
							type="button"
							className="handlediv"
							aria-controls={contentId}
							aria-expanded={expanded}
							aria-label={toggleLabel}
						>
							{expanded ?
								<span className="dashicons dashicons-arrow-down"></span>
							:	<span className="dashicons dashicons-arrow-up"></span>}
						</button>
					)}
				</div>
				{expanded && (
					<div
						id={contentId}
						className={clsx({
							prefixed: 'content',
							classNames: classes.content,
						})}
					>
						{children}
					</div>
				)}
				{expanded && footer && (
					<div
						className={clsx({
							prefixed: 'footer',
							classNames: classes.footer,
						})}
					>
						{footer}
					</div>
				)}
			</div>
		);
	}
);

PostBox.displayName = 'PostBox';
