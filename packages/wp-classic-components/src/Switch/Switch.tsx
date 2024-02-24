import { useProps } from '@/hooks';
import { GlobalProps } from '@/types';
import { forwardRef } from 'react';
import {
	AriaSwitchProps,
	VisuallyHidden,
	useFocusRing,
	useObjectRef,
	useSwitch,
} from 'react-aria';
import { useToggleState } from 'react-stately';
import * as classes from './Switch.module.scss';

interface SwitchProps extends GlobalProps, AriaSwitchProps {}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
	(props, forwardedRef) => {
		const { children } = props;
		const ref = useObjectRef(forwardedRef);
		const state = useToggleState(props);
		const { clsx, componentProps, rootProps } = useProps('Switch', props);
		const { inputProps, labelProps } = useSwitch(componentProps, state, ref);
		const { focusProps, isFocusVisible } = useFocusRing();

		return (
			<label
				{...rootProps({
					classNames: [
						classes.root,
						{
							[classes.isSelected]: state.isSelected,
						},
					],
				})}
			>
				<VisuallyHidden>
					<input {...inputProps} {...focusProps} ref={ref} />
				</VisuallyHidden>
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
					{...labelProps}
					className={clsx({
						classNames: [classes.label],
					})}
				>
					{children}
				</span>
			</label>
		);
	}
);

Switch.displayName = 'Switch';
