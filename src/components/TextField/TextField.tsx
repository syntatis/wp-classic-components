import { filterDOMProps, useObjectRef } from '@react-aria/utils';
import { forwardRef } from 'react';
import { AriaTextFieldProps, useTextField } from 'react-aria';
import { useClasses } from '~/hooks';
import { Affixable, Styleable } from '~/types';
import classes from './TextField.module.scss';

export interface TextFieldProps
	extends Affixable,
		Styleable,
		AriaTextFieldProps {
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
		const { style, className, label, description, isRequired } = props;
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
				<input
					{...filterDOMProps(props)}
					{...inputProps}
					ref={ref}
					style={style}
					className={clsx({
						prefixed: 'input',
						classNames: classes.input,
					})}
				/>
				{isInvalid ?
					<p
						{...errorMessageProps}
						className={clsx({
							prefixed: 'error-message',
							classNames: classes.errorMessage,
						})}
					>
						{validationErrors.join(' ')}
					</p>
				:	description && (
						<p
							{...descriptionProps}
							className={clsx({
								prefixed: 'description',
								classNames: [classes.description, 'description'],
							})}
						>
							{description}
						</p>
					)
				}
			</div>
		);
	}
);

TextField.displayName = 'TextField';