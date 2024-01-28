import { filterDOMProps, useObjectRef } from '@react-aria/utils';
import { ReactElement, ReactNode, createContext, forwardRef } from 'react';
import { AriaCheckboxGroupProps, useCheckboxGroup } from 'react-aria';
import { CheckboxGroupState, useCheckboxGroupState } from 'react-stately';
import { useClasses } from '~/hooks';
import { GlobalAttributes } from '~/types';
import classes from './CheckboxGroup.module.scss';
import { CheckboxProps } from '../Checkbox';

export const CheckboxGroupContext = createContext<CheckboxGroupState | null>(
	null
);

interface CheckboxGroupProps extends GlobalAttributes, AriaCheckboxGroupProps {
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
		} = useCheckboxGroup(props, state);
		const { clsx } = useClasses('CheckboxGroup');

		return (
			<div
				{...filterDOMProps(props, { labelable: true })}
				{...groupProps}
				ref={ref}
				className={clsx({
					prefixed: 'root',
					classNames: [classes.root, className],
				})}
				aria-orientation={orientation || undefined}
				data-description-area={descriptionArea}
			>
				<span
					{...labelProps}
					className={clsx({
						prefixed: 'label',
						classNames: [classes.label],
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
				</span>
				<CheckboxGroupContext.Provider value={state}>
					<div
						className={clsx({
							prefixed: 'items',
							classNames: [classes.items],
						})}
					>
						{children}
					</div>
				</CheckboxGroupContext.Provider>
				{isInvalid && (
					<div
						{...errorMessageProps}
						className={clsx({
							prefixed: 'error-message',
							classNames: [classes.errorMessage],
						})}
					>
						{validationErrors.join(' ')}
					</div>
				)}
				{description && (
					<div
						{...descriptionProps}
						className={clsx({
							prefixed: 'description',
							classNames: [classes.description],
						})}
					>
						{description}
					</div>
				)}
			</div>
		);
	}
);

CheckboxGroup.displayName = 'CheckboxGroup';
