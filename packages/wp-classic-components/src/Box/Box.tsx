import { useProps } from '@/hooks';
import { GlobalProps } from '@/types';
import { useObjectRef } from '@react-aria/utils';
import { ReactNode, forwardRef, useRef, useState } from 'react';
import { useButton, useId } from 'react-aria';
import { TabsProvider } from '../Tabs/TabsProvider';
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
	collapsible?: ((isExpanded: boolean) => string) | boolean | string;
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

/**
 * ```jsx
 * import { Box } from '@syntatis/wp-classic-components';
 * ```
 *
 * The Box component is a special container commonly used in WordPress
 * for metaboxes or widgets. It consists of a title and content, and
 * can optionally be collapsible to toggle the visibility of the
 * content. The content can be any type of component, such as
 * text, form, charts, etc.
 */
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
		const renderedTitle = typeof title === 'string' ? <h2>{title}</h2> : title;
		let toggleLabel = null;

		switch (typeof collapsible) {
			case 'function':
				toggleLabel = collapsible(expanded);
				break;
			case 'string':
				toggleLabel = collapsible;
				break;

			default:
				toggleLabel = title ? `Toggle panel: ${title}` : 'Toggle panel';
				break;
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
						{renderedTitle && (
							<div
								className={clsx({
									classNames: [classes.heading],
									prefixedNames: 'heading',
								})}
							>
								{renderedTitle}
							</div>
						)}
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
						<TabsProvider context="box">{children}</TabsProvider>
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
