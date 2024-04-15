import { Icon, closeSmall } from '@wordpress/icons';
import { useRef } from 'react';
import { AriaButtonProps, useButton, useFocusRing } from 'react-aria';
import { useProps } from '../useProps';
import classes from './CloseButton.module.scss';

interface CloseButtonProps
	extends Omit<AriaButtonProps, 'elementType' | 'target'> {}

export const CloseButton = (props: CloseButtonProps) => {
	const { componentProps, rootProps } = useProps('Dialog', props);
	const ref = useRef<HTMLButtonElement>(null);
	const { buttonProps } = useButton(componentProps, ref);
	const { focusProps, isFocusVisible } = useFocusRing(componentProps);

	return (
		<button
			{...rootProps({
				classNames: [
					classes.root,
					{
						[classes.focusRing]: isFocusVisible,
					},
				],
				prefixedNames: 'close-button',
			})}
			{...buttonProps}
			{...focusProps}
		>
			{/* @ts-expect-error - an issue from the upstream library */}
			<Icon icon={closeSmall} />
		</button>
	);
};
