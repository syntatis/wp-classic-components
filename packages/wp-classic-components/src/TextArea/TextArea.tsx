import { useObjectRef } from '@react-aria/utils';
import { useProps } from '@syntatis/react-hooks';
import { GlobalProps } from '@syntatis/types';
import { forwardRef } from 'react';
import { AriaTextFieldProps, useTextField } from 'react-aria';

import * as classes from './TextArea.module.scss';

const DEFAULT_ROWS = 5;
const DEFAULT_COLS = 50;

interface TextAreaProps
	extends GlobalProps,
		Omit<AriaTextFieldProps, 'errorMessage' | 'isInvalid' | 'type'> {
	/**
	 * Defines the number of columnes in the `textarea`.
	 *
	 * @default 50
	 */
	cols?: number;
	/**
	 * Where to place the description.
	 *
	 * @before 'after-input'
	 */
	descriptionArea?: 'after-input' | 'before-input';
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
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
	(props, forwardedRef) => {
		const {
			cols = DEFAULT_COLS,
			description,
			descriptionArea,
			isDisabled,
			isRequired,
			label,
			rows = DEFAULT_ROWS,
		} = props;
		const ref = useObjectRef(forwardedRef);
		const { clsx, componentProps, rootProps } = useProps('TextArea', props);
		const {
			descriptionProps,
			errorMessageProps,
			inputProps,
			isInvalid,
			labelProps,
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
							[classes.descriptionBeforeInput]:
								descriptionArea === 'before-input',
							[classes.disabled]: isDisabled,
							[classes.invalid]: isInvalid,
						},
					],
				})}
			>
				{label && (
					<label
						{...labelProps}
						className={clsx({
							classNames: classes.label,
							prefixedNames: 'label',
						})}
					>
						{label}
						{isRequired ?
							<span
								className={clsx({
									classNames: classes.markedRequired,
									prefixedNames: 'marked-required',
								})}
							>
								*
							</span>
						:	''}
					</label>
				)}
				<textarea
					{...inputProps}
					className={clsx({
						classNames: {
							[classes.input]: true,
							['code']: props.isCode,
						},
						prefixedNames: 'input',
					})}
					cols={cols}
					ref={ref}
					rows={rows}
				/>
				{isInvalid && (
					<p
						{...errorMessageProps}
						className={clsx({
							classNames: classes.errorMessage,
							prefixedNames: 'error-message',
						})}
					>
						{validationErrors.join(' ')}
					</p>
				)}
				{description && (
					<p
						{...descriptionProps}
						className={clsx({
							classNames: [classes.description, 'description'],
							prefixedNames: 'description',
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
