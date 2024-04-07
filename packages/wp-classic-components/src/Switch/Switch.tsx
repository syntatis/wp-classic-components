import { ReactNode, forwardRef } from 'react';
import {
	AriaSwitchProps,
	VisuallyHidden,
	useFocusRing,
	useId,
	useObjectRef,
	useSwitch,
} from 'react-aria';
import { useToggleState } from 'react-stately';
import { useProps } from '../../hooks';
import { GlobalProps } from '../../types';
import * as classes from './Switch.module.scss';

interface SwitchProps extends GlobalProps, AriaSwitchProps {
	/**
	 * A description for the field. Provides a hint such for what the input is more about.
	 */
	description?: ReactNode;
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
	(props, forwardedRef) => {
		const { children, description } = props;
		const ref = useObjectRef(forwardedRef);
		const state = useToggleState(props);
		const { clsx, componentProps, rootProps } = useProps('Switch', props);
		const { inputProps, isDisabled, labelProps } = useSwitch(
			componentProps,
			state,
			ref
		);
		const { focusProps, isFocusVisible } = useFocusRing();
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const descriptionId = description ? useId() : undefined;

		return (
			<>
				<label
					{...rootProps({
						classNames: [
							classes.root,
							{
								[classes.isDisabled]: isDisabled,
								[classes.isSelected]: state.isSelected,
							},
						],
					})}
					{...labelProps}
				>
					<VisuallyHidden>
						<input
							{...inputProps}
							{...focusProps}
							aria-describedby={descriptionId}
							ref={ref}
						/>
					</VisuallyHidden>
					<div
						className={clsx({
							classNames: [classes.input],
							prefixedNames: 'input',
						})}
					>
						<svg aria-hidden="true" height={28} width={44}>
							<rect
								className={clsx({
									classNames: [classes.track],
								})}
								height={20}
								rx={10}
								width={36}
								x={4}
								y={4}
							/>
							<circle
								className={clsx({
									classNames: [classes.thumb],
								})}
								cx={state.isSelected ? 30 : 14}
								cy={14}
								r={8}
							/>
							{isFocusVisible && (
								<rect
									className={clsx({
										classNames: [classes.focusRing],
										prefixedNames: 'focusRing',
									})}
									fill="none"
									height={26}
									rx={14}
									strokeWidth={2}
									width={42}
									x={1}
									y={1}
								/>
							)}
						</svg>
						<span
							className={clsx({
								classNames: [classes.label],
								prefixedNames: 'label',
							})}
						>
							{children}
						</span>
					</div>
				</label>
				{description && (
					<p
						className={clsx({
							classNames: [classes.label, 'description'],
							prefixedNames: 'description',
						})}
						id={descriptionId}
					>
						{description}
					</p>
				)}
			</>
		);
	}
);

Switch.displayName = 'Switch';
