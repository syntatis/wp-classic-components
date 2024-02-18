import { useProps } from '@/hooks';
import { useObjectRef } from '@react-aria/utils';
import { GlobalProps } from '@syntatis/types';
import { forwardRef } from 'react';
import { AriaTextFieldProps, useTextField } from 'react-aria';
import * as classes from './TextArea.module.scss';

const DEFAULT_ROWS = 5;
const DEFAULT_COLS = 50;

interface TextAreaProps
	extends GlobalProps,
		Omit<AriaTextFieldProps, 'isInvalid' | 'errorMessage' | 'type'> {
	/**
	 * Where to place the description.
	 *
	 * @before 'after-input'
	 */
	descriptionArea?: 'before-input' | 'after-input';
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
	 * @default 50
	 */
	cols?: number;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
	(props, forwardedRef) => {
		const {
			label,
			description,
			isRequired,
			isDisabled,
			rows = DEFAULT_ROWS,
			cols = DEFAULT_COLS,
			descriptionArea,
		} = props;
		const ref = useObjectRef(forwardedRef);
		const { clsx, rootProps, componentProps } = useProps('TextArea', props);
		const {
			isInvalid,
			inputProps,
			labelProps,
			descriptionProps,
			errorMessageProps,
			validationErrors,
		} = useTextField(
			{
				...componentProps,
				inputElementType: 'textarea',
			},
			ref
		);

		return (
			<div
				{...rootProps({
					classNames: [
						classes.root,
						{
							[classes.disabled]: isDisabled,
							[classes.invalid]: isInvalid,
							[classes.descriptionBeforeInput]:
								descriptionArea === 'before-input',
						},
					],
				})}
			>
				{label && (
					<label
						{...labelProps}
						className={clsx({
							prefixedNames: 'label',
							classNames: classes.label,
						})}
					>
						{label}
						{isRequired ?
							<span
								className={clsx({
									prefixedNames: 'marked-required',
									classNames: classes.markedRequired,
								})}
							>
								*
							</span>
						:	''}
					</label>
				)}
				<textarea
					{...inputProps}
					ref={ref}
					rows={rows}
					cols={cols}
					className={clsx({
						prefixedNames: 'input',
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
							prefixedNames: 'error-message',
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
							prefixedNames: 'description',
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
