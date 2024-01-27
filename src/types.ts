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
