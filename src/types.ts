import { CSSProperties, ReactNode } from 'react';

export interface Styleable {
	className?: string;
	style?: CSSProperties;
}

export interface Suffixable {
	suffix?: ReactNode;
}

export interface Prefixable {
	prefix?: ReactNode;
}

export interface Affixable extends Prefixable, Suffixable {}

/**
 * A selection of HTML attributes that can be applied to any HTML element.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes
 */
export interface GlobalComponentProps extends Styleable {
	id?: string | undefined;
	tabIndex?: number | undefined;
}
