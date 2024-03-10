import { useProps } from '@/hooks';
import { GlobalProps } from '@/types';
import { ReactElement, forwardRef } from 'react';
import { AriaTabListOptions, useObjectRef, useTabList } from 'react-aria';
import { useTabListState } from 'react-stately';
import { TabProps } from './Tab';
import { TabItem } from './TabItem';
import { TabPanel } from './TabPanel';
import styles from './Tabs.module.scss';
import { useTabsProvider } from './TabsProvider';

interface TabsProps
	extends GlobalProps,
		Omit<AriaTabListOptions<object>, 'items'> {
	children: Array<ReactElement<TabProps>> | ReactElement<TabProps>;
}

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(
	(props: TabsProps, forwardedRef) => {
		const ref = useObjectRef(forwardedRef);
		const { context } = useTabsProvider();
		const { clsx, componentProps, rootProps } = useProps('Tabs', props);
		const state = useTabListState(componentProps);
		let { orientation } = props;

		orientation = context === 'settings' ? 'horizontal' : orientation;
		const { tabListProps } = useTabList(
			{
				...componentProps,
				orientation,
			},
			state,
			ref
		);

		return (
			<div
				{...rootProps({
					classNames: styles.root,
				})}
				data-context={context}
				data-orientation={orientation}
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
