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
				<Tab title="General">General</Tab>
				<Tab title="Products">Products</Tab>
				<Tab title="Shipping">Shipping</Tab>
				<Tab title="Payments">Payments</Tab>
				<Tab title="Accounts & Privacy">Accounts & Privacy</Tab>
			</Tabs>
		);
	},
};

export default meta;
