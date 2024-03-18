import { useProps } from '@/hooks';
import { GlobalProps } from '@/types';
import { ReactNode, forwardRef } from 'react';
import {
	AriaDialogProps,
	AriaModalOverlayProps,
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
		const { componentProps, rootProps } = useProps('Dialog', props);
		const { dialogProps, titleProps } = useDialog(componentProps, ref);

		return (
			<div
				{...rootProps({
					classNames: classes.root,
				})}
				{...dialogProps}
			>
				{title && <h3 {...titleProps}>{title}</h3>}
				{children}
			</div>
		);
	}
);

Dialog.displayName = 'Modal';
