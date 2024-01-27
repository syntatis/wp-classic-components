import { filterDOMProps, useObjectRef } from '@react-aria/utils';
import { forwardRef } from 'react';
import { AriaTextFieldProps } from 'react-aria';
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
		const { style, label } = props;
		const ref = useObjectRef(forwardedRef);
		const { clsx } = useClasses('TextField');

		return (
			<div className={clsx('root')}>
				<input
					{...filterDOMProps(props)}
					ref={ref}
					style={style}
					className={clsx('input')}
				/>
			</div>
		);
	}
);

TextField.displayName = 'TextField';
