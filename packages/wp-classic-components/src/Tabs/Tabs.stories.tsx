import type { Meta, StoryObj } from '@storybook/react';
import { Tab } from './Tab';
import { Tabs } from './Tabs';

const meta: Meta<typeof Tabs> = {
	component: Tabs,
	parameters: {
		controls: {
			include: [],
		},
	},
	tags: ['autodocs'],
	title: 'Components/Tabs',
};

type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
	render(props) {
		return (
			<Tabs {...props}>
				<Tab title="Tab 1">Hello World</Tab>
				<Tab title="Tab 2">Hello World 2</Tab>
			</Tabs>
		);
	},
};

export default meta;
