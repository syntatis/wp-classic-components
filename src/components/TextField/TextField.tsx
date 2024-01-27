import { filterDOMProps, useObjectRef } from '@react-aria/utils';
import { forwardRef } from 'react';
import { AriaTextFieldProps, useTextField } from 'react-aria';
import { useClasses } from '~/hooks';
import { Affixable, Styleable } from '~/types';

export interface TextFieldProps
	extends Affixable,
		Styleable,
		AriaTextFieldProps {
	/**
	 * Whether to allow or disallow 1Password helper.
	 *
	 * @default false
	 * @see https://developer.1password.com/docs/web/compatible-website-design/
	 */
	ignore1Password?: boolean;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
	(props, forwardedRef) => {
		const { style, className, label } = props;
		const ref = useObjectRef(forwardedRef);
		const { clsx } = useClasses('TextField');
		const { inputProps, labelProps } = useTextField(props, ref);

		return (
			<div className={clsx('root')}>
				{label && <label {...labelProps}>{label}</label>}
				<input
					{...filterDOMProps(props)}
					{...inputProps}
					ref={ref}
					style={style}
					className={clsx('input', [className])}
				/>
			</div>
		);
	}
);

TextField.displayName = 'TextField';
