import { filterDOMProps, useObjectRef } from '@react-aria/utils';
import { ReactNode, forwardRef } from 'react';
import { AriaCheckboxProps, useCheckbox } from 'react-aria';
import { useToggleState } from 'react-stately';
import { useClasses } from '~/hooks';
import { HTMLGlobalAttributes } from '~/types';
import classes from './Checkbox.module.scss';

export interface CheckboxProps extends HTMLGlobalAttributes, AriaCheckboxProps {
	/**
	 * The content to display inside the link.
	 */
	children: ReactNode;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
	(props, forwardedRef) => {
		const { children, className } = props;
		const ref = useObjectRef(forwardedRef);
		const state = useToggleState(props);
		const { inputProps, labelProps, isReadOnly, isDisabled } = useCheckbox(
			props,
			state,
			ref
		);
		const { clsx } = useClasses('Checkbox');

		return (
			<label
				{...labelProps}
				className={clsx({
					prefixed: 'root',
					classNames: [classes.root, className],
				})}
				data-disabled={isDisabled || undefined}
				data-readonly={isReadOnly || undefined}
			>
				<input
					{...filterDOMProps(props, { labelable: true })}
					{...inputProps}
					ref={ref}
					className={clsx({
						prefixed: 'input',
						classNames: [classes.input],
					})}
				/>
				{children}
			</label>
		);
	}
);

Checkbox.displayName = 'Checkbox';
