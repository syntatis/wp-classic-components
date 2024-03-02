import { GlobalProps } from '@/types';
import { ReactNode } from 'react';
import { Key } from 'react-aria';

export interface TabProps extends GlobalProps {
	children: ReactNode;
	key: Key;
	title: ReactNode;
}

export const Tab = (props: TabProps) => {
	return props.children;
};
