import { useProps } from '@/hooks';
import { GlobalProps } from '@/types';
import { useId, useObjectRef } from '@react-aria/utils';
import { ReactNode, forwardRef, useContext, useRef } from 'react';
import {
	AriaCheckboxProps,
	useCheckbox,
	useCheckboxGroupItem,
} from 'react-aria';
import { useToggleState } from 'react-stately';
import { CheckboxGroupContext } from '../CheckboxGroup';
import * as classes from './Checkbox.module.scss';

export interface CheckboxProps
	extends GlobalProps,
		// WordPress does not support indeterminate state for checkboxes (yet).
		Omit<AriaCheckboxProps, 'isIndeterminate' | 'isInvalid' | 'isRequired'> {
	description?: ReactNode;
}

export const Checkbox = forwardRef<HTMLLabelElement, CheckboxProps>(
	(props, forwardedRef) => {
		const { children, description } = props;
		const { clsx, componentProps, rootProps } = useProps('Checkbox', props);
		const ref = useObjectRef(forwardedRef);
		const inputRef = useRef<HTMLInputElement>(null);
		const labelId = useId();
		const descriptionId =
			description ?
				// eslint-disable-next-line react-hooks/rules-of-hooks
				useId()
			:	undefined;
		const groupState = useContext(CheckboxGroupContext);
		const { inputProps, isDisabled, isReadOnly, labelProps } =
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
					className={clsx({
						classNames: classes.label,
						prefixedNames: 'label',
					})}
					id={labelId}
					ref={ref}
				>
					<input
						{...inputProps}
						aria-describedby={descriptionId}
						aria-labelledby={labelId}
						className={clsx({
							classNames: classes.input,
							prefixedNames: 'input',
						})}
						ref={inputRef}
					/>
					{label}
				</label>
				{description && (
					<div
						className={clsx({
							classNames: [classes.description, 'description'],
							prefixedNames: 'description',
						})}
						id={descriptionId}
					>
						{description}
					</div>
				)}
			</div>
		);
	}
);

Checkbox.displayName = 'Checkbox';
