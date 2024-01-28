import { filterDOMProps, useId, useObjectRef } from '@react-aria/utils';
import { ReactNode, forwardRef, useContext, useRef } from 'react';
import {
	AriaCheckboxProps,
	useCheckbox,
	useCheckboxGroupItem,
} from 'react-aria';
import { useToggleState } from 'react-stately';
import classes from './Checkbox.module.scss';
import { useClasses } from '../../hooks';
import { GlobalComponentProps } from '../../types';
import { CheckboxGroupContext } from '../CheckboxGroup';

export interface CheckboxProps
	extends GlobalComponentProps,
		// WordPress does not support indeterminate state for checkboxes (yet).
		Omit<AriaCheckboxProps, 'isIndeterminate'> {
	description?: ReactNode;
}

export const Checkbox = forwardRef<HTMLLabelElement, CheckboxProps>(
	(props, forwardedRef) => {
		const { children, className, description, style } = props;
		const ref = useObjectRef(forwardedRef);
		const inputRef = useRef<HTMLInputElement>(null);
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
					prefixed: 'label-group',
					classNames: classes.labelGroup,
				})}
			>
				{children}
			</span>
		);

		return (
			<label
				{...filterDOMProps(props, { labelable: true })}
				style={style}
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
					aria-describedby={descriptionId}
					ref={inputRef}
					className={clsx({
						prefixed: 'input',
						classNames: classes.input,
					})}
				/>
				{description ?
					<div
						className={clsx({
							prefixed: 'label-group',
							classNames: classes.labelGroup,
						})}
					>
						{label}
						<p
							id={descriptionId}
							className={clsx({
								prefixed: 'description',
								classNames: [classes.description, 'description'],
							})}
						>
							{description}
						</p>
					</div>
				:	label}
			</label>
		);
	}
);

Checkbox.displayName = 'Checkbox';
