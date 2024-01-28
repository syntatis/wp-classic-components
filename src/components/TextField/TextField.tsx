import { filterDOMProps, useObjectRef } from '@react-aria/utils';
import { forwardRef } from 'react';
import { AriaTextFieldProps, useTextField } from 'react-aria';
import classes from './TextField.module.scss';
import { useClasses } from '../../hooks';
import { GlobalComponentProps } from '../../types';

interface TextFieldProps
	extends GlobalComponentProps,
		Omit<AriaTextFieldProps, 'errorMessage' | 'isInvalid'> {
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
				className={clsx({
					prefixed: 'root',
					classNames: [classes.root, className],
				})}
				data-disabled={isDisabled || undefined}
				data-invalid={isInvalid || undefined}
				data-description-area={descriptionArea}
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
				<input
					{...filterDOMProps(props)}
					{...inputProps}
					ref={ref}
					style={style}
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

TextField.displayName = 'TextField';
