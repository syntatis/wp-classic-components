import { useId, useObjectRef } from '@react-aria/utils';
import { useProps } from '@syntatis/react-hooks';
import { GlobalProps } from '@syntatis/types';
import { ReactNode, forwardRef, useContext, useRef } from 'react';
import {
	AriaCheckboxProps,
	useCheckbox,
	useCheckboxGroupItem,
} from 'react-aria';
import { useToggleState } from 'react-stately';
import * as classes from './Checkbox.module.scss';
import { CheckboxGroupContext } from '../CheckboxGroup';

export interface CheckboxProps
	extends GlobalProps,
		// WordPress does not support indeterminate state for checkboxes (yet).
		Omit<AriaCheckboxProps, 'isIndeterminate' | 'isRequired' | 'isInvalid'> {
	description?: ReactNode;
}

export const Checkbox = forwardRef<HTMLLabelElement, CheckboxProps>(
	(props, forwardedRef) => {
		const { children, description } = props;
		const { clsx, rootProps, componentProps } = useProps('Checkbox', props);
		const ref = useObjectRef(forwardedRef);
		const inputRef = useRef<HTMLInputElement>(null);
		const labelId = useId();
		const descriptionId =
			description ?
				// eslint-disable-next-line react-hooks/rules-of-hooks
				useId()
			:	undefined;
		const groupState = useContext(CheckboxGroupContext);
		const { inputProps, labelProps, isDisabled, isReadOnly } =
			groupState ?
				// eslint-disable-next-line react-hooks/rules-of-hooks
				useCheckboxGroupItem(
					{
						...componentProps,
						// Value is optional for standalone checkboxes, but required for CheckboxGroup items.
						// eslint-disable-next-line @typescript-eslint/ban-ts-comment
						// @ts-expect-error
						value: componentProps.value,
					},
					groupState,
					inputRef
				)
				// eslint-disable-next-line react-hooks/rules-of-hooks
			:	useCheckbox(componentProps, useToggleState(componentProps), inputRef);
		const label = (
			<span
				{...labelProps}
				className={clsx({
					classNames: classes.labelGroup,
					prefixedNames: 'label-group',
				})}
			>
				{children}
			</span>
		);

		return (
			<div
				{...rootProps({
					classNames: [
						classes.root,
						{
							[classes.disabled]: isDisabled,
							[classes.readOnly]: isReadOnly,
						},
					],
				})}
			>
				<label
					ref={ref}
					id={labelId}
					className={clsx({
						classNames: classes.label,
						prefixedNames: 'label',
					})}
				>
					<input
						{...inputProps}
						ref={inputRef}
						aria-labelledby={labelId}
						aria-describedby={descriptionId}
						className={clsx({
							prefixedNames: 'input',
							classNames: classes.input,
						})}
					/>
					{label}
				</label>
				{description && (
					<div
						id={descriptionId}
						className={clsx({
							classNames: [classes.description, 'description'],
							prefixedNames: 'description',
						})}
					>
						{description}
					</div>
				)}
			</div>
		);
	}
);

Checkbox.displayName = 'Checkbox';
