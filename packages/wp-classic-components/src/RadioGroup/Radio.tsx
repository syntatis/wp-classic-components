import { useObjectRef } from '@react-aria/utils';
import { useProps } from 'packages/hooks';
import { GlobalProps } from 'packages/types';
import {
	ReactNode,
	createContext,
	forwardRef,
	useContext,
	useRef,
} from 'react';
import { AriaRadioProps, useRadio } from 'react-aria';
import { RadioGroupState } from 'react-stately';
import * as classes from './Radio.module.scss';

export const RadioContext = createContext<RadioGroupState | null>(null);

interface RadioProps extends GlobalProps, AriaRadioProps {
	children: ReactNode;
}

export const Radio = forwardRef<HTMLLabelElement, RadioProps>(
	(props, forwardedRef) => {
		const { children, className } = props;
		const {
			clsx,
			rootProps,
			componentProps: restProps,
		} = useProps('Radio', props);
		const ref = useObjectRef(forwardedRef);
		const inputRef = useRef<HTMLInputElement>(null);
		const state = useContext(RadioContext);
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const radioProps = state ? useRadio(restProps, state, inputRef) : null;

		if (!radioProps) {
			throw new Error('"Radio" input must be added as a group');
		}

		const { inputProps, labelProps, isDisabled } = radioProps;

		return (
			<label
				{...rootProps({
					classNames: [
						classes.root,
						className,
						{
							[classes.disabled]: isDisabled,
						},
					],
				})}
				ref={ref}
			>
				<input
					{...inputProps}
					ref={inputRef}
					className={clsx({
						prefixedNames: 'input',
						classNames: classes.input,
					})}
				/>
				<span {...labelProps}>{children}</span>
			</label>
		);
	}
);

Radio.displayName = 'Radio';
