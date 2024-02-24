import { OptionHTMLAttributes, forwardRef } from 'react';
import { useObjectRef } from 'react-aria';

export interface SelectItemProps
	extends OptionHTMLAttributes<HTMLOptionElement> {}

export const SelectItem = forwardRef<HTMLOptionElement, SelectItemProps>(
	(props, forwardedRef) => {
		const ref = useObjectRef(forwardedRef);
		const { children } = props;

		return (
			<option ref={ref} {...props}>
				{children}
			</option>
		);
	}
);

SelectItem.displayName = 'SelectItem';
