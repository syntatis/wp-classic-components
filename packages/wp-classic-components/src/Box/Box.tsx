import { useObjectRef } from '@react-aria/utils';
import { useProps } from 'packages/hooks';
import { GlobalProps } from 'packages/types';
import { ReactNode, forwardRef, useRef, useState } from 'react';
import { useButton, useId } from 'react-aria';

import * as classes from './Box.module.scss';

interface BoxProps extends GlobalProps {
	/**
	 * The content to add in the post box. It can be a simple text,
	 * inputs, buttons, etc.
	 */
	children: ReactNode;
	/**
	 * Whether the post box should be collapsible or not. If it is
	 * collapsible, a button will be added to the header to toggle
	 * the visibility of the content.
	 *
	 * @default false
	 */
	collapsible?:
		| { label: (isExpanded: boolean) => string }
		| { label: string }
		| boolean;
	/**
	 * Whether the post box should be expanded by default or not.
	 *
	 * @default true
	 */
	defaultExpanded?: boolean;
	/**
	 * The content to add in the footer of the content.
	 */
	footer?: ReactNode | ReactNode[];
	/**
	 * The title of the post box.
	 *
	 * @example 'Welcome'
	 */
	title?: ReactNode;
}

export const Box = forwardRef<HTMLDivElement, BoxProps>(
	(props, forwardedRef) => {
		const {
			children,
			collapsible = false,
			defaultExpanded = true,
			footer,
			title,
		} = props;
		const ref = useObjectRef(forwardedRef);
		const buttonRef = useRef<HTMLButtonElement>(null);
		const contentId = useId();
		const [expanded, setExpanded] = useState(defaultExpanded);
		const { clsx, componentProps, rootProps } = useProps('Box', props);
		const { buttonProps } = useButton(
			{
				...componentProps,
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
				{...rootProps({
					classNames: [
						'postbox',
						classes.root,
						{
							[classes.collapsed]: !expanded,
						},
					],
				})}
				ref={ref}
			>
				{(title || collapsible) && (
					<div
						className={clsx({
							classNames: [classes.header, 'postbox-header'],
							prefixedNames: 'header',
						})}
					>
						<h2
							className={clsx({
								classNames: classes.heading,
								prefixedNames: 'heading',
							})}
						>
							{title}
						</h2>
						{collapsible && (
							<button
								{...buttonProps}
								aria-controls={contentId}
								aria-expanded={expanded}
								aria-label={toggleLabel}
								className="handlediv"
								type="button"
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
						className={clsx({
							classNames: classes.content,
							prefixedNames: 'content',
						})}
						id={contentId}
					>
						{children}
					</div>
				)}
				{expanded && footer && (
					<div
						className={clsx({
							classNames: classes.footer,
							prefixedNames: 'footer',
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
