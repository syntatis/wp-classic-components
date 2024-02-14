import { useObjectRef } from '@react-aria/utils';
import { useClasses } from '@syntatis/react-hooks';
import { forwardRef } from 'react';
import { AriaTextFieldProps, useTextField } from 'react-aria';
import * as classes from './TextField.module.scss';
import { GlobalProps } from '../types';

interface TextFieldProps
	extends GlobalProps,
		Omit<AriaTextFieldProps, 'errorMessage' | 'isInvalid'> {
	/**
	 * The input type.
	 *
	 * @default 'text'
	 */
	type?: 'text' | 'email' | 'password' | 'search' | 'tel' | 'url';
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
	 * Whether to allow or disallow 1Password helper.
	 *
	 * @default false
	 * @see https://developer.1password.com/docs/web/compatible-website-design/
	 */
	ignore1Password?: boolean;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
	(props, forwardedRef) => {
		const {
			style,
			className,
			label,
			description,
			descriptionArea,
			isRequired,
			isDisabled,
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
		} = useTextField(props, ref);

		return (
			<div
				style={style}
				className={clsx({
					prefixedNames: 'root',
					classNames: [
						classes.root,
						className,
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
				<input
					{...inputProps}
					ref={ref}
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

TextField.displayName = 'TextField';
