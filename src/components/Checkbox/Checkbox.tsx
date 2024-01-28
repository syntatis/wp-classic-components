import { filterDOMProps, useObjectRef } from '@react-aria/utils';
import { forwardRef, useContext, useRef } from 'react';
import {
	AriaCheckboxProps,
	useCheckbox,
	useCheckboxGroupItem,
} from 'react-aria';
import { useToggleState } from 'react-stately';
import { useClasses } from '~/hooks';
import { GlobalAttributes } from '~/types';
import classes from './Checkbox.module.scss';
import { CheckboxGroupContext } from '../CheckboxGroup';

export interface CheckboxProps
	extends GlobalAttributes,
		// WordPress does not support indeterminate state for checkboxes (yet).
		Omit<AriaCheckboxProps, 'isIndeterminate'> {}

export const Checkbox = forwardRef<HTMLLabelElement, CheckboxProps>(
	(props, forwardedRef) => {
		const { children, className } = props;
		const ref = useObjectRef(forwardedRef);
		const inputRef = useRef<HTMLInputElement>(null);
		const groupState = useContext(CheckboxGroupContext);
		const { inputProps, labelProps, isDisabled, isReadOnly } =
			groupState ?
				// eslint-disable-next-line react-hooks/rules-of-hooks
				useCheckboxGroupItem(
					{
						...props,
						// Value is optional for standalone checkboxes, but required for CheckboxGroup items.
						// eslint-disable-next-line @typescript-eslint/ban-ts-comment
						// @ts-expect-error
						value: props.value,
					},
					groupState,
					inputRef
				)
				// eslint-disable-next-line react-hooks/rules-of-hooks
			:	useCheckbox(props, useToggleState(props), inputRef);
		const { clsx } = useClasses('Checkbox');

		return (
			<label
				{...filterDOMProps(props, { labelable: true })}
				{...labelProps}
				ref={ref}
				className={clsx({
					prefixed: 'root',
					classNames: [classes.root, className],
				})}
				data-disabled={isDisabled || undefined}
				data-readonly={isReadOnly || undefined}
			>
				<input
					{...inputProps}
					ref={inputRef}
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
