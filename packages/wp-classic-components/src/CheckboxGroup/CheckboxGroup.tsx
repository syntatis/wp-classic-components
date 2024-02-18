import { AriaCheckboxGroupProps, useCheckboxGroup } from '@react-aria/checkbox';
import { useObjectRef } from '@react-aria/utils';
import {
	CheckboxGroupState,
	useCheckboxGroupState,
} from '@react-stately/checkbox';
import { useProps } from '@syntatis/react-hooks';
import { GlobalProps } from '@syntatis/types';
import { ReactElement, ReactNode, createContext, forwardRef } from 'react';

import { CheckboxProps } from '../Checkbox';
import * as classes from './CheckboxGroup.module.scss';

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
	descriptionArea?: 'after-input' | 'before-input';
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
			description,
			descriptionArea,
			errorMessage,
			id,
			isRequired,
			label,
			orientation = 'vertical',
		} = props;
		const { clsx, componentProps, rootProps } = useProps(
			'CheckboxGroup',
			props
		);
		const ref = useObjectRef(forwardedRef);
		const state = useCheckboxGroupState(componentProps);
		const {
			descriptionProps,
			errorMessageProps,
			groupProps,
			isInvalid,
			labelProps,
			validationDetails,
			validationErrors,
		} = useCheckboxGroup(
			{
				id,
				...componentProps,
			},
			state
		);

		return (
			<div
				{...rootProps({
					classNames: [
						classes.root,
						{
							[classes.descriptionBeforeInput]:
								descriptionArea === 'before-input',
							[classes.horizontal]: orientation === 'horizontal',
						},
					],
				})}
				{...groupProps}
				aria-invalid={isInvalid}
				ref={ref}
			>
				<span
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
				</span>
				<CheckboxGroupContext.Provider value={state}>
					<div
						className={clsx({
							classNames: classes.items,
							prefixedNames: 'items',
						})}
					>
						{children}
					</div>
				</CheckboxGroupContext.Provider>
				{description && (
					<div
						{...descriptionProps}
						className={clsx({
							classNames: classes.description,
							prefixedNames: 'description',
						})}
					>
						{description}
					</div>
				)}
				{isInvalid && (
					<div
						{...errorMessageProps}
						className={clsx({
							classNames: classes.errorMessage,
							prefixedNames: 'error-message',
						})}
					>
						{typeof errorMessage === 'function' ?
							errorMessage({
								isInvalid,
								validationDetails,
								validationErrors,
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
