import { useObjectRef } from '@react-aria/utils';
import { useProps } from 'packages/hooks';
import { GlobalProps } from 'packages/types';
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
	descriptionArea?: 'after-input' | 'before-input';
	/**
	 * The orientation of the checkbox group.
	 *
	 * @default 'vertical'
	 */
	orientation?: 'horizontal' | 'vertical';
}

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
	(props, forwardedRef) => {
		const { children, id, isRequired, label } = props;
		const { description, descriptionArea } = props;
		const { clsx, componentProps, rootProps } = useProps('RadioGroup', props);
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
				data-description-area={descriptionArea}
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
				<RadioContext.Provider value={state}>
					<div
						className={clsx({
							classNames: classes.items,
							prefixedNames: 'items',
						})}
					>
						{children}
					</div>
				</RadioContext.Provider>
				{isInvalid && (
					<div
						{...errorMessageProps}
						className={clsx({
							classNames: classes.errorMessage,
							prefixedNames: 'error-message',
						})}
					>
						{validationErrors.join(' ')}
					</div>
				)}
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
			</div>
		);
	}
);

RadioGroup.displayName = 'RadioGroup';
