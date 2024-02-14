import { useObjectRef } from '@react-aria/utils';
import { useClasses } from '@syntatis/react-hooks';
import { GlobalProps } from '@syntatis/types';
import { ReactNode, forwardRef, useRef, useState } from 'react';
import { useButton, useId } from 'react-aria';
import * as classes from './Box.module.scss';

interface BoxProps extends GlobalProps {
	/**
	 * The title of the post box.
	 *
	 * @example 'Welcome'
	 */
	title?: ReactNode;
	/**
	 * The content to add in the post box. It can be a simple text,
	 * inputs, buttons, etc.
	 */
	children: ReactNode;
	/**
	 * The content to add in the footer of the content.
	 */
	footer?: ReactNode | ReactNode[];
	/**
	 * Whether the post box should be collapsible or not. If it is
	 * collapsible, a button will be added to the header to toggle
	 * the visibility of the content.
	 *
	 * @default false
	 */
	collapsible?:
		| boolean
		| { label: string }
		| { label: (isExpanded: boolean) => string };
	/**
	 * Whether the post box should be expanded by default or not.
	 *
	 * @default true
	 */
	defaultExpanded?: boolean;
}

export const Box = forwardRef<HTMLDivElement, BoxProps>(
	(props, forwardedRef) => {
		const {
			title,
			children,
			collapsible = false,
			defaultExpanded = true,
			footer,
			style,
			className,
		} = props;
		const ref = useObjectRef(forwardedRef);
		const buttonRef = useRef<HTMLButtonElement>(null);
		const contentId = useId();
		const [expanded, setExpanded] = useState(defaultExpanded);
		const { clsx } = useClasses('Box');
		const { buttonProps } = useButton(
			{
				...props,
				onPress: () => setExpanded((prev) => !prev),
			},
			buttonRef
		);

		let toggleLabel = title ? `Toggle panel: ${title}` : 'Toggle panel';

		if (typeof collapsible === 'object') {
			if (typeof collapsible.label === 'function') {
				toggleLabel = collapsible.label(expanded);
			} else {
				toggleLabel = collapsible.label;
			}
		}

		return (
			<div
				ref={ref}
				className={clsx({
					prefixedNames: 'root',
					classNames: [
						'postbox',
						classes.root,
						className,
						{
							[classes.collapsed]: !expanded,
						},
					],
				})}
				style={style}
			>
				{(title || collapsible) && (
					<div
						className={clsx({
							prefixedNames: 'header',
							classNames: [classes.header, 'postbox-header'],
						})}
					>
						<h2
							className={clsx({
								prefixedNames: 'heading',
								classNames: classes.heading,
							})}
						>
							{title}
						</h2>
						{collapsible && (
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
				)}
				{expanded && (
					<div
						id={contentId}
						className={clsx({
							prefixedNames: 'content',
							classNames: classes.content,
						})}
					>
						{children}
					</div>
				)}
				{expanded && footer && (
					<div
						className={clsx({
							prefixedNames: 'footer',
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

Box.displayName = 'Box';
