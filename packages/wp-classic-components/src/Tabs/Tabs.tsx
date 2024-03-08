import { useProps } from '@/hooks';
import { GlobalProps } from '@/types';
import { ReactElement, forwardRef } from 'react';
import { useObjectRef, useTabList } from 'react-aria';
import { TabListProps, useTabListState } from 'react-stately';
import { TabProps } from './Tab';
import { TabItem } from './TabItem';
import { TabPanel } from './TabPanel';
import styles from './Tabs.module.scss';

interface TabsProps extends GlobalProps, Omit<TabListProps<object>, 'items'> {
	children: Array<ReactElement<TabProps>> | ReactElement<TabProps>;
}

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(
	(props: TabsProps, forwardedRef) => {
		const ref = useObjectRef(forwardedRef);
		const { clsx, componentProps, rootProps } = useProps('Tabs', props);
		const state = useTabListState(componentProps);
		const { tabListProps } = useTabList(componentProps, state, ref);

		return (
			<div
				{...rootProps({
					classNames: styles.root,
				})}
			>
				<div
					{...tabListProps}
					className={clsx({
						classNames: styles.tabList,
						prefixedNames: 'list',
					})}
					ref={ref}
				>
					{[...state.collection].map((item) => {
						return <TabItem item={item} key={item.key} state={state} />;
					})}
				</div>
				<TabPanel key={state.selectedItem?.key} state={state} />
			</div>
		);
	}
);

Tabs.displayName = 'Tabs';
