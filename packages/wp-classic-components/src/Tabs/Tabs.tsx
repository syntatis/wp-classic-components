import { useProps } from '@/hooks';
import { GlobalProps } from '@/types';
import { Children, ReactElement, forwardRef, useRef } from 'react';
import {
	AriaTabPanelProps,
	useObjectRef,
	useTab,
	useTabList,
	useTabPanel,
} from 'react-aria';
import {
	Item,
	Node,
	TabListProps,
	TabListState,
	useTabListState,
} from 'react-stately';
import { Tab, TabProps } from './Tab';

interface TabsProps
	extends GlobalProps,
		Omit<TabListProps<object>, 'children' | 'items'> {
	children:
		| Array<ReactElement<TabProps, typeof Tab>>
		| ReactElement<TabProps, typeof Tab>;
}

interface TabItemProps {
	item: Node<object>;
	state: TabListState<object>;
}

interface TabPanelProps extends AriaTabPanelProps {
	state: TabListState<object>;
}

const TabItem = (props: TabItemProps) => {
	const { item, state } = props;
	const { key, rendered } = item;
	const ref = useRef(null);
	const { tabProps } = useTab({ key }, state, ref);

	return (
		<div {...tabProps} ref={ref}>
			{rendered}
		</div>
	);
};
const TabPanel = (props: TabPanelProps) => {
	const { state } = props;
	const ref = useRef(null);
	const { tabPanelProps } = useTabPanel(props, state, ref);

	return (
		<div {...tabPanelProps} ref={ref}>
			{state.selectedItem?.props.children}
		</div>
	);
};

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(
	(props: TabsProps, forwardedRef) => {
		const { children } = props;
		const ref = useObjectRef(forwardedRef);
		const { rootProps } = useProps('Tabs', props);
		const state = useTabListState({
			...props,
			children: Children.map(children, (child) => {
				return (
					<Item key={child.key} title={child.props.title}>
						{child.props.children}
					</Item>
				);
			}),
		});
		const { tabListProps } = useTabList(props, state, ref);

		return (
			<div {...rootProps()}>
				<div {...tabListProps} ref={ref}>
					{[...state.collection].map((item) => (
						<TabItem item={item} key={item.key} state={state} />
					))}
				</div>
				<TabPanel key={state.selectedItem?.key} state={state} />
			</div>
		);
	}
);

Tabs.displayName = 'Tabs';
