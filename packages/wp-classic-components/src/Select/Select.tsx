import { useProps } from '@/hooks';
import { GlobalProps } from '@/types';
import { ReactElement, forwardRef } from 'react';
import { Key, useObjectRef } from 'react-aria';
import { SingleSelectListProps, useSingleSelectListState } from 'react-stately';

interface Option {
	key: Key;
	label: string;
	value: string;
}

interface SelectProps
	extends GlobalProps,
		Omit<SingleSelectListProps<Option>, 'children'> {}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
	(props, forwardedRef) => {
		const ref = useObjectRef(forwardedRef);
		const { rootProps } = useProps('Select', props);
		const { onSelectionChange } = props;

		useSingleSelectListState(props);

		return (
			<div {...rootProps()}>
				<select ref={ref}>{children}</select>
			</div>
		);
	}
);

Select.displayName = 'Select';
