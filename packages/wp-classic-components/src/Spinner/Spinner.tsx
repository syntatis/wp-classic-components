import { useProps } from '@/hooks';
import { GlobalProps } from '@/types';
import { forwardRef } from 'react';
import { useObjectRef } from 'react-aria';
import src from 'wordpress/wp-admin/images/spinner-2x.gif';
import * as classes from './Spinner.module.scss';

const DEFAULT_SIZE = 24;

interface SpinnerProps extends GlobalProps {
	size?: number;
}

export const Spinner = forwardRef<HTMLSpanElement, SpinnerProps>(
	(props, forwardedRef) => {
		const ref = useObjectRef(forwardedRef);
		const { componentProps, rootProps } = useProps('Spinner', props);
		const { size = DEFAULT_SIZE } = componentProps;

		return (
			<span
				ref={ref}
				{...rootProps({
					classNames: [classes.root],
				})}
			>
				<img height={size} src={src} width={size} />
			</span>
		);
	}
);

Spinner.displayName = 'Spinner';
