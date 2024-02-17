import { useProps } from '@/hooks';
import { GlobalProps } from '@/types';
import { AriaCheckboxGroupProps, useCheckboxGroup } from '@react-aria/checkbox';
import { useObjectRef } from '@react-aria/utils';
import {
	CheckboxGroupState,
	useCheckboxGroupState,
} from '@react-stately/checkbox';
import { ReactElement, ReactNode, createContext, forwardRef } from 'react';
import * as classes from './CheckboxGroup.module.scss';
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
			isRequired,
			errorMessage,
			id,
		} = props;
		const { clsx, rootProps, componentProps } = useProps(
			'CheckboxGroup',
			props
		);
		const ref = useObjectRef(forwardedRef);
		const state = useCheckboxGroupState(componentProps);
		const {
			groupProps,
			labelProps,
			descriptionProps,
			errorMessageProps,
			isInvalid,
			validationErrors,
			validationDetails,
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
							[classes.horizontal]: orientation === 'horizontal',
							[classes.descriptionBeforeInput]:
								descriptionArea === 'before-input',
						},
					],
				})}
				{...groupProps}
				ref={ref}
				aria-invalid={isInvalid}
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
