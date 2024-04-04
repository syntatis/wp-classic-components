import { useProps } from '@/hooks';
import { Styleable, Testable } from '@/types';
import { CSSProperties, ReactNode, forwardRef } from 'react';
import {
	AriaDialogProps,
	AriaModalOverlayProps,
	FocusScope,
	useDialog,
	useObjectRef,
} from 'react-aria';
import { CloseButton } from './CloseButton';
import * as classes from './Dialog.module.scss';
import { useDialogContext } from './DialogProvider';

export interface DialogProps
	extends Styleable,
		Testable,
		Omit<AriaDialogProps, 'role'>,
		AriaModalOverlayProps {
	children?: ReactNode;
	/**
	 * Add the footer component on the dialog.
	 *
	 * This will be rendered at the bottom of the dialog. It can be added with anything,
	 * but typically contains an array of action buttons.
	 */
	footer: ReactNode;
	/**
	 * Set the maximum height of the dialog.
	 *
	 * If set as a number if will be treated as pixels.
	 * For example, `maxHeight={300}` will be equal
	 * to `300px`.
	 *
	 * @default 300px
	 */
	maxHeight?: number | string;
	/**
	 * Set the maximum width of the dialog.
	 *
	 * If set as a number if will be treated as pixels.
	 * For example, `maxWidth={50}` will be equal
	 * to `50px`.
	 *
	 * @default 50vw
	 */
	maxWidth?: number | string;
	/**
	 * The title of the dialog. If provided, it will renderred
	 * as the heading on the dialog.
	 */
	title: ReactNode;
}

export const Dialog = forwardRef<HTMLDivElement, DialogProps>(
	(props, forwardedRef) => {
		const { children, footer, title } = props;
		const ref = useObjectRef(forwardedRef);
		const { clsx, componentProps, rootProps } = useProps('Dialog', props);
		const { dialogProps, titleProps } = useDialog(
			{
				...componentProps,
				role: 'dialog',
			},
			ref
		);
		const { state } = useDialogContext();

		return (
			<FocusScope autoFocus contain restoreFocus>
				<div
					{...rootProps({
						classNames: [classes.root],
						styles: {
							'--wp-classic-dialog-max-height':
								typeof props.maxHeight === 'number' ?
									`${props.maxHeight}px`
								:	props.maxHeight || undefined,
							'--wp-classic-dialog-max-width':
								typeof props.maxWidth === 'number' ?
									`${props.maxWidth}px`
								:	props.maxWidth || undefined,
						} as CSSProperties,
					})}
					{...dialogProps}
				>
					<header
						className={clsx({
							classNames: [classes.header, 'header'],
						})}
					>
						{title && (
							<h1
								{...titleProps}
								className={clsx({
									classNames: [classes.title, 'title'],
								})}
							>
								{title}
							</h1>
						)}
						<CloseButton onPress={state.close} />
					</header>
					{children}
					{footer && (
						<footer
							className={clsx({
								classNames: [classes.footer, 'footer'],
							})}
						>
							{footer}
						</footer>
					)}
				</div>
			</FocusScope>
		);
	}
);

Dialog.displayName = 'Dialog';
