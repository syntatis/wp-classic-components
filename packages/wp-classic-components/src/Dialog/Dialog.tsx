import { useProps } from '@/hooks';
import { GlobalProps } from '@/types';
import { ReactNode, forwardRef } from 'react';
import {
	AriaDialogProps,
	AriaModalOverlayProps,
	FocusScope,
	useDialog,
	useObjectRef,
} from 'react-aria';
import * as classes from './Dialog.module.scss';

export interface DialogProps
	extends AriaDialogProps,
		AriaModalOverlayProps,
		Omit<GlobalProps, 'role'> {
	children?: ReactNode;
	title?: ReactNode;
}

export const Dialog = forwardRef<HTMLDivElement, DialogProps>(
	(props, forwardedRef) => {
		const { children, title } = props;
		const ref = useObjectRef(forwardedRef);
		const { clsx, componentProps, rootProps } = useProps('Dialog', props);
		const { dialogProps, titleProps } = useDialog(componentProps, ref);

		return (
			<FocusScope autoFocus contain restoreFocus>
				<div
					{...rootProps({
						classNames: [classes.root],
					})}
					{...dialogProps}
				>
					<header
						className={clsx({
							classNames: [classes.header, 'header'],
						})}
					>
						{title && (
							<h3
								{...titleProps}
								className={clsx({
									classNames: [classes.title, 'title'],
								})}
							>
								{title}
							</h3>
						)}
					</header>
					{children}
				</div>
			</FocusScope>
		);
	}
);

Dialog.displayName = 'Modal';
