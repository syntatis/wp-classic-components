import { AriaCheckboxGroupProps, useCheckboxGroup } from '@react-aria/checkbox';
import { useObjectRef } from '@react-aria/utils';
import {
	CheckboxGroupState,
	useCheckboxGroupState,
} from '@react-stately/checkbox';
import { ReactElement, ReactNode, createContext, forwardRef } from 'react';
import * as classes from './CheckboxGroup.module.scss';
import { useClasses } from '../../hooks';
import { GlobalProps } from '../../types';
import { CheckboxProps } from '../Checkbox';

export const CheckboxGroupContext = createContext<CheckboxGroupState | null>(
	null
);

interface CheckboxGroupProps extends GlobalProps, AriaCheckboxGroupProps {
	children: ReactElement<CheckboxProps> | ReactElement<CheckboxProps>[];
	description?: ReactNode;
	/**
	 * Where to place the description.
	 *
	 * @before 'after-input'
	 */
	descriptionArea?: 'before-input' | 'after-input';
	/**
	 * The orientation of the checkbox group.
	 *
	 * @default 'vertical'
	 */
	orientation?: 'horizontal' | 'vertical';
}

export const CheckboxGroup = forwardRef<HTMLDivElement, CheckboxGroupProps>(
	(props, forwardedRef) => {
		const {
			children,
			label,
			description,
			descriptionArea,
			orientation = 'vertical',
			className,
			isRequired,
			errorMessage,
			style,
		} = props;
		const ref = useObjectRef(forwardedRef);
		const state = useCheckboxGroupState(props);
		const {
			groupProps,
			labelProps,
			descriptionProps,
			errorMessageProps,
			isInvalid,
			validationErrors,
			validationDetails,
		} = useCheckboxGroup(props, state);
		const { clsx } = useClasses('CheckboxGroup');

		return (
			<div
				{...groupProps}
				ref={ref}
				aria-invalid={isInvalid}
				style={style}
				className={clsx({
					prefixedNames: 'root',
					classNames: [
						classes.root,
						className,
						{
							[classes.horizontal]: orientation === 'horizontal',
							[classes.descriptionBeforeInput]:
								descriptionArea === 'before-input',
						},
					],
				})}
			>
				<span
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
				</span>
				<CheckboxGroupContext.Provider value={state}>
					<div
						className={clsx({
							prefixedNames: 'items',
							classNames: classes.items,
						})}
					>
						{children}
					</div>
				</CheckboxGroupContext.Provider>
				{description && (
					<div
						{...descriptionProps}
						className={clsx({
							prefixedNames: 'description',
							classNames: classes.description,
						})}
					>
						{description}
					</div>
				)}
				{isInvalid && (
					<div
						{...errorMessageProps}
						className={clsx({
							prefixedNames: 'error-message',
							classNames: classes.errorMessage,
						})}
					>
						{typeof errorMessage === 'function' ?
							errorMessage({
								isInvalid,
								validationErrors,
								validationDetails,
							})
						:	errorMessage}
						{validationErrors.join(' ')}
					</div>
				)}
			</div>
		);
	}
);

CheckboxGroup.displayName = 'CheckboxGroup';
