import { useObjectRef } from '@react-aria/utils';
import { forwardRef } from 'react';
import { AriaTextFieldProps, useTextField } from 'react-aria';
import { GlobalProps, Styleable } from '../types';
import { useErrorMessage } from '../useErrorMessage';
import { useProps } from '../useProps';
import classes from './TextField.module.scss';

interface TextFieldProps extends GlobalProps, AriaTextFieldProps, Styleable {
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
		const {
			description,
			descriptionArea,
			errorMessage,
			isDisabled,
			isRequired,
			label,
		} = props;
		let className;
		const isRegularText = props.className?.includes('regular-text');
		const isCode = props.className?.includes('code');

		if (isRegularText) {
			className = props.className?.replace('regular-text', '');
		}

		if (isCode) {
			className = props.className?.replace('code', '');
		}
		const ref = useObjectRef(forwardedRef);
		const { clsx, componentProps, rootProps } = useProps('TextField', {
			...props,
			className,
		});
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
						className,
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
							['code']: isCode,
							['regular-text']: isRegularText,
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
