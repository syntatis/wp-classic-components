import { useObjectRef } from '@react-aria/utils';
import { useProps } from '@syntatis/react-hooks';
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
		const { label, children, isRequired, id } = props;
		const { description, descriptionArea } = props;
		const { clsx, rootProps, componentProps } = useProps('RadioGroup', props);
		const ref = useObjectRef(forwardedRef);
		const state = useRadioGroupState(componentProps);
		const {
			descriptionProps,
			errorMessageProps,
			isInvalid,
			labelProps,
			radioGroupProps,
			validationErrors,
		} = useRadioGroup(
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
						},
					],
				})}
				{...radioGroupProps}
				ref={ref}
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
