import { useId, useObjectRef } from '@react-aria/utils';
import { useClasses } from 'modules/hooks';
import { GlobalProps } from 'modules/types';
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
		const { children, className, description, style } = props;
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
				style={style}
				className={clsx({
					classNames: [
						classes.root,
						className,
						{
							[classes.disabled]: isDisabled,
							[classes.readOnly]: isReadOnly,
						},
					],
					prefixedNames: 'root',
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
