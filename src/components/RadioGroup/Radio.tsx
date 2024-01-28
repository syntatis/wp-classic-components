import { filterDOMProps, useObjectRef } from '@react-aria/utils';
import {
	ReactNode,
	createContext,
	forwardRef,
	useContext,
	useRef,
} from 'react';
import { AriaRadioProps, useRadio } from 'react-aria';
import { RadioGroupState } from 'react-stately';
import { useClasses } from '~/hooks';
import { GlobalAttributes } from '~/types';
import classes from './Radio.module.scss';

export const RadioContext = createContext<RadioGroupState | null>(null);

interface RadioProps extends GlobalAttributes, AriaRadioProps {
	children: ReactNode;
}

export const Radio = forwardRef<HTMLLabelElement, RadioProps>(
	(props, forwardedRef) => {
		const { children, className } = props;
		const ref = useObjectRef(forwardedRef);
		const inputRef = useRef<HTMLInputElement>(null);
		const state = useContext(RadioContext);
		// eslint-disable-next-line react-hooks/rules-of-hooks
		const radioProps = state ? useRadio(props, state, inputRef) : null;
		const { clsx } = useClasses('Radio');

		if (!radioProps) {
			throw new Error('Radio must be added as a group');
		}

		const { inputProps, labelProps, isDisabled } = radioProps;

		return (
			<label
				{...filterDOMProps(props, { labelable: true })}
				ref={ref}
				className={clsx({
					prefixed: 'root',
					classNames: [classes.root, className],
				})}
				data-disabled={isDisabled || undefined}
			>
				<input
					{...inputProps}
					ref={inputRef}
					className={clsx({
						prefixed: 'input',
						classNames: classes.input,
					})}
				/>
				<span {...labelProps}>{children}</span>
			</label>
		);
	}
);

Radio.displayName = 'Radio';
