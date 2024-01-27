import { filterDOMProps, useObjectRef } from '@react-aria/utils';
import { forwardRef } from 'react';
import { AriaTextFieldProps, useTextField } from 'react-aria';
import { useClasses } from '~/hooks';
import { Styleable } from '~/types';
import classes from './TextArea.module.scss';

export interface TextFieldProps
	extends Styleable,
		Omit<AriaTextFieldProps, 'isInvalid' | 'errorMessage' | 'type'> {
	/**
	 * Setting this `true` will render the text within the text field
	 * with a monospace font.
	 */
	isCode?: boolean;
	/**
	 * Defines the number of rows in the `textarea`.
	 *
	 * @default 5
	 */
	rows?: number;
	/**
	 * Defines the number of columnes in the `textarea`.
	 *
	 * @default 10
	 */
	cols?: number;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextFieldProps>(
	(props, forwardedRef) => {
		const {
			style,
			className,
			label,
			description,
			isRequired,
			rows = 5,
			cols = 50,
		} = props;
		const ref = useObjectRef(forwardedRef);
		const { clsx } = useClasses('TextField');
		const {
			isInvalid,
			inputProps,
			labelProps,
			descriptionProps,
			errorMessageProps,
			validationErrors,
		} = useTextField(
			{
				...props,
				inputElementType: 'textarea',
			},
			ref
		);

		return (
			<div
				className={clsx({
					prefixed: 'root',
					classNames: [classes.root, className],
				})}
				data-invalid={isInvalid || undefined}
			>
				{label && (
					<label
						{...labelProps}
						className={clsx({
							prefixed: 'label',
							classNames: classes.label,
						})}
					>
						{label}
						{isRequired ?
							<span
								className={clsx({
									prefixed: 'marked-required',
									classNames: classes.markedRequired,
								})}
							>
								*
							</span>
						:	''}
					</label>
				)}
				<textarea
					{...filterDOMProps(props)}
					{...inputProps}
					ref={ref}
					style={style}
					rows={rows}
					cols={cols}
					className={clsx({
						prefixed: 'input',
						classNames: {
							[classes.input]: true,
							['code']: props.isCode,
						},
					})}
				/>
				{isInvalid && (
					<p
						{...errorMessageProps}
						className={clsx({
							prefixed: 'error-message',
							classNames: classes.errorMessage,
						})}
					>
						{validationErrors.join(' ')}
					</p>
				)}
				{description && (
					<p
						{...descriptionProps}
						className={clsx({
							prefixed: 'description',
							classNames: [classes.description, 'description'],
						})}
					>
						{description}
					</p>
				)}
			</div>
		);
	}
);

TextArea.displayName = 'TextArea';
