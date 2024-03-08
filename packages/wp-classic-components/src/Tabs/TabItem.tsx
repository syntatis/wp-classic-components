import { useProps } from '@/hooks';
import { useRef } from 'react';
import { useTab } from 'react-aria';
import { Node, TabListState } from 'react-stately';
import styles from './Tabs.module.scss';

interface TabItemProps {
	item: Node<object>;
	state: TabListState<object>;
}

export const TabItem = (props: TabItemProps) => {
	const { item, state } = props;
	const { key, rendered } = item;
	const ref = useRef(null);
	const { rootProps } = useProps('Tabs', props);
	const { isDisabled, isSelected, tabProps } = useTab({ key }, state, ref);

	return (
		<div
			{...rootProps({
				classNames: [
					styles.tabItem,
					{
						[styles.isDisabled]: isDisabled,
						[styles.isSelected]: isSelected,
					},
				],
				prefixedNames: 'item',
			})}
			{...tabProps}
			ref={ref}
		>
			{rendered}
		</div>
	);
};
