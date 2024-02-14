import { filterDOMProps, useObjectRef } from '@react-aria/utils';
import { useClasses } from '@syntatis/react-hooks';
import { GlobalProps } from '@syntatis/types';
import { ReactElement, ReactNode, forwardRef } from 'react';
import { AriaRadioGroupProps, useRadioGroup } from 'react-aria';
import { useRadioGroupState } from 'react-stately';
import { RadioContext } from './Radio';
import * as classes from './RadioGroup.module.scss';

interface RadioGroupProps extends GlobalProps, AriaRadioGroupProps {
	children: ReactElement | ReactElement[];
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

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
	(props, forwardedRef) => {
		const {
			label,
			children,
			description,
			descriptionArea,
			isRequired,
			className,
			style,
		} = props;
		const ref = useObjectRef(forwardedRef);
		const state = useRadioGroupState(props);
		const {
			descriptionProps,
			errorMessageProps,
			labelProps,
			radioGroupProps,
			isInvalid,
			validationErrors,
		} = useRadioGroup(props, state);
		const { clsx } = useClasses('RadioGroup');

		return (
			<div
				{...filterDOMProps(props, { labelable: true })}
				{...radioGroupProps}
				ref={ref}
				style={style}
				className={clsx({
					prefixedNames: 'root',
					classNames: [
						classes.root,
						className,
						{
							[classes.descriptionBeforeInput]:
								descriptionArea === 'before-input',
						},
					],
				})}
				data-description-area={descriptionArea}
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
				<RadioContext.Provider value={state}>
					<div
						className={clsx({
							prefixedNames: 'items',
							classNames: classes.items,
						})}
					>
						{children}
					</div>
				</RadioContext.Provider>
				{isInvalid && (
					<div
						{...errorMessageProps}
						className={clsx({
							prefixedNames: 'error-message',
							classNames: classes.errorMessage,
						})}
					>
						{validationErrors.join(' ')}
					</div>
				)}
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
			</div>
		);
	}
);

RadioGroup.displayName = 'RadioGroup';
