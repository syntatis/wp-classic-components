import { useProps } from '@/hooks';
import { Icon, close } from '@wordpress/icons';
import { useRef } from 'react';
import { AriaButtonProps, useButton } from 'react-aria';

import * as classes from './SearchField.module.scss';

export const ClearButton = (props: AriaButtonProps) => {
	const ref = useRef<HTMLButtonElement>(null);
	const { buttonProps } = useButton(props, ref);
	const { rootProps } = useProps('SearchField', props);

	return (
		<button
			{...rootProps({ classNames: classes.clearButton })}
			{...buttonProps}
			aria-label="Clear search input"
			ref={ref}
		>
			<Icon icon={close} />
		</button>
	);
};
