import { useObjectRef } from '@react-aria/utils';
import { ReactNode, createContext, forwardRef } from 'react';
import { useCheckboxGroup } from 'react-aria';
import { CheckboxGroupState, useCheckboxGroupState } from 'react-stately';
import { useClasses } from '~/hooks';
import { GlobalAttributes } from '~/types';
import classes from './Checkbox.module.scss';

export const CheckboxGroupContext = createContext<CheckboxGroupState | null>(
	null
);

interface CheckboxGroupProps extends GlobalAttributes {
	label: ReactNode;
	children: ReactNode | ReactNode[];
	description?: ReactNode;
}

export const CheckboxGroup = forwardRef<HTMLDivElement, CheckboxGroupProps>(
	(props, forwardedRef) => {
		const { children, label, description, className } = props;
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
				{...groupProps}
				ref={ref}
				className={clsx({
					prefixed: 'root',
					classNames: [classes.root, className],
				})}
			>
				<span
					{...labelProps}
					className={clsx({
						prefixed: 'label',
						classNames: [classes.label],
					})}
				>
					{label}
				</span>
				<CheckboxGroupContext.Provider value={state}>
					{children}
				</CheckboxGroupContext.Provider>
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
			</div>
		);
	}
);

CheckboxGroup.displayName = 'CheckboxGroup';
