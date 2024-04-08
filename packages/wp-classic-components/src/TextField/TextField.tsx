import { useObjectRef } from '@react-aria/utils';
import { forwardRef } from 'react';
import { AriaTextFieldProps, useTextField } from 'react-aria';
import { GlobalProps } from '../types';
import { useErrorMessage } from '../useErrorMessage';
import { useProps } from '../useProps';
import * as classes from './TextField.module.scss';

interface TextFieldProps extends GlobalProps, AriaTextFieldProps {
	/**
	 * Where to place the description.
	 *
	 * @default after-input
	 */
	descriptionArea?: 'after-input' | 'before-input';
	/**
	 * Whether to allow or disallow 1Password helper.
	 *
	 * @default false
	 * @see https://developer.1password.com/docs/web/compatible-website-design/
	 */
	ignore1Password?: boolean;
	/**
	 * Setting this `true` will render the text within the text field
	 * with a monospace font.
	 */
	isCode?: boolean;
	/**
	 * The input type.
	 *
	 * @default text
	 */
	type?: 'email' | 'password' | 'tel' | 'text' | 'url';
}

/**
 * ```jsx
 * import { TextField } from '@syntatis/wp-classic-components';
 * ```
 *
 * The `TextField` component is like the HTML `input` element. It lets users enter
 * and edit text. Similarly, you can use the `type` prop to set the type of input
 * field.
 */
export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
	(props, forwardedRef) => {
		const { errorMessage, isDisabled, isRequired, label } = props;
		const { description, descriptionArea } = props;
		const ref = useObjectRef(forwardedRef);
		const { clsx, componentProps, rootProps } = useProps('TextField', props);
		const {
			descriptionProps,
			errorMessageProps,
			inputProps,
			isInvalid,
			labelProps,
			validationDetails,
			validationErrors,
		} = useTextField(componentProps, ref);
		const { errorMessageList } = useErrorMessage({
			errorMessage,
			isInvalid,
			validationDetails,
			validationErrors,
		});

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
				<input
					{...inputProps}
					className={clsx({
						classNames: {
							[classes.input]: true,
							['code']: props.isCode,
						},
						prefixedNames: 'input',
					})}
					ref={ref}
				/>
				{errorMessageList.length >= 1 && (
					<div
						{...errorMessageProps}
						className={clsx({
							classNames: classes.errorMessage,
							prefixedNames: 'error-message',
						})}
					>
						{errorMessageList.map((message, index) => {
							return <p key={index}>{message}</p>;
						})}
					</div>
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

TextField.displayName = 'TextField';
