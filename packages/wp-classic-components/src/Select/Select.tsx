import { useProps } from '@/hooks';
import { GlobalProps } from '@/types';
import { Children, ReactElement, ReactNode, forwardRef } from 'react';
import { AriaSelectProps, Key, useId, useObjectRef } from 'react-aria';
import { Item, useSingleSelectListState } from 'react-stately';
import * as classes from './Select.module.scss';
import { SelectItem, SelectItemProps } from './SelectItem';

interface Option {
	label: string;
	value: string;
}

type ChildItem = ReactElement<SelectItemProps, typeof SelectItem>;

interface SelectProps
	extends GlobalProps,
		Omit<AriaSelectProps<Option>, 'defaultSelectedKey' | 'disabledKeys'> {
	children: Array<ChildItem> | ChildItem;
	defaultSelectedItem?: string;
	description?: ReactNode;
	disabledItems?: Array<Key>;
	label?: ReactNode;
	name: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
	(props, forwardedRef) => {
		const ref = useObjectRef(forwardedRef);
		const { clsx, componentProps, rootProps } = useProps('Select', props);
		const state = useSingleSelectListState({
			...props,
			children: Children.map(componentProps.children, (child) => {
				const { props } = child as ChildItem;
				const { value } = props;

				return <Item {...props} key={value} textValue={value} />;
			}),
			defaultSelectedKey: componentProps.defaultSelectedItem,
			disabledKeys: componentProps.disabledItems,
		});
		const { isDisabled, isInvalid, isRequired, label, name } = componentProps;
		const id = useId(props.id);
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const labelId = label !== undefined ? useId() : undefined;

		return (
			<div
				{...rootProps({
					classNames: [
						classes.root,
						{
							[classes.disabled]: isDisabled,
							[classes.invalid]: isInvalid,
						},
					],
				})}
			>
				{label && (
					<label
						className={clsx({
							classNames: [classes.label],
							prefixedNames: 'label',
						})}
						htmlFor={id}
						id={labelId}
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
				<select
					aria-invalid={isInvalid}
					className={clsx({
						classNames: {
							[classes.input]: true,
						},
						prefixedNames: 'input',
					})}
					disabled={isDisabled}
					id={id}
					name={name}
					onChange={(e) => state.setSelectedKey(e.target.value)}
					ref={ref}
				>
					{props.children}
				</select>
			</div>
		);
	}
);

Select.displayName = 'Select';
